// Billing Module
// Invoice generation, GST calculation, payment tracking

const GST_RATE = 0.18; // 18% GST

// Calculate GST
function calculateGST(amount) {
  const gst = amount * GST_RATE;
  const total = amount + gst;
  
  return {
    subtotal: parseFloat(amount.toFixed(2)),
    gst: parseFloat(gst.toFixed(2)),
    total: parseFloat(total.toFixed(2))
  };
}

// Generate invoice number
function generateInvoiceNumber() {
  const date = new Date();
  const year = date.getFullYear().toString().substr(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return 'INV-' + year + month + '-' + random;
}

// Create invoice
async function generateInvoice(patientId, items, paymentMethod = 'Cash') {
  try {
    const patient = await db.collection('patients').doc(patientId).get();
    if (!patient.exists) {
      throw new Error('Patient not found');
    }

    const patientData = patient.data();
    
    // Calculate totals
    let subtotal = 0;
    items.forEach(item => {
      subtotal += item.amount;
    });

    const billing = calculateGST(subtotal);
    
    const invoiceData = {
      invoiceNumber: generateInvoiceNumber(),
      patientId: patientId,
      patientName: patientData.name,
      items: items,
      subtotal: billing.subtotal,
      gst: billing.gst,
      total: billing.total,
      paid: 0,
      balance: billing.total,
      status: 'Pending',
      paymentMethod: paymentMethod,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    const result = await createInvoice(invoiceData);
    
    if (result.success) {
      return { success: true, invoice: { id: result.id, ...invoiceData } };
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Generate invoice error:', error);
    return { success: false, error: error.message };
  }
}

// Record payment
async function recordPayment(invoiceId, amount, paymentMethod = 'Cash') {
  try {
    const invoiceDoc = await db.collection('invoices').doc(invoiceId).get();
    if (!invoiceDoc.exists) {
      throw new Error('Invoice not found');
    }

    const invoice = invoiceDoc.data();
    const newPaid = invoice.paid + amount;
    const newBalance = invoice.total - newPaid;
    const newStatus = newBalance <= 0 ? 'Paid' : newBalance < invoice.total ? 'Partial' : 'Pending';

    await db.collection('invoices').doc(invoiceId).update({
      paid: newPaid,
      balance: newBalance,
      status: newStatus,
      lastPaymentDate: firebase.firestore.FieldValue.serverTimestamp(),
      lastPaymentMethod: paymentMethod
    });

    // Record payment transaction
    await db.collection('payments').add({
      invoiceId: invoiceId,
      amount: amount,
      paymentMethod: paymentMethod,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    return { success: true, newBalance: newBalance, status: newStatus };
  } catch (error) {
    console.error('Record payment error:', error);
    return { success: false, error: error.message };
  }
}

// Generate invoice PDF
function generateInvoicePDF(invoice, patient) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Header
  doc.setFontSize(24);
  doc.setTextColor(20, 120, 240);
  doc.text('INVOICE', 105, 20, { align: 'center' });

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(CONFIG.CLINIC_INFO.name, 105, 28, { align: 'center' });
  doc.text(CONFIG.CLINIC_INFO.address + ' | ' + CONFIG.CLINIC_INFO.phone, 105, 34, { align: 'center' });

  doc.setDrawColor(200);
  doc.line(20, 40, 190, 40);

  // Invoice details
  doc.setFontSize(11);
  doc.setTextColor(0);
  doc.text('Invoice No: ' + invoice.invoiceNumber, 20, 50);
  doc.text('Date: ' + new Date().toLocaleDateString('en-IN'), 20, 57);
  
  doc.text('Patient: ' + patient.name, 20, 67);
  doc.text('Patient ID: ' + patient.patientId, 20, 74);
  doc.text('Phone: ' + patient.phone, 20, 81);

  doc.setDrawColor(200);
  doc.line(20, 87, 190, 87);

  // Items table
  doc.setFontSize(10);
  doc.setFillColor(240, 240, 240);
  doc.rect(20, 92, 170, 8, 'F');
  doc.text('Description', 25, 97);
  doc.text('Amount', 160, 97);

  let y = 105;
  invoice.items.forEach(item => {
    doc.text(item.description, 25, y);
    doc.text('₹' + item.amount.toFixed(2), 160, y);
    y += 7;
  });

  doc.setDrawColor(200);
  doc.line(20, y, 190, y);
  y += 7;

  // Totals
  doc.text('Subtotal:', 130, y);
  doc.text('₹' + invoice.subtotal.toFixed(2), 160, y);
  y += 7;

  doc.text('GST (18%):', 130, y);
  doc.text('₹' + invoice.gst.toFixed(2), 160, y);
  y += 7;

  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Total:', 130, y);
  doc.text('₹' + invoice.total.toFixed(2), 160, y);

  // Footer
  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(100);
  doc.text('Thank you for your visit!', 105, 280, { align: 'center' });

  doc.save('Invoice_' + invoice.invoiceNumber + '.pdf');
}

// Get revenue statistics
async function getRevenueStats(startDate = null, endDate = null) {
  try {
    let query = db.collection('invoices').where('active', '==', true);

    if (startDate) {
      query = query.where('createdAt', '>=', startDate);
    }

    if (endDate) {
      query = query.where('createdAt', '<=', endDate);
    }

    const snapshot = await query.get();
    
    let totalRevenue = 0;
    let totalPaid = 0;
    let totalPending = 0;
    let invoiceCount = 0;

    snapshot.forEach(doc => {
      const invoice = doc.data();
      totalRevenue += invoice.total || 0;
      totalPaid += invoice.paid || 0;
      totalPending += invoice.balance || 0;
      invoiceCount++;
    });

    return {
      success: true,
      stats: {
        totalRevenue: totalRevenue,
        totalPaid: totalPaid,
        totalPending: totalPending,
        invoiceCount: invoiceCount,
        averageInvoice: invoiceCount > 0 ? totalRevenue / invoiceCount : 0
      }
    };
  } catch (error) {
    console.error('Get revenue stats error:', error);
    return { success: false, error: error.message };
  }
}
