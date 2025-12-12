// Utility Functions
// Helper functions for validation, formatting, and common operations

// Validate email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Validate phone number (Indian format)
function validatePhone(phone) {
  const re = /^[+]?[0-9]{10,13}$/;
  return re.test(phone.replace(/\s/g, ''));
}

// Format date
function formatDate(date) {
  if (!date) return '';
  if (date.toDate) date = date.toDate(); // Firestore timestamp
  return new Date(date).toLocaleDateString('en-IN');
}

// Format time
function formatTime(time) {
  if (!time) return '';
  return time;
}

// Format currency
function formatCurrency(amount) {
  return '₹' + parseFloat(amount).toFixed(2);
}

// Sanitize input
function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/<script[^>]*>.*?<\/script>/gi, '');
}

// Generate patient ID
function generatePatientId(count) {
  return 'P' + String(count + 1).padStart(4, '0');
}

// Calculate age from date of birth
function calculateAge(dob) {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

// Debounce function for search
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Format file size
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Get time ago
function getTimeAgo(date) {
  if (!date) return '';
  if (date.toDate) date = date.toDate(); // Firestore timestamp
  
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';
  
  return Math.floor(seconds) + ' seconds ago';
}

// Validate required fields
function validateRequired(fields) {
  for (const [key, value] of Object.entries(fields)) {
    if (!value || value.toString().trim() === '') {
      return { valid: false, field: key, message: key + ' is required' };
    }
  }
  return { valid: true };
}

// Deep clone object
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Generate random ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Check if date is today
function isToday(date) {
  const today = new Date();
  const checkDate = new Date(date);
  return checkDate.toDateString() === today.toDateString();
}

// Check if date is in future
function isFutureDate(date) {
  return new Date(date) > new Date();
}

// Get current date in YYYY-MM-DD format
function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

// Get current time in HH:MM format
function getCurrentTime() {
  const now = new Date();
  return String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
}
