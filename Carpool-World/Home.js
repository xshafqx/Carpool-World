import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from './base';
import 'firebase/firestore';
import {user} from './Login';

var unameArr = [];
var chatName;

class Home extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.submitEditProfile = this.submitEditProfile.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.searchUsername = this.searchUsername.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      repassword: '',
      isDriver: '',
      isAdmin: '',
      to: '',
      from: '',
      message: ''
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // goes back to login page if stumble upon another page by accident without logging in
  componentDidMount() {
    if (typeof user[3] === 'undefined') {
      firebase.auth().signOut();
    }
    else {
      var query = firebase.firestore()
                      .collection('messages')
                      .where("from", "==", "testthis")
                      .where("to", "==", "testthis")
                      .orderBy('timestamp', 'asc')
                      .limit(10);

      query.onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
          var message = change.doc.data();
          var html = "";
      		// give each message a unique ID
      		html += "<li id='message-" + snapshot.key + "'>";
          html += message.from + ": " + message.text;
		      html += "</li>";

          document.getElementById("messages").innerHTML += html;
        });
      });
    }

    // loads accounts
    firebase.database().ref('accounts')
                       .orderByChild('email')
                       .once('value')
                       .then(function(snapshot) {
                         var i = 0;
                         snapshot.forEach(function(child) {
                           unameArr[i] = child.val().uname;
                           i++;
                         })
                      });
  }

  logout() {
    user[0] = '';
    user[1] = '';
    user[2] = '';
    user[3] = '';
    user[4] = '';
    user[5] = '';
    user[6] = '';
    user[7] = '';

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

    const accountsRef = firebase.database().ref('accounts/' + user[7]);
    accountsRef.orderByChild('email')
      .equalTo(user[3])
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

  sendMessage(e) {
    e.preventDefault();

    // firebase.firestore().collection('messages').doc(chatName)
    //         .get()
    //         .then((docSnapshot) => {
    //           if (docSnapshot.exists) {
    //             // save in database
    //         		firebase.firestore().collection('messages/' + chatName).add({
    //               from: user[2],
    //               to: this.state.to,
    //               text: this.state.message,
    //               timestamp: new Date()
    //             }).catch(function(error) {
    //               console.error('Error writing new message to database', error);
    //             });
    //
    //             this.state.message = '';
    //             document.getElementById('message').value = '';
    //           }
    //           else {
    //
    //           }
    //         })

  		// save in database
  		firebase.firestore().collection('chat').doc(chatName).collection('messages').add({
        from: user[2],
        to: this.state.to,
        text: this.state.message,
        timestamp: new Date()
      }).catch(function(error) {
        console.error('Error writing new message to database', error);
      });

      this.state.message = '';
      document.getElementById('message').value = '';
  	}

    searchUsername(e) {
      e.preventDefault();

      var i = 0;

      while (i < unameArr.length+1) {
        if (this.state.to === unameArr[i]) {
          document.getElementById('searchUser').style.display = "none";
          document.getElementById('sendNewMessage').style.display = "block";

          chatName;
          if (user[2].length != this.state.to.length) {
            if (user[2].length < this.state.to.length) {
              chatName = (user[2]+"-"+this.state.to)
            }
            else {
              chatName = (this.state.to+"-"+user[2])
            }
          }
          else {
            var i = 0;
            while (i < user[2].length) {
              if (user[2][i] != this.state.to[i]) {
                if (user[2][i] < this.state.to[i]) {
                  chatName = (user[2]+"-"+this.state.to)
                }
                else {
                  chatName = (this.state.to+"-"+user[2])
                }
              }
              else {
                i++;
              }
            }
          }

          console.log(chatName);

          var newStr = (chatName.replace(user[2], '')).replace('-', '');
          document.getElementById('chattingTo').innerHTML = newStr;

          break;
        }
        else if (i === unameArr.length) {
          alert("User not found.")
        }
        i++;
      }
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

  newMsgButton = () => {
    document.getElementById('searchUser').style.display = "block";
    document.getElementById('sendNewMessage').style.display = "none";
    this.state.to = '';
    document.getElementById('selectUser').value = '';
  }

  inboxMsgButton = () => {

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
        <div class="chat">
          <div class="chat-title">
            <h1>SIMWorld Chat</h1>
          </div>
          <div id='msgOption' >
            <button id='inboxMsgButton' title="Inbox" onClick={ this.inboxMsgButton }>Inbox</button>
            <button id='newMsgButton' title="newMessage" onClick={ this.newMsgButton }>New Message</button>
          </div>
          <br/>
          <div id='searchUser' style={{display: 'none'}}>
            <input id="selectUser" placeholder="Search user" autocomplete="off" value={this.state.to} onChange={this.handleChange} type="text" name="to" style={{width:'350px'}} />
            <button id='submitSearchUserButton' onClick={this.searchUsername}>Submit</button>
          </div>

          <div id="sendNewMessage" style={{display: 'none'}}>
          <h2 id='chattingTo'></h2>
            <div class="messages-content">
              <ul id="messages"></ul>
            </div>
            <div class="message-box">
              <input id="message" placeholder="Enter message" autocomplete="off" value={this.state.message} onChange={this.handleChange} type="text" name="message" style={{width:'350px'}} />
              <button id='submitMsgButton' onClick={this.sendMessage}>Submit</button>
            </div>
          </div>
        </div>

        <br />
        <br />
        <div>
          <button id='homeButton' title="Home" onClick={ this.homePageButton }>Home</button>
          <button id='bookButton' title="Book" onClick={ this.bookPageButton }>Book</button>
          <button id='msgsButton' title="Messages" onClick={ this.msgsPageButton }>Messages</button>
          <button id='acctButton' title="Account" onClick={ this.acctPageButton }>Account</button>
        </div>
      </div>

      <div id='acctPage' style={{display: 'none'}}>
        <div>
          <h1>{user[2] + " Account"}</h1>
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
                <label id='lblEmail' style={{display:'inline'}} name='email'>{user[3]}</label>
              </td>
            </tr>
            <tr>
              <td>isDriver:</td>
              <td>
                <label id='lblDriver' name='isDriver'>{user[5]}</label>
              </td>
            </tr>
            <tr>
              <td>isAdmin:</td>
              <td>
                <label id='lblAdmin' name='isAdmin'>{user[6]}</label>
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
