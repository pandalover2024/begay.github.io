import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";

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
const storage = getStorage();

function loadProfile(userId) {
    const userRef = doc(db, 'users', userId);
    getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
            const userData = docSnap.data();
            document.getElementById('profileName').innerText = `${userData.firstName} ${userData.lastName}`;
            document.getElementById('profileHobbies').innerText = `Hobbies: ${userData.hobbies}`;
            document.getElementById('profileInterests').innerText = `Interests: ${userData.interests}`;
            document.getElementById('profileSexuality').innerText = `Sexuality: ${userData.sexuality}`;

            const profilePic = document.getElementById('profilePic');
            if (userData.profilePic) {
                const picRef = ref(storage, userData.profilePic);
                getDownloadURL(picRef).then((url) => {
                    profilePic.src = url;
                });
            }
        }
    });
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        loadProfile(user.uid);
    } else {
        window.location.href = 'index.html';
    }
});

document.getElementById('logout').addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = 'index.html';
    }).catch((error) => {
        console.error('Error signing out:', error);
    });
});
