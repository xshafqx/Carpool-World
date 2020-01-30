import * as React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

var userInfo = {user: "", pass: "", name: ""};

class MainScreen extends React.Component {

  ///// f u n c t i o n s /////

  // function to check user name and password
  // current username is user, password is 123
  checkUser = () => {
    userInfo.user = document.getElementById('username').value;
    userInfo.pass = document.getElementById('password').value;
    userInfo.name = "Kambing";

    if (userInfo.user == 'user' && userInfo.pass == '123') {
      //this.props.navigation.navigate('CurrLoc');
      document.getElementById('logInSpace').style.display = "none";
      document.getElementById('homePage').style.display = "block";
      document.getElementById('bookPage').style.display = "none";
      document.getElementById('msgsPage').style.display = "none";
      document.getElementById('acctPage').style.display = "none";
      document.getElementById('welcomeMsg').innerHTML = "Welcome back, " + userInfo.name + "\n\n";
    }
    else {
      alert(userInfo.user + " " + userInfo.pass + "\nWrong username/password");
    }
  }

  // home page button
  homePageButton = () => {
    document.getElementById('logInSpace').style.display = "none";
    document.getElementById('homePage').style.display = "block";
    document.getElementById('bookPage').style.display = "none";
    document.getElementById('msgsPage').style.display = "none";
    document.getElementById('acctPage').style.display = "none";
  }

  // bookings page button
  bookPageButton = () => {
    document.getElementById('logInSpace').style.display = "none";
    document.getElementById('homePage').style.display = "none";
    document.getElementById('bookPage').style.display = "block";
    document.getElementById('msgsPage').style.display = "none";
    document.getElementById('acctPage').style.display = "none";
  }

  // messages page button
  msgsPageButton = () => {
    document.getElementById('logInSpace').style.display = "none";
    document.getElementById('homePage').style.display = "none";
    document.getElementById('bookPage').style.display = "none";
    document.getElementById('msgsPage').style.display = "block";
    document.getElementById('acctPage').style.display = "none";
  }

  // account page button
  acctPageButton = () => {
    document.getElementById('logInSpace').style.display = "none";
    document.getElementById('homePage').style.display = "none";
    document.getElementById('bookPage').style.display = "none";
    document.getElementById('msgsPage').style.display = "none";
    document.getElementById('acctPage').style.display = "block";
    document.getElementById('userProfile').innerHTML = "\n\nName: " + userInfo.name + "\nUsername: " + userInfo.user + "\nPassword: " + userInfo.pass;
  }

  // function to log user out and clear username and password
  logOutUser = () => {
    userInfo.user = "";
    userInfo.pass = "";
    userInfo.name = "";

    document.getElementById('username').value = "";
    document.getElementById('password').value = "";
    document.getElementById('logInSpace').style.display = "block";
    document.getElementById('homePage').style.display = "none";
    document.getElementById('bookPage').style.display = "none";
    document.getElementById('msgsPage').style.display = "none";
    document.getElementById('acctPage').style.display = "none";
  }

  /////////////////////////////

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

        <div id='homePage' style={{display: 'none'}}>
          <p>
            <Text id='welcomeMsg'></Text>
            <Text>This is the home page</Text>
          </p>
          <div style={{display: 'block'}}>
            <Button id='homeButton' title="Home" onPress={ this.homePageButton }/>
            <Button id='bookButton' title="Book" onPress={ this.bookPageButton }/>
            <Button id='msgsButton' title="Messages" onPress={ this.msgsPageButton }/>
            <Button id='acctButton' title="Account" onPress={ this.acctPageButton }/>
          </div>
        </div>

        <div id='bookPage' style={{display: 'none'}}>
          <p>
            <Text>This is the booking page</Text>
          </p>
          <div>
            <Button id='homeButton' title="Home" onPress={ this.homePageButton }/>
            <Button id='bookButton' title="Book" onPress={ this.bookPageButton }/>
            <Button id='msgsButton' title="Messages" onPress={ this.msgsPageButton }/>
            <Button id='acctButton' title="Account" onPress={ this.acctPageButton }/>
          </div>
        </div>

        <div id='msgsPage' style={{display: 'none'}}>
          <p>
            <Text>This is the messages page</Text>
          </p>
          <div>
            <Button id='homeButton' title="Home" onPress={ this.homePageButton }/>
            <Button id='bookButton' title="Book" onPress={ this.bookPageButton }/>
            <Button id='msgsButton' title="Messages" onPress={ this.msgsPageButton }/>
            <Button id='acctButton' title="Account" onPress={ this.acctPageButton }/>
          </div>
        </div>

        <div id='acctPage' style={{display: 'none'}}>
          <p>
            <Text>This is the account page</Text>
            <Text id='userProfile'></Text>
            <br/><br/>
            <Button id='logOutButton' title="Log Out" onPress={ this.logOutUser }/>
          </p>
          <div>
            <Button id='homeButton' title="Home" onPress={ this.homePageButton }/>
            <Button id='bookButton' title="Book" onPress={ this.bookPageButton }/>
            <Button id='msgsButton' title="Messages" onPress={ this.msgsPageButton }/>
            <Button id='acctButton' title="Account" onPress={ this.acctPageButton }/>
          </div>
        </div>
      </View>
    );
  }
}

class CurrLocScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Page to view current location on map while car is moving</Text>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Main: MainScreen,
    CurrLoc: CurrLocScreen,
  },
  {
    initialRouteName: 'Main',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
