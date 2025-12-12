// Database Module
// Firestore CRUD operations for all entities

// PATIENTS
async function createPatient(patientData) {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const docRef = await db.collection('patients').add({
      ...patientData,
      createdBy: user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      active: true
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Create patient error:', error);
    return { success: false, error: error.message };
  }
}

async function getPatients(limit = 20, lastDoc = null, searchQuery = null) {
  try {
    let query = db.collection('patients').where('active', '==', true).orderBy('createdAt', 'desc');

    if (searchQuery) {
      query = query.where('name', '>=', searchQuery).where('name', '<=', searchQuery + '\uf8ff');
    }

    if (lastDoc) {
      query = query.startAfter(lastDoc);
    }

    query = query.limit(limit);

    const snapshot = await query.get();
    const patients = [];
    snapshot.forEach(doc => {
      patients.push({ id: doc.id, ...doc.data() });
    });

    return { success: true, patients: patients, lastDoc: snapshot.docs[snapshot.docs.length - 1] };
  } catch (error) {
    console.error('Get patients error:', error);
    return { success: false, error: error.message };
  }
}

async function updatePatient(patientId, patientData) {
  try {
    await db.collection('patients').doc(patientId).update({
      ...patientData,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    return { success: true };
  } catch (error) {
    console.error('Update patient error:', error);
    return { success: false, error: error.message };
  }
}

async function deletePatient(patientId) {
  try {
    await db.collection('patients').doc(patientId).update({
      active: false,
      deletedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    return { success: true };
  } catch (error) {
    console.error('Delete patient error:', error);
    return { success: false, error: error.message };
  }
}

// APPOINTMENTS
async function createAppointment(appointmentData) {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const docRef = await db.collection('appointments').add({
      ...appointmentData,
      createdBy: user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      active: true
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Create appointment error:', error);
    return { success: false, error: error.message };
  }
}

async function getAppointments(date = null, limit = 20) {
  try {
    let query = db.collection('appointments').where('active', '==', true);

    if (date) {
      query = query.where('date', '==', date);
    }

    query = query.orderBy('date', 'desc').orderBy('time', 'desc').limit(limit);

    const snapshot = await query.get();
    const appointments = [];
    snapshot.forEach(doc => {
      appointments.push({ id: doc.id, ...doc.data() });
    });

    return { success: true, appointments: appointments };
  } catch (error) {
    console.error('Get appointments error:', error);
    return { success: false, error: error.message };
  }
}

async function updateAppointment(appointmentId, appointmentData) {
  try {
    await db.collection('appointments').doc(appointmentId).update({
      ...appointmentData,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    return { success: true };
  } catch (error) {
    console.error('Update appointment error:', error);
    return { success: false, error: error.message };
  }
}

async function deleteAppointment(appointmentId) {
  try {
    await db.collection('appointments').doc(appointmentId).update({
      active: false,
      deletedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    return { success: true };
  } catch (error) {
    console.error('Delete appointment error:', error);
    return { success: false, error: error.message };
  }
}

// PRESCRIPTIONS
async function createPrescription(prescriptionData) {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const docRef = await db.collection('prescriptions').add({
      ...prescriptionData,
      createdBy: user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      active: true
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Create prescription error:', error);
    return { success: false, error: error.message };
  }
}

async function getPrescriptions(patientId = null, limit = 20) {
  try {
    let query = db.collection('prescriptions').where('active', '==', true);

    if (patientId) {
      query = query.where('patientId', '==', patientId);
    }

    query = query.orderBy('createdAt', 'desc').limit(limit);

    const snapshot = await query.get();
    const prescriptions = [];
    snapshot.forEach(doc => {
      prescriptions.push({ id: doc.id, ...doc.data() });
    });

    return { success: true, prescriptions: prescriptions };
  } catch (error) {
    console.error('Get prescriptions error:', error);
    return { success: false, error: error.message };
  }
}

// INVOICES
async function createInvoice(invoiceData) {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const docRef = await db.collection('invoices').add({
      ...invoiceData,
      createdBy: user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      active: true
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Create invoice error:', error);
    return { success: false, error: error.message };
  }
}

async function getInvoices(patientId = null, status = null, limit = 20) {
  try {
    let query = db.collection('invoices').where('active', '==', true);

    if (patientId) {
      query = query.where('patientId', '==', patientId);
    }

    if (status) {
      query = query.where('status', '==', status);
    }

    query = query.orderBy('createdAt', 'desc').limit(limit);

    const snapshot = await query.get();
    const invoices = [];
    snapshot.forEach(doc => {
      invoices.push({ id: doc.id, ...doc.data() });
    });

    return { success: true, invoices: invoices };
  } catch (error) {
    console.error('Get invoices error:', error);
    return { success: false, error: error.message };
  }
}

async function updateInvoice(invoiceId, invoiceData) {
  try {
    await db.collection('invoices').doc(invoiceId).update({
      ...invoiceData,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    return { success: true };
  } catch (error) {
    console.error('Update invoice error:', error);
    return { success: false, error: error.message };
  }
}
