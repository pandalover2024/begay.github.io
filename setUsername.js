// setUsername.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, updateProfile } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBgjMVmuPgdDvsqfcpMq8l6tyfjvQqFFcc",
    authDomain: "begay-8b630.firebaseapp.com",
    projectId: "begay-8b630",
    storageBucket: "begay-8b630.appspot.com",
    messagingSenderId: "787861909047",
    appId: "1:787861909047:web:bbc330176712bd5c3d99b2",
    measurementId: "G-GX1KQ2SX3M"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

document.getElementById('setUsernameForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const user = auth.currentUser;

    if (user) {
        try {
            // Update the username in Firestore
            const docRef = doc(db, "users", user.uid);
            await updateDoc(docRef, { username });

            // Optionally update the username in Firebase Authentication
            await updateProfile(user, { displayName: username });

            showMessage('Username updated successfully', 'setUsernameMessage');
            setTimeout(() => {
                window.location.href = 'homepage.html';
            }, 2000);
        } catch (error) {
            showMessage('Error updating username: ' + error.message, 'setUsernameMessage');
        }
    }
});

function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function() {
        messageDiv.style.opacity = 0;
    }, 5000);
}
