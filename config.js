// firebase
const { initializeApp } = require("firebase/app")
const { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyBd2GLUirB-cnZm7_JmuvYJbRUWtCaLieE",
  authDomain: "login-5b675.firebaseapp.com",
  projectId: "login-5b675",
  storageBucket: "login-5b675.appspot.com",
  messagingSenderId: "710838743483",
  appId: "1:710838743483:web:53297f266cdbc960e2549e",
  measurementId: "G-101LL9H7XL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

module.exports = auth

// ===============================
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    return signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });