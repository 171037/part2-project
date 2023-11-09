// firebase
const { initializeApp } = require("firebase/app")
const { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } = require("firebase/auth");

// firebase 설정
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
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