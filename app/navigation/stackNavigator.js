import React from "react";
import {
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator,
  SafeAreaView
} from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native";
import NewsScreen from "../view/NewsScreen";
import FavoriteScreen from "../view/FavoriteScreen";
import WatchedScreen from "../view/WatchedScreen";
import BottomTabs from "./bottomNavigator";

const DrawerNav = createDrawerNavigator(
  {
    Tabs: BottomTabs
  },
  {
    initialRouteName: "Tabs",
    contentComponent: props => {
      return (
        <ScrollView>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <Text
              onPress={() => {
                props.navigation.navigate("News");
                props.navigation.closeDrawer();
              }}
            >
              News
            </Text>
            <Text
              onPress={() => {
                props.navigation.navigate("Watched");
                props.navigation.closeDrawer();
              }}
            >
              Watched
            </Text>
            <Text
              onPress={() => {
                props.navigation.navigate("Favorites");
                props.navigation.closeDrawer();
              }}
            >
              Favorite
            </Text>
          </SafeAreaView>
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
  Watched: WatchedScreen
});

export default createAppContainer(Stack);
