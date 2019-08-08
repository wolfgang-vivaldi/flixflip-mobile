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
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  }
});

const ProfileTab = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      header: null
    }
  }
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
