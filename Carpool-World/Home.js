import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from './base';
import {user} from './Login';

class Home extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.submitEditProfile = this.submitEditProfile.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repassword: '',
      isDriver: '',
      isAdmin: '',
      message: ''
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // goes back to login page if stumble upon another page by accident without logging in
  componentDidMount() {
    if (typeof user[2] === 'undefined') {
      firebase.auth().signOut();
    }
  }

  logout() {
    user[0] = '';
    user[1] = '';
    user[2] = '';
    user[3] = '';
    user[4] = '';
    user[5] = '';

    console.log(user.email);
    firebase.auth().signOut();
  }

  editProfile() {
    document.getElementById('lblfName').style.display = 'none';
    document.getElementById('lbllName').style.display = 'none';

    document.getElementById('editfName').style.display = 'inline';
    document.getElementById('editlName').style.display = 'inline';

    document.getElementById('editButton').style.display = 'none';
    document.getElementById('changePasswordButton').style.display = 'none';
    document.getElementById('submitEditButton').style.display = 'inline';
    document.getElementById('cancelEditButton').style.display = 'inline';
  }

  submitEditProfile(e) {
    e.preventDefault();
    console.log("imhere", this.state.firstName, this.state.lastName);

    user[0] = this.state.firstName;
    user[1] = this.state.lastName;

    const accountsRef = firebase.database().ref('accounts/' + user[6]);
    accountsRef.orderByChild('email')
      .equalTo(user[2])
      .once('value')
      .then(function (snapshot) {
        snapshot.ref.update({ fname: user[0] })
        snapshot.ref.update({ lname: user[1] })
        });

    document.getElementById('lblfName').style.display = 'inline';
    document.getElementById('lbllName').style.display = 'inline';

    document.getElementById('editfName').style.display = 'none';
    document.getElementById('editlName').style.display = 'none';

    document.getElementById('editButton').style.display = 'inline';
    document.getElementById('changePasswordButton').style.display = 'inline';
    document.getElementById('submitEditButton').style.display = 'none';
    document.getElementById('cancelEditButton').style.display = 'none';
  }

  cancelEditProfile() {
    document.getElementById('lblfName').style.display = 'inline';
    document.getElementById('lbllName').style.display = 'inline';

    document.getElementById('editfName').style.display = 'none';
    document.getElementById('editlName').style.display = 'none';

    document.getElementById('editButton').style.display = 'inline';
    document.getElementById('changePasswordButton').style.display = 'inline';
    document.getElementById('submitEditButton').style.display = 'none';
    document.getElementById('cancelEditButton').style.display = 'none';
  }

  changePassword() {

  }

  // Loads chat messages history and listens for upcoming ones.
  loadMessages() {
    var query = firebase.firestore()
                    .collection('messages')
                    .orderBy('timestamp', 'desc');
  }

  sendMessage(e) {
    e.preventDefault();

  		// save in database
  		firebase.firestore().collection('messages').add({
        email: user[2],
        text: this.state.message,
        timestamp: new Date()
      }).catch(function(error) {
        console.error('Error writing new message to database', error);
      });

      this.state.message = '';
      document.getElementById('message').value = '';
      loadMessages();
  	}

  // home page button
  homePageButton = () => {
    document.getElementById('homePage').style.display = "block";
    document.getElementById('bookPage').style.display = "none";
    document.getElementById('msgsPage').style.display = "none";
    document.getElementById('acctPage').style.display = "none";
  }

  // bookings page button
  bookPageButton = () => {
    document.getElementById('homePage').style.display = "none";
    document.getElementById('bookPage').style.display = "block";
    document.getElementById('msgsPage').style.display = "none";
    document.getElementById('acctPage').style.display = "none";
  }

  // messages page button
  msgsPageButton = () => {
    document.getElementById('homePage').style.display = "none";
    document.getElementById('bookPage').style.display = "none";
    document.getElementById('msgsPage').style.display = "block";
    document.getElementById('acctPage').style.display = "none";
  }

  // account page button
  acctPageButton = () => {
    document.getElementById('homePage').style.display = "none";
    document.getElementById('bookPage').style.display = "none";
    document.getElementById('msgsPage').style.display = "none";
    document.getElementById('acctPage').style.display = "block";
  }

render() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <div id='homePage'>
        <div>
          <h1>{"Welcome Home, " + user[0]}</h1>
        </div>
        <div>
          <button id='homeButton' title="Home" onClick={ this.homePageButton }>Home</button>
          <button id='bookButton' title="Book" onClick={ this.bookPageButton }>Book</button>
          <button id='msgsButton' title="Messages" onClick={ this.msgsPageButton }>Messages</button>
          <button id='acctButton' title="Account" onClick={ this.acctPageButton }>Account</button>
        </div>
      </div>

      <div id='bookPage' style={{display: 'none'}}>
        <div>
          <h1>This is the booking tab</h1>
        </div>
        <div>
          <button id='homeButton' title="Home" onClick={ this.homePageButton }>Home</button>
          <button id='bookButton' title="Book" onClick={ this.bookPageButton }>Book</button>
          <button id='msgsButton' title="Messages" onClick={ this.msgsPageButton }>Messages</button>
          <button id='acctButton' title="Account" onClick={ this.acctPageButton }>Account</button>
        </div>
      </div>

      <div id='msgsPage' style={{display: 'none'}}>

        <div>
          <h1>This is the messages tab</h1>
        </div>

        <div>
          <div>
            <h2>Chat</h2>
          </div>

          <div class="chat">
            <div class="chat-title">
              <h1>SIMWorld</h1>
              <h2>xxx name</h2>
            </div>
            <div class="messages">
              <div class="messages-content"></div>
            </div>
            <div class="message-box">
              <input id="message" placeholder="Enter message" autocomplete="off" value={this.state.message} onChange={this.handleChange} type="text" name="message" style={{width:'350px'}}/>
              <br/><br/>
              <button id='submitMsgButton' onClick={this.sendMessage}>Submit</button>
            </div>
          </div>
        </div>
        <br/><br/>
        <div>
          <button id='homeButton' title="Home" onClick={ this.homePageButton }>Home</button>
          <button id='bookButton' title="Book" onClick={ this.bookPageButton }>Book</button>
          <button id='msgsButton' title="Messages" onClick={ this.msgsPageButton }>Messages</button>
          <button id='acctButton' title="Account" onClick={ this.acctPageButton }>Account</button>
        </div>

      </div>

      <div id='acctPage' style={{display: 'none'}}>
        <div>
          <h1>{user[0] + " " + user[1]}</h1>
          <br />
          <br />
          <table>
            <tr>
              <td>First Name:</td>
              <td>
                <label id='lblfName' style={{display:'inline'}}>{user[0]}</label>
                <input id='editfName' style={{display:'none'}} value={this.state.firstName} onChange={this.handleChange} type="text" name="firstName" />
              </td>
            </tr>
            <tr>
              <td>Last Name:</td>
              <td>
                <label id='lbllName' style={{display:'inline'}}>{user[1]}</label>
                <input id='editlName' style={{display:'none'}} value={this.state.lastName} onChange={this.handleChange} type="text" name="lastName" />
              </td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>
                <label id='lblEmail' style={{display:'inline'}} name='email'>{user[2]}</label>
              </td>
            </tr>
            <tr>
              <td>isDriver:</td>
              <td>
                <label id='lblDriver' name='isDriver'>{user[4]}</label>
              </td>
            </tr>
            <tr>
              <td>isAdmin:</td>
              <td>
                <label id='lblAdmin' name='isAdmin'>{user[5]}</label>
              </td>
            </tr>
          </table>
          <br />
          <br />
          <button id='editButton' onClick={this.editProfile}>Edit Profile</button>
          <button id='changePasswordButton' onClick={this.changePassword}>Change Password</button>
          <button id='submitEditButton' onClick={this.submitEditProfile} style={{display:'none'}}>Update</button>
          <button id='cancelEditButton' onClick={this.cancelEditProfile} style={{display:'none'}}>Cancel</button>
          <br />
          <br />
          <button onClick={this.logout}>Logout</button>
        </div>
        <br />
        <div>
          <button id='homeButton' title="Home" onClick={ this.homePageButton }>Home</button>
          <button id='bookButton' title="Book" onClick={ this.bookPageButton }>Book</button>
          <button id='msgsButton' title="Messages" onClick={ this.msgsPageButton }>Messages</button>
          <button id='acctButton' title="Account" onClick={ this.acctPageButton }>Account</button>
        </div>
      </div>
    </View>
    );
  }
}

export default Home;
