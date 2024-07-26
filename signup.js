import { auth, createUserWithEmailAndPassword, db, doc, setDoc, query, where, getDocs } from './firebaseauth.js';

// Function to check if the username already exists
async function usernameExists(username) {
    const q = query(doc(db, "users", username)); // Assumes usernames are stored as document IDs
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
}

document.getElementById('submitSignUp').addEventListener('click', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const hobbies = Array.from(document.getElementById('hobbies').selectedOptions).map(option => option.value);
    const interests = Array.from(document.getElementById('interests').selectedOptions).map(option => option.value);
    const sexuality = document.getElementById('sexuality').value;
    const profilePic = document.getElementById('profilePic').files[0];

    // Check if username exists
    if (await usernameExists(username)) {
        document.getElementById('signUpMessage').textContent = "Username already exists!";
        return;
    }

    try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user profile to Firestore
        await setDoc(doc(db, "users", username), {
            firstName,
            lastName,
            email,
            hobbies,
            interests,
            sexuality,
            profilePicURL: '' // Placeholder for profile picture URL
        });

        // Handle profile picture upload
        if (profilePic) {
            const storageRef = ref(storage, 'profilePics/' + username);
            await uploadBytes(storageRef, profilePic);
            const profilePicURL = await getDownloadURL(storageRef);

            // Update Firestore with the profile picture URL
            await setDoc(doc(db, "users", username), {
                profilePicURL
            }, { merge: true });
        }

        document.getElementById('signUpMessage').textContent = "Sign up successful!";
    } catch (error) {
        document.getElementById('signUpMessage').textContent = "Error signing up: " + error.message;
    }
});

// Check username availability every second
document.getElementById('username').addEventListener('input', () => {
    clearTimeout(window.usernameCheckTimeout);
    window.usernameCheckTimeout = setTimeout(async () => {
        const username = document.getElementById('username').value;
        if (await usernameExists(username)) {
            document.getElementById('username').setCustomValidity("Username already taken");
        } else {
            document.getElementById('username').setCustomValidity("");
        }
    }, 1000);
});
