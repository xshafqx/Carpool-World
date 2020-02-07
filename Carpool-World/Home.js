import React, { Component } from 'react';
import { Text, View } from 'react-native';
import fire from './base';
import {email, fname, lname, passw} from './Login';

class Home extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    console.log(email);
    fire.auth().signOut();
  }

/*componentDidMount() {

  }*/

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
          <h1>{"Welcome Home, " + fname}</h1>
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
           <button id='homeButton' title="Home" onClick={ this.homePageButton }>Home</button>
           <button id='bookButton' title="Book" onClick={ this.bookPageButton }>Book</button>
           <button id='msgsButton' title="Messages" onClick={ this.msgsPageButton }>Messages</button>
           <button id='acctButton' title="Account" onClick={ this.acctPageButton }>Account</button>
         </div>
       </div>

       <div id='acctPage' style={{display: 'none'}}>
         <div>
           <h1>This is the account tab</h1>
           <button onClick={this.logout}>Logout</button>
           <br/>
           <br/>
         </div>
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
