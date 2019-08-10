import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import {
  View,
  Text,
  Container,
  Header,
  Left,
  Icon,
  Content,
  Title,
  Body,
  Card,
  CardItem,
  Spinner
} from "native-base";
import { connect } from "react-redux";
import StarRating from "react-native-star-rating";
import globalStyles, { width, height, colors } from "../customLib/globalStyles";
import { getPopularMovie, loadMoreMovie } from "../redux/actions/movie";
import { IMAGE_URL } from "../customLib/APIServices";
import { trimText } from "../customLib/helpers";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      popular: [],
      count: null,
      isRefreshing: false
    };
  }

  componentDidMount() {
    this._getPopularMovie();
  }

  _getPopularMovie = () => {
    this.props
      .getPopularMovie(this.state.page)
      .then(res => {
        this.setState({
          popular: res.results,
          count: res.total_results,
          isRefreshing: false
        });
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.props
          .loadMoreMovie(this.state.page)
          .then(res => {
            this.setState({
              popular:
                this.state.page === 1
                  ? res.results
                  : [...this.state.popular, ...res.results],
              count: res.total_results
            });
          })
          .catch(err => {
            console.log("failed load more", err);
          });
      }
    );
  };

  _renderMovie = item => {
    return (
      <TouchableOpacity style={{ width: width * 0.333, padding: 5 }}>
        <View style={{}}>
          <Image
            resizeMethod="resize"
            resizeMode="cover"
            style={{
              height: width * 0.45,
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
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
              <Text style={{ color: "white", marginLeft: 5, fontSize: 14 }}>
                {item.vote_average}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  _onRefresh() {
    this.setState(
      { isRefreshing: SVGComponentTransferFunctionElement, page: 1 },
      () => this._getPopularMovie()
    );
  }

  renderFooter = () => {
    if (this.props.isLoadMore) return null;

    return (
      <View
        style={{
          paddingVertical: 15,
          height: height * 0.2
        }}
      >
        <Spinner color={colors.BLACK} />
      </View>
    );
  };

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: "white" }}>
          <View style={globalStyles.rowBetween}>
            <View
              style={[
                globalStyles.rowCenter,
                {
                  width: "70%"
                }
              ]}
            >
              <Icon name="menu" type="Entypo" />
              <Title style={{ marginLeft: width * 0.1 }}>Movies</Title>
            </View>

            <TouchableOpacity style={styles.buttonItem}>
              <Icon name="search" type="EvilIcons" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonItem}>
              <Icon name="filter" type="FontAwesome" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonItem}>
              <Icon name="md-more" type="Ionicons" />
            </TouchableOpacity>
          </View>
        </Header>

        {this.props.isLoading ? (
          <Spinner color={colors.BLACK} />
        ) : (
          <FlatList
            style={{ width: "100%" }}
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh.bind(this)}
            data={this.state.popular}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => {
              return (
                <View style={{ width: "100%", justifyContent: "center" }}>
                  <Text>Empty List</Text>
                </View>
              );
            }}
            renderItem={({ item, index }) => this._renderMovie(item)}
            onEndReached={({ distanceFromEnd }) => {
              if (distanceFromEnd === 0) {
                return null;
              } else {
                this.handleLoadMore(distanceFromEnd);
              }
            }}
            ListFooterComponent={this.renderFooter}
            onEndReachedThreshold={1}
          />
        )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  buttonItem: {
    width: "10%",
    alignItems: "center"
  }
});

const mapStateToProps = ({ movie }) => ({
  isLoading: movie.isLoading,
  isLoadMore: movie.isLoadMore
});

const mapDispatchToProps = dispatch => ({
  getPopularMovie: param => dispatch(getPopularMovie(param)),
  loadMoreMovie: param => dispatch(loadMoreMovie(param))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
