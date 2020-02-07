import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Link } from 'react-router-dom';
import fire from './base';

var user = new Array(7); //fname, lname, email, passw, isDriver, isAdmin, id

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repassword: ''
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).catch((error) => {
          alert("Wrong E-Mail/Password")
      })

      user[2] = this.state.email;

      const accountsRef = fire.database().ref('accounts');
      accountsRef.orderByChild('email')
        .equalTo(this.state.email)
        .once('value')
        .then(function (snapshot) {
          snapshot.forEach(function(child) {
            user[0] = child.val().fname;
            user[1] = child.val().lname;
            user[3] = child.val().passw;
            user[4] = child.val().isDriver;
            user[5] = child.val().isAdmin;
            user[6] = child.key;
            console.log(child.val().fname, child.val().email);
          });
        })
  }

  signup(e) {
    e.preventDefault();
    if (this.state.password != this.state.repassword) {
      alert("Passwords do not match");
    }

    else {
      fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
      }).then((u)=>{console.log(u)})
      .catch((error) => {
          alert("Ono, something went wrong!\nPlease try again")
      })

      const accountsRef = fire.database().ref('accounts');
      const account = {
        fname: this.state.firstName,
        lname: this.state.lastName,
        email: this.state.email,
        passw: this.state.password,
        isDriver: "no",
        isAdmin: "no"
      }

      user[0] = account.fname;
      user[1] = account.lname;
      user[2] = account.email;
      user[3] = account.passw;
      user[4] = account.isDriver;
      user[5] = account.isAdmin;
      user[6] = account.key;

      accountsRef.push(account);
      this.state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repassword: ''
      };
    }
  }

  extendsignup(e) {
    e.preventDefault();
    document.getElementById("signinblock").style.display = "none";
    document.getElementById("signupblock").style.display = "block";
  }

  cancel(e) {
    e.preventDefault();
    document.getElementById("signinblock").style.display = "block";
    document.getElementById("signupblock").style.display = "none";
  }

  test(email) {
    return email;
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <div>
          <form>
            <div id="signinblock">
              <input value={this.state.email} onChange={this.handleChange} type="email" name="email" placeholder="E-Mail (test@nondriver.com)" />
              <input value={this.state.password} onChange={this.handleChange} type="password" name="password" placeholder="Password (rider01)" style={{marginLeft: '15px'}}/>
              <br/>
              <br/>
              <button type="submit" onClick={this.login}>Sign In</button>
              <button onClick={this.extendsignup} style={{marginLeft: '25px'}}>Sign Up</button>
            </div>

            <div id="signupblock" style={{display: 'none'}}>
              <table>
                <tr>
                  <td>First Name</td>
                  <td><input value={this.state.firstName} onChange={this.handleChange} type="text" name="firstName"/></td>
                </tr>
                <tr>
                  <td>Last Name</td>
                  <td><input value={this.state.lastName} onChange={this.handleChange} type="text" name="lastName"/></td>
                </tr>
                <tr>
                  <td>E-Mail</td>
                  <td><input value={this.state.email} onChange={this.handleChange} type="email" name="email"/></td>
                </tr>
                <tr>
                  <td>Password</td>
                  <td><input value={this.state.password} onChange={this.handleChange} type="password" name="password"/></td>
                </tr>
                <tr>
                  <td>Re-Enter Password</td>
                  <td><input value={this.state.repassword} onChange={this.handleChange} type="password" name="repassword"/></td>
                </tr>
              </table>
              <br/>
              <button onClick={this.signup}>Submit</button>
              <button onClick={this.cancel} style={{marginLeft: '25px'}}>Cancel</button>
            </div>
          </form>
        </div>
      </View>
    );
  }
}

export default Login;
export { user }
