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
import globalStyles, { width, height } from "../customLib/globalStyles";
import { getPopularMovie } from "../redux/actions/movie";
import { IMAGE_URL } from "../customLib/APIServices";

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
      <TouchableOpacity style={{ width: width * 0.33, padding: 5 }}>
        <Card>
          <CardItem cardBody>
            <Image
              resizeMethod="resize"
              resizeMode="cover"
              style={{
                height: height * 0.2,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5
              }}
              source={{ uri: `${IMAGE_URL}${item.poster_path}` }}
            />
          </CardItem>
          <CardItem>
            <Text>{item.title}</Text>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <Container>
        <Header>
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
          {/* <View
            style={{

              alignItems: "center",
              justifyContent: "center",
              paddingBottom: 50
            }}
          > */}
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
          {/* </View> */}
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
