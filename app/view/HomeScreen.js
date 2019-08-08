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
import globalStyles, { width } from "../customLib/globalStyles";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
          <Text> hoome</Text>
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

export default HomeScreen;
