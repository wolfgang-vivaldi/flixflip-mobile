import React from "react";
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import HomeScreen from "../view/HomeScreen";
import ProfileScreen from "../view/ProfileScreen";

const HomeTab = createStackNavigator({
  Home: HomeScreen
});

const ProfileTab = createStackNavigator({
  Profile: ProfileScreen
});

const Tabs = createBottomTabNavigator(
  {
    Home: HomeTab,
    Profile: ProfileTab
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const { routeName } = navigation.state;
        let tabName;
        tabName = routeName === "Home" ? "home" : "grid";

        return <Icon name={tabName} size={20} />;
      }
    })
  }
);

export default createAppContainer(Tabs);
