import * as React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

var userInfo = {user: "", pass: "", name: ""};

class HomeScreen extends React.Component {
  // function to check user name and password
  // current username is user, password is 123
  checkUser = () => {
    userInfo.user = document.getElementById('username').value;
    userInfo.pass = document.getElementById('password').value;
    userInfo.name = "Kambing";

    if (userInfo.user == 'user' && userInfo.pass == '123') {
      this.props.navigation.navigate('LoggedIn');
      document.getElementById('logInSpace').style.display = "none";
      document.getElementById('welcomeMsg').innerHTML = "Welcome back, " + userInfo.name;
    }
    else {
      alert(userInfo.user + " " + userInfo.pass + "\nWrong username/password");
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <div id='logInSpace'>
          <div>
            <TextInput id='username' placeholder="Username"/>
            <TextInput style={{visibility: 'hidden'}} size='1'/>
            <TextInput id='password' secureTextEntry={true} placeholder="Password"/>
          </div>
          <Text> </Text>
          <div>
            <Button title="Log In" onPress={ this.checkUser }/>
          </div>
        </div>
        <Text id='welcomeMsg'/>
      </View>
    );
  }
}

class LoggedInScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>This is a new page</Text>
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
