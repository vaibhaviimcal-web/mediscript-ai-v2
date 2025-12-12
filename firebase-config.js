// Firebase Configuration
// Replace with your Firebase project credentials from Firebase Console

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase (will be loaded from CDN in index.html)
let app, auth, db, storage;

function initializeFirebase() {
  if (typeof firebase === 'undefined') {
    console.error('Firebase SDK not loaded. Please check your internet connection.');
    return false;
  }

  try {
    app = firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
    storage = firebase.storage();
    
    console.log('✅ Firebase initialized successfully');
    return true;
  } catch (error) {
    console.error('Firebase initialization error:', error);
    return false;
  }
}

// Auth state observer
function onAuthStateChanged(callback) {
  if (!auth) return;
  auth.onAuthStateChanged(callback);
}

// Get current user
function getCurrentUser() {
  return auth ? auth.currentUser : null;
}

// Sign out
async function signOut() {
  if (!auth) return;
  try {
    await auth.signOut();
    console.log('✅ User signed out');
    return true;
  } catch (error) {
    console.error('Sign out error:', error);
    return false;
  }
}
