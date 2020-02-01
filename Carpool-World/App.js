import * as React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import firebase from 'firebase';
import fire from './base';

var userInfo = {user: "", pass: "", fname: "", lname: "", email: ""};

class MainScreen extends React.Component {

  ///// f u n c t i o n s /////

  // function to check user name and password
  // current username is user, password is 123
  checkUser = () => {
    userInfo.user = document.getElementById('username').value;
    userInfo.pass = document.getElementById('password').value;

    {this.state.accounts.map((account) => {
      if (userInfo.user === this.state.account.username && userInfo.pass === this.state.account.password) {
        userInfo.fname = this.state.account.firstName;
        userInfo.lname = this.state.account.lastName;
        userInfo.email = this.state.account.email;

        document.getElementById('signInSpace').style.display = "none";
        document.getElementById('homePage').style.display = "block";
        document.getElementById('bookPage').style.display = "none";
        document.getElementById('msgsPage').style.display = "none";
        document.getElementById('acctPage').style.display = "none";
        document.getElementById('welcomeMsg').innerHTML = "Welcome back, " + userInfo.fname + "\n\n";
      }
      else {
        alert(userInfo.user + " " + userInfo.pass + "\nWrong username/password");
      }
    })}
  }

  // home page button
  homePageButton = () => {
    document.getElementById('signInSpace').style.display = "none";
    document.getElementById('homePage').style.display = "block";
    document.getElementById('bookPage').style.display = "none";
    document.getElementById('msgsPage').style.display = "none";
    document.getElementById('acctPage').style.display = "none";
  }

  // bookings page button
  bookPageButton = () => {
    document.getElementById('signInSpace').style.display = "none";
    document.getElementById('homePage').style.display = "none";
    document.getElementById('bookPage').style.display = "block";
    document.getElementById('msgsPage').style.display = "none";
    document.getElementById('acctPage').style.display = "none";
  }

  // messages page button
  msgsPageButton = () => {
    document.getElementById('signInSpace').style.display = "none";
    document.getElementById('homePage').style.display = "none";
    document.getElementById('bookPage').style.display = "none";
    document.getElementById('msgsPage').style.display = "block";
    document.getElementById('acctPage').style.display = "none";
  }

  // account page button
  acctPageButton = () => {
    document.getElementById('signInSpace').style.display = "none";
    document.getElementById('homePage').style.display = "none";
    document.getElementById('bookPage').style.display = "none";
    document.getElementById('msgsPage').style.display = "none";
    document.getElementById('acctPage').style.display = "block";
    document.getElementById('userProfile').innerHTML = "\n\nName: " + userInfo.name + "\nUsername: " + userInfo.user + "\nPassword: " + userInfo.pass;
  }

  // function to sign user out and clear username and password
  signOutUser = () => {
    userInfo.user = "";
    userInfo.pass = "";
    userInfo.fname = "";
    userInfo.lname = "";
    userInfo.email = "";

    document.getElementById('username').value = "";
    document.getElementById('password').value = "";
    document.getElementById('signInSpace').style.display = "block";
    document.getElementById('homePage').style.display = "none";
    document.getElementById('bookPage').style.display = "none";
    document.getElementById('msgsPage').style.display = "none";
    document.getElementById('acctPage').style.display = "none";
  }

  // scrapbook messaging
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      messages: []
    };
  }
  componentWillMount(){
    /* Create reference to messages in Firebase Database */
    let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
    messagesRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let message = {
        text: snapshot.val(),
        id: snapshot.key
      };

      this.setState({
        messages: [message].concat(this.state.messages)
      });
    })

    const accountsRef = firebase.database().ref('accounts');
    accountsRef.on('value', (snapshot) => {
      let accounts = snapshot.val();
      let newState = [];
      for (let account in accounts) {
        newState.push({
          id: account,
          username: accounts[account].uname,
          firstName: accounts[account].fname,
          lastName: accounts[account].lname,
          email: accounts[account].email,
          password: accounts[account].passw,
        });
      }
      this.setState({
        accounts: newState
      });
    });

  }
  addMessage(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    fire.database().ref('messages').push( this.inputEl.value );
    this.inputEl.value = ''; // <- clear the input
  }

  /////////////////////////////

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <div id='signInSpace'>
          <div>
            <TextInput id='username' placeholder="Username"/>
            <TextInput style={{visibility: 'hidden'}} size='1'/>
            <TextInput id='password' secureTextEntry={true} placeholder="Password"/>
          </div>
          <Text> </Text>
          <div>
            <Button title="Sign In" onPress={ this.checkUser }/>
            <Button title="Sign Up" onPress={() => this.props.navigation.navigate('SignUp')} />
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

            <form onSubmit={this.addMessage.bind(this)}>
              <input type="text" ref={ el => this.inputEl = el }/>
              <input type="submit"/>
              <ul>
                { /* Render the list of messages */
                  this.state.messages.map( message => <li key={message.id}>{message.text}</li> )
                }
              </ul>
            </form>
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
            <Button id='signOutButton' title="Sign Out" onPress={ this.signOutUser }/>
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

class SignUpScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      accounts: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const accountsRef = firebase.database().ref('accounts');
    accountsRef.on('value', (snapshot) => {
      let accounts = snapshot.val();
      let newState = [];
      for (let account in accounts) {
        newState.push({
          id: account,
          username: accounts[account].uname,
          firstName: accounts[account].fname,
          lastName: accounts[account].lname,
          email: accounts[account].email,
          password: accounts[account].passw,
        });
      }
      this.setState({
        accounts: newState
      });
    });
  }

  handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.password.value != this.conPassword.value) {
      alert("Passwords do not match");
    }
    //if
    else {
      const accountsRef = fire.database().ref('accounts');
      const account = {
        uname: this.username.value,
        fname: this.firstName.value,
        lname: this.lastName.value,
        email: this.email.value,
        passw: this.password.value
      }
      accountsRef.push(account);
        this.username.value = '';
        this.firstName.value = '';
        this.lastName.value = '';
        this.email.value = '';
        this.password.value = '';
        this.conPassword.value = '';
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <p>
          <Text>Sign Up Form</Text>
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Username" onChange={this.handleChange} ref={username => this.username = username} /><br/>
            <input type="text" placeholder="First Name" onChange={this.handleChange} ref={firstName => this.firstName = firstName} /><br/>
            <input type="text" placeholder="Last Name" onChange={this.handleChange} ref={lastName => this.lastName = lastName} /><br/>
            <input type="text" placeholder="E-Mail" onChange={this.handleChange} ref={email => this.email = email} /><br/>
            <input type="password" placeholder="Password" onChange={this.handleChange} ref={password => this.password = password} /><br/>
            <input type="password" placeholder="Confirm Password" onChange={this.handleChange} ref={conPassword => this.conPassword = conPassword}/><br/>
            <input type="submit"/>
          </form>
        </p>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Main: MainScreen,
    SignUp: SignUpScreen,
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
