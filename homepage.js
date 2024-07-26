import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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

document.getElementById('messagesButton').addEventListener('click', async () => {
    const modal = document.getElementById('messagesModal');
    modal.style.display = 'block';
    await displayMessages();

    const user = auth.currentUser;
    if (user) {
        const userDoc = doc(db, "users", user.uid);
        await setDoc(userDoc, { unreadMessages: false }, { merge: true });
        
        const unreadCount = document.getElementById('unreadCount');
        if (unreadCount) {
            unreadCount.style.display = 'none';
        }
    }
});

document.getElementsByClassName('close')[0].addEventListener('click', () => {
    const modal = document.getElementById('messagesModal');
    modal.style.display = 'none';
});

window.onclick = function(event) {
    const modal = document.getElementById('messagesModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

onAuthStateChanged(auth, async (user) => {
    if (user) {
        document.getElementById('loggedUserName').textContent = `Welcome, ${user.displayName}`;
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data().unreadMessages === false) {
            const unreadCount = document.getElementById('unreadCount');
            if (unreadCount) {
                unreadCount.style.display = 'none';
            }
        }
    }
});

async function displayMessages() {
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
        <div id="chatMessages"><div><strong>Mahmoud B. (Owner):</strong> </div></div>
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

document.getElementById('logout').addEventListener('click', () => {
    auth.signOut().then(() => {
        window.location.href = 'index.html';
    });
});
