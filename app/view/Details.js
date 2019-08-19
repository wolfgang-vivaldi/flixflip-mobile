import React, { Component } from "react";
import { TouchableOpacity, Image, FlatList } from "react-native";
import {
  View,
  Container,
  Header,
  Icon,
  Title,
  Text,
  Content,
  Spinner
} from "native-base";
import { connect } from "react-redux";
import StarRating from "react-native-star-rating";

import globalStyles, { height, width, colors } from "../customLib/globalStyles";
import { detailMovie } from "../redux/actions/details";
import { IMAGE_URL } from "../customLib/APIServices";
import { getSimilarMovie } from "../redux/actions/similar";
import { trimText } from "../customLib/helpers";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      similar: [],
      movie_id: null,
      page: 1
    };
  }

  componentDidMount() {
    let id = this.props.navigation.state.params.id;
    this.setState({ movie_id: id }, () => {
      this._getDetail();
      this._getSimilar();
    });
  }

  _getDetail = () => {
    let param = this.state.movie_id;
    this.props
      .getDetailMovie(param)
      .then(res => {
        console.log("res", res);
        this.setState({ detail: res });
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  _getSimilar = () => {
    let param = {
      page: this.state.page,
      id: this.state.movie_id
    };
    this.props.getSimilarMovie(param).then(res => {
      this.setState({ similar: res.results });
    });
  };

  render() {
    let data = this.state.detail;
    return (
      <Container>
        <Header
          style={{
            justifyContent: "space-between"
          }}
        >
          <View style={{ width: "8%", justifyContent: "center" }}>
            <TouchableOpacity>
              <Icon name="ios-arrow-back" type="Ionicons" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "60%",
              justifyContent: "center"
            }}
          >
            <Title>{data.title}</Title>
          </View>
          <View style={{ width: "8%", justifyContent: "center" }}>
            {/* <TouchableOpacity>
              <Icon name="ios-arrow-back" type="Ionicons" />
            </TouchableOpacity> */}
          </View>
          <View
            style={{
              width: "8%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity>
              <Icon name="hearto" type="AntDesign" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "8%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity>
              <Icon name="watch-later" type="MaterialIcons" />
            </TouchableOpacity>
          </View>
        </Header>

        {this.props.isLoading ? (
          <Spinner style={{ color: colors.PRIMARY }} />
        ) : (
          <Content>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <View style={{ width: "50%", padding: width * 0.03 }}>
                <Image
                  resizeMethod="resize"
                  resizeMode="contain"
                  borderRadius={5}
                  source={{ uri: `${IMAGE_URL}${data.poster_path}` }}
                  style={{ height: height * 0.3 }}
                />
              </View>
              <View style={{ width: "50%", padding: width * 0.03 }}>
                <View>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {data.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      marginVertical: 5,
                      fontStyle: "italic"
                    }}
                  >
                    {data.tagline}
                  </Text>
                </View>

                <View style={{ padding: 5, marginVertical: 5 }}>
                  <Text note>{data.release_date}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <StarRating
                      starStyle={{
                        color: "#F9ED41",
                        marginRight: 5
                      }}
                      starSize={30}
                      disabled
                      maxStars={1}
                      rating={1}
                    />
                    <View>
                      <Text style={{ marginLeft: 5, fontSize: 16 }}>
                        {data.vote_average}
                        <Text style={{ fontSize: 12 }} note>
                          /10
                        </Text>
                      </Text>
                      <Text
                        style={{ fontSize: 12, color: "grey", paddingLeft: 5 }}
                      >
                        {data.vote_count}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{ marginVertical: height * 0.02 }}>
                  <Text note style={{ fontSize: 16 }}>
                    Spoken Languages
                  </Text>
                  <FlatList
                    data={data.spoken_languages}
                    renderItem={({ item, index }) => {
                      return (
                        <Text style={{ fontSize: 14, fontStyle: "italic" }}>
                          {item.name}
                        </Text>
                      );
                    }}
                  />
                </View>
              </View>
            </View>

            <View style={{ padding: width * 0.03 }}>
              <Text style={{ textAlign: "justify", fontSize: 14 }}>
                {data.overview}
              </Text>

              <View style={{ marginVertical: height * 0.02 }}>
                <Text>Genres</Text>
                <FlatList
                  style={{ width: "100%" }}
                  data={data.genres}
                  renderItem={({ item, index }) => {
                    return (
                      <View
                        style={{
                          //   width: "45%",
                          //   borderRadius: 2,
                          //   margin: "2.5%",
                          //   borderColor: "grey",
                          //   borderWidth: 0.5,
                          flexDirection: "row",
                          alignItems: "center"
                        }}
                      >
                        <Icon name="tag" type="EvilIcons" />
                        <Text
                          style={{
                            fontSize: 12
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>

              {/* <View style={{}}>
                <Text>Cast</Text>
                {data.}
            </View> */}
            </View>

            <View style={{ padding: width * 0.03 }}>
              <Text>You may also like</Text>
            </View>
            {this.props.loadingSimilar ? (
              <Spinner color={colors.PRIMARY} />
            ) : (
              <View>
                <FlatList
                  horizontal
                  style={{
                    paddingTop: 0,
                    marginBottom: 12
                  }}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  data={this.state.similar}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        underlineColor="transparent"
                        style={{
                          // width: width * 0.4,
                          height: width * 0.4,
                          borderRadius: 25,
                          alignItems: "center",
                          justifyContent: "center",
                          marginHorizontal: width * 0.015,
                          elevation: 7
                        }}
                      >
                        <View style={{}}>
                          <Image
                            style={{
                              width: width * 0.32,
                              borderRadius: 5,
                              flex: 1
                            }}
                            source={{ uri: `${IMAGE_URL}${item.poster_path}` }}
                          />
                          <View
                            style={{
                              position: "absolute",
                              backgroundColor: "rgba(0,0,0,0.5)",
                              bottom: 0,
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: 5,
                              width: "100%"
                            }}
                          >
                            <Text
                              style={{
                                color: "white",
                                fontSize: 14,
                                marginBottom: 5
                              }}
                            >
                              {trimText(item.title, 20)}
                            </Text>
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center"
                              }}
                            >
                              <StarRating
                                starStyle={{
                                  color: "#F9ED41",
                                  marginRight: 5
                                }}
                                starSize={16}
                                disabled
                                maxStars={1}
                                rating={1}
                              />
                              <Text
                                style={{
                                  color: "white",
                                  marginLeft: 5,
                                  fontSize: 14
                                }}
                              >
                                {item.vote_average}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            )}
          </Content>
        )}
      </Container>
    );
  }
}

const mapStateToProps = ({ details, similar }) => ({
  isLoading: details.isLoading,
  loadingSimilar: similar.isLoading
});

const mapDispatchToProps = dispatch => ({
  getDetailMovie: param => dispatch(detailMovie(param)),
  getSimilarMovie: param => dispatch(getSimilarMovie(param))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
