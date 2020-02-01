import firebase from 'firebase'
var config = { 
  apiKey: "AIzaSyBDdMOQ8JsJkf8TNF4nyglea0OgYQ7JlVI",
  authDomain: "carpool-world.firebaseapp.com",
  databaseURL: "https://carpool-world.firebaseio.com",
  projectId: "carpool-world",
  storageBucket: "carpool-world.appspot.com",
  messagingSenderId: "587281065249",
  appId: "1:587281065249:web:72a8da70544c479dcf0a60",
  measurementId: "G-FSVE5C2TM3"
};
var fire = firebase.initializeApp(config);
export default fire;
