import React from "react";
import {
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator,
  SafeAreaView
} from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";
import { Text, Image, FlatList, StyleSheet } from "react-native";
import NewsScreen from "../view/NewsScreen";
import FavoriteScreen from "../view/FavoriteScreen";
import WatchedScreen from "../view/WatchedScreen";
import BottomTabs from "./bottomNavigator";
import SearchScreen from "../view/SearchScreen";
import { View, Header, Title, Icon } from "native-base";
import { height, width } from "../customLib/globalStyles";

const topMenu = [
  {
    icon: "local-movies",
    type: "MaterialIcons",
    title: "Movies",
    routeName: "HomeScreen"
  },
  {
    icon: "live-tv",
    type: "MaterialIcons",
    title: "TV Series",
    routeName: "TvSeries"
  },
  {
    icon: "newspaper-o",
    type: "FontAwesome",
    title: "News",
    routeName: "News"
  },
  {
    icon: "checksquare",
    type: "AntDesign",
    title: "Watched",
    routeName: "Watched"
  },
  {
    icon: "favorite",
    type: "MaterialIcons",
    title: "Favorites",
    routeName: "Favorites"
  },
  {
    icon: "airballoon",
    type: "MaterialCommunityIcons",
    title: "Discover",
    routeName: "Discover"
  }
];

const bottomMenu = [
  {
    icon: "ios-settings",
    type: "Ionicons",
    title: "Settings",
    routeName: "Settings"
  },
  {
    icon: "feedback",
    type: "MaterialIcons",
    title: "Feedback",
    routeName: "Feedback"
  },
  {
    icon: "sharealt",
    type: "AntDesign",
    title: "Share App",
    routeName: "ShareApp"
  },
  {
    icon: "infocirlceo",
    type: "AntDesign",
    title: "About",
    routeName: "About"
  }
];

const DrawerNav = createDrawerNavigator(
  {
    Tabs: BottomTabs
  },
  {
    initialRouteName: "Tabs",
    contentComponent: props => {
      return (
        <ScrollView>
          <View style={{ alignItems: "center" }}>
            <View style={styles.header}>
              <SafeAreaView>
                <Image
                  source={require("../assets/image/artboard1.png")}
                  style={styles.image}
                  resizeMethod="resize"
                  resizeMode="cover"
                />
              </SafeAreaView>
            </View>
            <View style={styles.listMenu}>
              <FlatList
                data={topMenu}
                renderItem={({ item, index }) => {
                  return (
                    <View style={styles.itemMenu}>
                      <Icon
                        style={{ width: "15%" }}
                        name={item.icon}
                        type={item.type}
                      />
                      <View style={{ width: "80%" }}>
                        <Text>{item.title}</Text>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
            <View
              style={{
                paddingHorizontal: 10,
                width: "95%"
              }}
            >
              <FlatList
                data={bottomMenu}
                renderItem={({ item, index }) => {
                  return (
                    <View style={styles.itemMenu}>
                      <Icon
                        style={{ width: "15%" }}
                        name={item.icon}
                        type={item.type}
                      />
                      <View style={{ width: "80%" }}>
                        <Text>{item.title}</Text>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </ScrollView>
      );
    }
  }
);

const Stack = createStackNavigator({
  Drawer: {
    screen: DrawerNav,
    navigationOptions: {
      header: null
    }
  },
  Favorite: FavoriteScreen,
  News: NewsScreen,
  Watched: WatchedScreen,
  SearchScreen: {
    screen: SearchScreen,
    navigationOptions: {
      header: null
    }
  }
});

const styles = StyleSheet.create({
  header: {
    height: height * 0.2,
    width: "100%",
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center"
  },
  image: { height: width * 0.2, width: width * 0.2 },
  listMenu: {
    borderColor: "grey",
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    paddingHorizontal: 10,
    width: "95%"
  },
  itemMenu: {
    width: "95%",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  }
});

export default createAppContainer(Stack);
