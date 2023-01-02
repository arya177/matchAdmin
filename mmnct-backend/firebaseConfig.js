const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyB_NhDFJCRkbTA7Ta9TdI5waE_lvfT4gAU",
  authDomain: "mmnct-fac3f.firebaseapp.com",
  databaseURL: "https://mmnct-fac3f-default-rtdb.firebaseio.com",
  projectId: "mmnct-fac3f",
  storageBucket: "mmnct-fac3f.appspot.com",
  messagingSenderId: "411682587074",
  appId: "1:411682587074:web:03f12edd898f488500565b",
  measurementId: "G-414HCTVM9Q"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

module.exports = database;
