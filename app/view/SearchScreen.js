import React, { Component } from "react";
import { connect } from "react-redux";
import { FlatList, TouchableOpacity, Image } from "react-native";
import { searchMovies, moreSearchResults } from "../redux/actions/search";
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Content,
  Spinner,
  View,
  Text
} from "native-base";
import StarRating from "react-native-star-rating";

import globalStyles, { width, colors, height } from "../customLib/globalStyles";
import { trimText } from "../customLib/helpers";
import { IMAGE_URL } from "../customLib/APIServices";

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      searchVal: null,
      results: []
    };
  }

  componentDidMount() {
    let param = this.props.navigation.state.params.param;
    this.setState({ searchVal: param }, () => {
      this._searchMovies();
    });
  }

  _searchMovies = () => {
    this.props
      .searchMovies(this.state.searchVal)
      .then(res => {
        console.log("res", res);
        this.setState({
          results: res.results,
          count: res.total_results
        });
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  _handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.props
          .moreSearchResults(this.state.page)
          .then(res => {
            this.setState({
              results:
                this.state.page === 1
                  ? res.results
                  : [...this.state.results, ...res.results],
              count: res.total_results
            });
          })
          .catch(err => {
            console.log("failed load more", err);
          });
      }
    );
  };

  renderResults = item => {
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
        <Header>
          <View
            style={[globalStyles.rowCenter, { width: "10%", height: "100%" }]}
          >
            <TouchableOpacity>
              <Icon name="ios-arrow-back" type="Ionicons" />
            </TouchableOpacity>
          </View>
          <View style={[globalStyles.rowCenter, { width: "90%" }]}>
            <Title>Result for "{this.state.searchVal}"</Title>
          </View>
        </Header>

        {this.props.isLoading ? (
          <Spinner color={colors.BLACK} />
        ) : (
          <FlatList
            style={{ width: "100%" }}
            data={this.state.results}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => {
              return (
                <View style={{ width: "100%", justifyContent: "center" }}>
                  <Text>Empty List</Text>
                </View>
              );
            }}
            renderItem={({ item, index }) => this.renderResults(item)}
            onEndReached={({ distanceFromEnd }) => {
              if (distanceFromEnd === 0) {
                return null;
              } else {
                this._handleLoadMore(distanceFromEnd);
              }
            }}
            onEndReachedThreshold={1}
            ListFooterComponent={this.renderFooter}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = ({ search }) => ({
  isLoading: search.isLoading,
  isLoadMore: search.isLoadMore
});

const mapDispatchToProps = dispatch => ({
  searchMovies: val => dispatch(searchMovies(val)),
  moreSearchResults: val => dispatch(moreSearchResults(val))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen);
