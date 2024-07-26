import { getFirestore, doc, getDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    const db = getFirestore();
    const chatMessages = document.getElementById('chatMessages');
    const backButton = document.getElementById('backButton');

    // Get chat ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const chatId = urlParams.get('chatId');

    // Function to render chat messages
    const renderChatMessages = (messages) => {
        chatMessages.innerHTML = '';
        messages.forEach(message => {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message';
            messageDiv.innerHTML = `
                <div class="sender">${message.sender}</div>
                <div class="content">${message.content}</div>
            `;
            chatMessages.appendChild(messageDiv);
        });
    };

    // Load chat messages from Firebase
    const loadChatMessages = async () => {
        try {
            const messagesRef = collection(db, "messages");
            const q = query(messagesRef, where("chatId", "==", chatId));
            const querySnapshot = await getDocs(q);
            const messages = querySnapshot.docs.map(doc => doc.data());
            renderChatMessages(messages);
        } catch (error) {
            console.error("Error loading chat messages:", error);
        }
    };

    loadChatMessages();

    // Add click event to back button
    backButton.addEventListener('click', () => {
        window.location.href = 'messages.html';
    });
});
