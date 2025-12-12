# 🚀 MediScript AI v2 - Complete Setup Guide

## Phase 2: Production System with Firebase Backend

---

## 📋 **PREREQUISITES**

1. Google Account (for Firebase)
2. Groq API Key (already have: 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)
3. SendGrid Account (optional - for emails)

---

## 🔥 **FIREBASE SETUP (10 Minutes)**

### Step 1: Create Firebase Project

1. Go to: https://console.firebase.google.com
2. Click **"Add project"**
3. Project name: **mediscript-ai**
4. Disable Google Analytics (optional)
5. Click **"Create project"**

### Step 2: Enable Firestore Database

1. In Firebase Console, click **"Firestore Database"**
2. Click **"Create database"**
3. Select **"Start in production mode"**
4. Choose location: **asia-south1** (Mumbai - closest to India)
5. Click **"Enable"**

### Step 3: Enable Authentication

1. Click **"Authentication"** in sidebar
2. Click **"Get started"**
3. Click **"Email/Password"** → Enable → Save
4. (Optional) Click **"Google"** → Enable → Save

### Step 4: Enable Storage

1. Click **"Storage"** in sidebar
2. Click **"Get started"**
3. Start in **production mode**
4. Click **"Done"**

### Step 5: Get Firebase Configuration

1. Click **⚙️ Settings** → **Project settings**
2. Scroll to **"Your apps"**
3. Click **Web icon** (</>) to add web app
4. App nickname: **MediScript AI**
5. Check **"Also set up Firebase Hosting"**
6. Click **"Register app"**
7. **COPY** the firebaseConfig object

Example:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "mediscript-ai.firebaseapp.com",
  projectId: "mediscript-ai",
  storageBucket: "mediscript-ai.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxx"
};
```

### Step 6: Update firebase-config.js

1. Open `firebase-config.js` in this repository
2. Replace the firebaseConfig object with YOUR config
3. Commit changes

---

## 🔒 **FIREBASE SECURITY RULES**

### Firestore Rules

Go to **Firestore Database** → **Rules** tab and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }

    // Users collection
    match /users/{userId} {
      allow read: if isSignedIn();
      allow write: if isOwner(userId);
    }

    // Patients collection
    match /patients/{patientId} {
      allow read: if isSignedIn();
      allow create: if isSignedIn();
      allow update, delete: if isSignedIn();
    }

    // Appointments collection
    match /appointments/{appointmentId} {
      allow read: if isSignedIn();
      allow create: if isSignedIn();
      allow update, delete: if isSignedIn();
    }

    // Prescriptions collection
    match /prescriptions/{prescriptionId} {
      allow read: if isSignedIn();
      allow create: if isSignedIn();
      allow update, delete: if isSignedIn();
    }

    // Invoices collection
    match /invoices/{invoiceId} {
      allow read: if isSignedIn();
      allow create: if isSignedIn();
      allow update, delete: if isSignedIn();
    }
  }
}
```

Click **"Publish"**

### Storage Rules

Go to **Storage** → **Rules** tab and paste:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.resource.size < 5 * 1024 * 1024;
    }
  }
}
```

Click **"Publish"**

---

## 📧 **SENDGRID SETUP (Optional - 5 Minutes)**

### Step 1: Create SendGrid Account

1. Go to: https://sendgrid.com
2. Sign up (FREE - 100 emails/day)
3. Verify email

### Step 2: Create API Key

1. Go to **Settings** → **API Keys**
2. Click **"Create API Key"**
3. Name: **MediScript AI**
4. Permissions: **Full Access**
5. Click **"Create & View"**
6. **COPY** the API key (starts with SG.)

### Step 3: Update notifications.js

1. Open `notifications.js`
2. Replace `YOUR_SENDGRID_API_KEY` with your actual key
3. Commit changes

---

## 🚀 **DEPLOYMENT**

### Option 1: Firebase Hosting (Recommended)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init

# Select:
# - Hosting
# - Use existing project: mediscript-ai
# - Public directory: . (current directory)
# - Single-page app: Yes
# - GitHub integration: No

# Deploy
firebase deploy
```

Your app will be live at: **https://mediscript-ai.web.app**

### Option 2: GitHub Pages (Current)

Already deployed at: **https://vaibhaviimcal-web.github.io/mediscript-ai-v2/**

Just update firebase-config.js with your Firebase credentials!

---

## ✅ **VERIFICATION CHECKLIST**

After setup, verify:

- [ ] Firebase project created
- [ ] Firestore enabled
- [ ] Authentication enabled
- [ ] Storage enabled
- [ ] Security rules published
- [ ] firebase-config.js updated with YOUR config
- [ ] Groq API key configured (already done)
- [ ] SendGrid API key configured (optional)
- [ ] App deployed and accessible

---

## 🧪 **TESTING**

1. Open your deployed URL
2. Register a new user (email/password)
3. Login
4. Create a patient
5. Generate AI prescription
6. Create invoice
7. Test all features!

---

## 💰 **COST**

**Total: $0/month**

- Firebase: FREE tier (1GB database, unlimited users)
- Groq API: FREE (14,400 requests/day)
- SendGrid: FREE (100 emails/day)
- GitHub Pages: FREE

---

## 📞 **SUPPORT**

If you face any issues:
1. Check browser console for errors
2. Verify Firebase config is correct
3. Check Firebase security rules
4. Ensure you're logged in

---

## 🎯 **NEXT STEPS**

After setup is complete:
1. Customize clinic information in config.js
2. Add more medicines to drug-database.js
3. Customize email templates in notifications.js
4. Add your logo and branding
5. Test with real patients!

---

**Setup time: 15-20 minutes**  
**Result: Production-ready AI prescription system!** 🎉
