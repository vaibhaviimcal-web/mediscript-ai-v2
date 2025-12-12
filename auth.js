// Authentication Module
// Handles user login, registration, and session management

// Sign up with email and password
async function signUp(email, password, displayName, role = 'doctor') {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Update profile
    await user.updateProfile({ displayName: displayName });

    // Create user document in Firestore
    await db.collection('users').doc(user.uid).set({
      uid: user.uid,
      email: email,
      displayName: displayName,
      role: role,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      active: true
    });

    console.log('✅ User registered successfully');
    return { success: true, user: user };
  } catch (error) {
    console.error('Sign up error:', error);
    return { success: false, error: error.message };
  }
}

// Sign in with email and password
async function signIn(email, password) {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    console.log('✅ User signed in successfully');
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Sign in error:', error);
    return { success: false, error: error.message };
  }
}

// Sign in with Google
async function signInWithGoogle() {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    
    // Check if user document exists, create if not
    const userDoc = await db.collection('users').doc(result.user.uid).get();
    if (!userDoc.exists) {
      await db.collection('users').doc(result.user.uid).set({
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        role: 'doctor',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        active: true
      });
    }

    console.log('✅ Google sign in successful');
    return { success: true, user: result.user };
  } catch (error) {
    console.error('Google sign in error:', error);
    return { success: false, error: error.message };
  }
}

// Reset password
async function resetPassword(email) {
  try {
    await auth.sendPasswordResetEmail(email);
    console.log('✅ Password reset email sent');
    return { success: true };
  } catch (error) {
    console.error('Password reset error:', error);
    return { success: false, error: error.message };
  }
}

// Get user role
async function getUserRole(uid) {
  try {
    const userDoc = await db.collection('users').doc(uid).get();
    if (userDoc.exists) {
      return userDoc.data().role;
    }
    return 'doctor'; // Default role
  } catch (error) {
    console.error('Get user role error:', error);
    return 'doctor';
  }
}

// Check if user has permission
async function hasPermission(requiredRole) {
  const user = getCurrentUser();
  if (!user) return false;

  const userRole = await getUserRole(user.uid);
  
  const roleHierarchy = {
    'admin': 3,
    'doctor': 2,
    'staff': 1
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}
