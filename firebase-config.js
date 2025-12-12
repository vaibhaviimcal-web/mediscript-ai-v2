// Firebase Configuration
// MediScript AI - Production Firebase Project

const firebaseConfig = {
  apiKey: "AIzaSyAZH8VLSoUV5fZD9ptw1i6m3bTV3SZ5wGg",
  authDomain: "mediscript-ai-78d2f.firebaseapp.com",
  projectId: "mediscript-ai-78d2f",
  storageBucket: "mediscript-ai-78d2f.firebasestorage.app",
  messagingSenderId: "590655526128",
  appId: "1:590655526128:web:bd52e56obddd562fe1e35",
  measurementId: "G-TYTEEY9SFC"
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
    console.log('📊 Project:', firebaseConfig.projectId);
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
