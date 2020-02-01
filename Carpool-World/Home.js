import React, { Component } from 'react';
import { Text, View } from 'react-native';
import fire from './base';

class Home extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    fire.auth().signOut();
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <div>
          <h1>Welcome Home</h1>
          <br/>
          <button onClick={this.logout}>Logout</button>
        </div>
      </View>
    );
  }
}

export default Home;
