# 🤖 MediScript AI v2 - Enterprise Prescription System

## Real AI-Powered Prescription Generation with Complete Backend

**Live Demo:** https://vaibhaviimcal-web.github.io/mediscript-ai-v2/

---

## ✨ **FEATURES**

### **Phase 1 (Complete ✅)**
- ✅ Patient Management (CRUD)
- ✅ Appointment Scheduling
- ✅ AI Prescription Generator (Groq Llama 3.3 70B)
- ✅ Voice Input (Web Speech API)
- ✅ PDF Generation
- ✅ Dashboard with Analytics
- ✅ Mobile Responsive

### **Phase 2 (Complete ✅)**
- ✅ Firebase Backend (Firestore Database)
- ✅ Authentication (Email/Password + Google Sign-In)
- ✅ Role-Based Access (Doctor/Staff/Admin)
- ✅ Drug Database (1000+ medicines)
- ✅ Drug Interaction Checker
- ✅ Dosage Calculator
- ✅ Billing System with GST (18%)
- ✅ Invoice Generation (PDF)
- ✅ Payment Tracking
- ✅ Search & Filter (All entities)
- ✅ Pagination (20 per page)
- ✅ Email Notifications (SendGrid)
- ✅ Reports & Analytics
- ✅ Data Export (CSV)
- ✅ Backup & Recovery
- ✅ Security Hardening
- ✅ Performance Optimization

---

## 🛠️ **TECH STACK**

| Component | Technology | Cost |
|-----------|-----------|------|
| Frontend | HTML/JS/Tailwind CSS | FREE |
| Database | Firebase Firestore | FREE |
| Authentication | Firebase Auth | FREE |
| Storage | Firebase Storage | FREE |
| Hosting | Firebase Hosting / GitHub Pages | FREE |
| AI | Groq API (Llama 3.3 70B) | FREE |
| Voice | Web Speech API | FREE |
| Email | SendGrid | FREE |
| **TOTAL** | | **$0/month** |

---

## 📦 **PROJECT STRUCTURE**

```
mediscript-ai-v2/
├── index.html              # Main application
├── config.js               # Groq API configuration
├── firebase-config.js      # Firebase initialization
├── auth.js                 # Authentication system
├── database.js             # Firestore CRUD operations
├── drug-database.js        # 1000+ medicines database
├── billing.js              # Invoice & GST system
├── notifications.js        # Email notification system
├── reports.js              # Analytics & reports
├── utils.js                # Helper functions
├── README.md               # This file
└── SETUP.md                # Detailed setup instructions
```

---

## 🚀 **QUICK START**

### 1. Clone Repository

```bash
git clone https://github.com/vaibhaviimcal-web/mediscript-ai-v2.git
cd mediscript-ai-v2
```

### 2. Setup Firebase

Follow detailed instructions in [SETUP.md](SETUP.md)

**Quick steps:**
1. Create Firebase project
2. Enable Firestore, Auth, Storage
3. Copy Firebase config
4. Update `firebase-config.js`

### 3. Configure APIs

**Groq API (Already configured):**
- API Key: Already in `config.js`
- Model: llama-3.3-70b-versatile
- Free tier: 14,400 requests/day

**SendGrid (Optional):**
- Sign up at sendgrid.com
- Get API key
- Update `notifications.js`

### 4. Deploy

**Option A: Firebase Hosting**
```bash
firebase deploy
```

**Option B: GitHub Pages**
Already deployed at: https://vaibhaviimcal-web.github.io/mediscript-ai-v2/

---

## 💡 **HOW IT WORKS**

### **AI Prescription Generation**

1. Doctor selects patient
2. Enters symptoms (or uses voice input 🎤)
3. AI analyzes:
   - Patient age, gender
   - Medical history
   - Known allergies
   - Current symptoms
4. AI suggests medicines with:
   - Medicine name
   - Dosage
   - Frequency (OD/BD/TDS/QID)
   - Duration
   - Instructions
5. Doctor reviews and modifies
6. System checks drug interactions
7. Generates professional PDF
8. Sends via email (optional)

### **Drug Safety Checks**

- ✅ Allergy detection (avoids contraindicated drugs)
- ✅ Drug interaction warnings
- ✅ Age-appropriate dosing
- ✅ Contraindication alerts
- ✅ Pregnancy category warnings

### **Billing System**

- Auto-calculates GST (18%)
- Tracks payments (Paid/Pending/Partial)
- Generates professional invoices
- Payment history
- Revenue analytics

---

## 📊 **FREE TIER LIMITS**

### **Firebase (FREE)**
- Database: 1GB (10,000+ patients)
- Users: Unlimited
- Bandwidth: 10GB/month
- Storage: 5GB
- Reads: 50K/day
- Writes: 20K/day

### **Groq API (FREE)**
- Requests: 14,400/day
- Tokens: 6M/minute
- Models: Llama 3.3 70B, Mixtral, Gemma

### **SendGrid (FREE)**
- Emails: 100/day (3,000/month)

**Can handle:**
- 10,000 patients
- 50,000 appointments/year
- 20,000 prescriptions/year
- 100 emails/day

---

## 🎯 **FEATURES BREAKDOWN**

### **1. Patient Management**
- Register patients with complete medical history
- Track allergies (critical for AI)
- Search by name/ID/phone
- Edit patient details
- Soft delete (data preserved)
- Patient history view

### **2. Appointment Scheduling**
- Book appointments with date/time
- Auto-assign token numbers
- Conflict detection
- Status tracking (Scheduled/Completed/Cancelled)
- Filter by date/status
- Calendar view

### **3. AI Prescription Generator**
- Real AI (Groq Llama 3.3 70B)
- Considers patient history
- Avoids allergies
- Suggests evidence-based medicines
- Customizable by doctor
- Drug interaction warnings
- Professional PDF output

### **4. Voice Input**
- Click 🎤 to speak
- Real-time transcription
- Works in Chrome/Edge
- Supports English (Indian accent)
- Auto-fills diagnosis field

### **5. Billing System**
- Create invoices with line items
- Auto-calculate GST (18%)
- Track payments (Cash/Card/UPI)
- Generate receipt PDFs
- Payment history
- Outstanding balance tracking

### **6. Reports & Analytics**
- Revenue reports (daily/weekly/monthly)
- Patient demographics (age/gender)
- Prescription patterns (top medicines)
- Appointment trends
- Export to CSV
- Visual charts

### **7. Search & Filter**
- Patient search (name/ID/phone/email)
- Appointment filter (date/status)
- Prescription search (diagnosis/medicine)
- Invoice filter (status/date/amount)
- Advanced filters

### **8. Email Notifications**
- Appointment reminders
- Prescription delivery
- Invoice emails
- Payment receipts
- Password reset

---

## 🔐 **SECURITY FEATURES**

- ✅ Firebase Authentication (secure login)
- ✅ Role-based access control
- ✅ Firestore security rules
- ✅ Input sanitization
- ✅ XSS protection
- ✅ HTTPS only
- ✅ Session management
- ✅ Password encryption

---

## 📱 **MOBILE RESPONSIVE**

- Works on phones, tablets, desktops
- Touch-friendly UI
- Responsive tables
- Mobile navigation
- Optimized for all screen sizes

---

## 🎓 **USER ROLES**

### **Doctor**
- Full access to all features
- Create/edit patients
- Generate prescriptions
- View all reports

### **Staff**
- Register patients
- Book appointments
- Generate invoices
- Limited access to reports

### **Admin**
- All doctor permissions
- User management
- System configuration
- Full analytics access

---

## 💰 **COST BREAKDOWN**

### **Development**
- Development: FREE (open source)
- Setup time: 15-20 minutes

### **Monthly Operating Costs**
- Firebase: **$0** (free tier)
- Groq API: **$0** (free tier)
- SendGrid: **$0** (free tier)
- GitHub Pages: **$0** (free)

**Total: $0/month** for up to 10,000 patients!

### **When to Upgrade**

Upgrade to paid tiers when:
- 10,000+ patients (Firebase: $25/mo)
- 100+ emails/day (SendGrid: $20/mo)
- Need SMS notifications (Twilio: $10/mo)
- Want custom domain ($10/year)

---

## 🎯 **SUCCESS METRICS**

**Month 1 Goals:**
- 100+ patients registered
- 500+ appointments booked
- 200+ prescriptions generated
- 95%+ uptime
- <2s page load time

**Month 3 Goals:**
- 500+ patients
- 2,000+ appointments
- 1,000+ prescriptions
- $1,000+ revenue (if monetized)

---

## 🐛 **TROUBLESHOOTING**

### **Firebase not connecting?**
- Check firebase-config.js has correct credentials
- Verify Firebase project is active
- Check browser console for errors

### **AI not generating prescriptions?**
- Verify Groq API key in config.js
- Check internet connection
- See browser console for API errors

### **Email not sending?**
- Verify SendGrid API key
- Check email quota (100/day free)
- Verify sender email is verified in SendGrid

---

## 📚 **DOCUMENTATION**

- [Setup Guide](SETUP.md) - Detailed setup instructions
- [API Documentation](#) - Coming soon
- [User Manual](#) - Coming soon
- [Video Tutorials](#) - Coming soon

---

## 🤝 **CONTRIBUTING**

This is an open-source project. Contributions welcome!

---

## 📄 **LICENSE**

MIT License - Free to use and modify

---

## 👨‍💻 **DEVELOPER**

Built by Kumar Vaibhav  
Email: vaibhav.iimcal@gmail.com

---

## 🎉 **WHAT'S NEXT?**

### **Phase 3 (Future Enhancements):**
- Telemedicine (video consultations)
- Patient portal (patient login)
- Mobile app (iOS/Android)
- Lab test integration
- Inventory management
- Multi-clinic support
- Advanced AI features
- Insurance integration

---

**⭐ Star this repo if you find it useful!**

**🚀 Ready to revolutionize healthcare with AI!**
