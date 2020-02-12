const functions = require('firebase-functions');
const express = require('express');

const app = express();

app.get('/timestamp', (request, response) => {
  response.send(`${Date.now()}`);
});

exports.helloWorld = functions.https.onRequest(app);
