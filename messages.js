// messages.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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

onAuthStateChanged(auth, (user) => {
    if (user) {
        displayMessages();
    }
});

function displayMessages() {
    const messageList = document.getElementById('messageList');
    messageList.innerHTML = ''; // Clear the existing messages
    const messageItem = document.createElement('div');
    messageItem.classList.add('message-item');
    messageItem.innerHTML = '<strong>Mahmoud B. (Owner):</strong> Custom message';
    messageItem.addEventListener('click', () => {
        showFullChat();
    });
    messageList.appendChild(messageItem);
}

function showFullChat() {
    const fullChat = document.createElement('div');
    fullChat.classList.add('full-chat');
    fullChat.innerHTML = `
        <button id="closeChat">❌ Exit</button>
        <div id="chatMessages"><div><strong>Mahmoud B. (Owner):</strong> Welcome to BeGay! This is a gay dating app made by me. </div></div>
        <div class="chat-input-blocked">
            <div class="chat-input">
                <input type="text" disabled placeholder="Type your message here...">
                <button disabled>Send</button>
            </div>
            <div class="blocked-message">You can't message this user</div>
        </div>
    `;
    document.body.appendChild(fullChat);

    document.getElementById('closeChat').addEventListener('click', () => {
        document.body.removeChild(fullChat);
    });
}
