import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase,ref,get,child } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_YOUR_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_YOUR_FIREBASE_AUTH_DOMIAN,
  projectId: process.env.REACT_APP_YOUR_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_YOUR_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_YOUR_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_YOUR_FIREBASE_APP_ID
} 
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let username= document.getElementById("Username")
let password= document.getElementById("Password")
let login= document.getElementById("login")

login.addEventListener('click', Login);



  function Login() {
    const enteredUsername = username.value;
    const enteredPassword = password.value;

    // Retrieve the user data from the Realtime Database based on the entered username
    get(child(ref(db), "admin/" + enteredUsername))
        .then((snapshot) => {
            const user = snapshot.val();
            if (user && user.password === enteredPassword) {
                console.log("Login successful")
                alert("Login successful");
                f.style.display = "none";
                const root = ReactDOM.createRoot(document.getElementById("root"));
                root.render(<App />); 
            } else {
                alert("Invalid username or password");
            }
        })
        .catch((error) => {
            alert("Error retrieving user data: " + error.message);
        });
}
