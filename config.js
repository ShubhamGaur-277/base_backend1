const firebase = require("firebase");


const firebaseConfig = {
  apiKey: "AIzaSyDmInJF95yQqSqj8-xzlrRaGycrCQFYvEc",
  authDomain: "assignment-49ca6.firebaseapp.com",
  projectId: "assignment-49ca6",
  storageBucket: "assignment-49ca6.appspot.com",
  messagingSenderId: "892934145185",
  appId: "1:892934145185:web:8644cff03f6fbb26601ce0",
  measurementId: "G-FRD935CSRM"
};

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const User = db.collection("users")

module.exports = User;