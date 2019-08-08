import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  View,
  Text,
  Container,
  Header,
  Left,
  Icon,
  Content,
  Title,
  Body
} from "native-base";
import { width } from "../customLib/globalStyles";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Header>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <View
              style={{
                width: "70%",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Icon name="menu" type="Entypo" />
              <Title style={{ marginLeft: width * 0.1 }}>Movies</Title>
            </View>

            <TouchableOpacity
              style={{
                width: "10%",
                alignItems: "center"
              }}
            >
              <Icon name="search" type="EvilIcons" />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: "10%",
                alignItems: "center"
              }}
            >
              <Icon name="filter" type="FontAwesome" />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: "10%",
                alignItems: "center"
              }}
            >
              <Icon name="md-more" type="Ionicons" />
            </TouchableOpacity>
          </View>
        </Header>
        <Content>
          <Text> hoome</Text>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  headerContent: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    padding: 10
  }
});

export default HomeScreen;
