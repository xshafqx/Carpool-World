import * as React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class HomeScreen extends React.Component {
  // function to check user name and password
  checkUser = () => {
    var user = document.getElementById('username').value;
    var pass = document.getElementById('password').value;

    if (user == 'user' && pass == '123') {
      this.props.navigation.navigate('LoggedIn');
    }
    else {
      alert(user + " " + pass + "\nWrong username/password");
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput id="username" placeholder="Username"/>
        <TextInput id="password" placeholder="Password"/>
        <Text> </Text>
        <Button
          title="Log In"
          onPress={this.checkUser
          }
        />
      </View>
    );
  }
}

class LoggedInScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>After Logging In</Text>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    LoggedIn: LoggedInScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
