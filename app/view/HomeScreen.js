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
  CardItem
} from "native-base";
import { connect } from "react-redux";
import StarRating from "react-native-star-rating";
import globalStyles, { width, height } from "../customLib/globalStyles";
import { getPopularMovie } from "../redux/actions/movie";
import { IMAGE_URL } from "../customLib/APIServices";
import { trimText } from "../customLib/helpers";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      popular: [],
      count: null
    };
  }

  componentDidMount() {
    this._getPopularMovie();
  }

  _getPopularMovie = () => {
    this.props
      .getPopularMovie(this.state.page)
      .then(res => {
        this.setState({ popular: res.results, count: res.total_results });
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  _renderMovie = item => {
    return (
      <TouchableOpacity style={{ width: width * 0.3, padding: 5 }}>
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
            <Text
              style={{
                color: "white",
                fontSize: 14
              }}
            >
              {item.release_date}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
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
        <Content>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f9f9f9",
              paddingBottom: 50
            }}
          >
            <FlatList
              data={this.state.popular}
              numColumns={3}
              keyExtractor={(item, index) => index.toString}
              ListEmptyComponent={() => {
                return (
                  <View style={{ width: "100%", justifyContent: "center" }}>
                    <Text>Empty List</Text>
                  </View>
                );
              }}
              renderItem={({ item, index }) => this._renderMovie(item)}
            />
          </View>
        </Content>
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
  isLoading: movie.isLoading
});

const mapDispatchToProps = dispatch => ({
  getPopularMovie: param => dispatch(getPopularMovie(param))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
