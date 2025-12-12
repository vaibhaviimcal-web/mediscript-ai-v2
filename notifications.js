// Notifications Module
// Email notifications using SendGrid API (100 emails/day FREE)

const SENDGRID_API_KEY = 'YOUR_SENDGRID_API_KEY'; // Get from sendgrid.com
const SENDGRID_API_URL = 'https://api.sendgrid.com/v3/mail/send';
const FROM_EMAIL = CONFIG.CLINIC_INFO.email;

// Send email via SendGrid
async function sendEmail(to, subject, htmlContent) {
  try {
    const response = await fetch(SENDGRID_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + SENDGRID_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: to }],
          subject: subject
        }],
        from: { email: FROM_EMAIL, name: CONFIG.CLINIC_INFO.name },
        content: [{
          type: 'text/html',
          value: htmlContent
        }]
      })
    });

    if (response.ok) {
      console.log('✅ Email sent to ' + to);
      return { success: true };
    } else {
      throw new Error('SendGrid API error: ' + response.status);
    }
  } catch (error) {
    console.error('Send email error:', error);
    return { success: false, error: error.message };
  }
}

// Send appointment reminder
async function sendAppointmentReminder(appointment, patient) {
  const subject = 'Appointment Reminder - ' + CONFIG.CLINIC_INFO.name;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Appointment Reminder</h2>
      <p>Dear ${patient.name},</p>
      <p>This is a reminder for your upcoming appointment:</p>
      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Date:</strong> ${appointment.date}</p>
        <p><strong>Time:</strong> ${appointment.time}</p>
        <p><strong>Token Number:</strong> #${appointment.token}</p>
        <p><strong>Reason:</strong> ${appointment.reason}</p>
      </div>
      <p>Please arrive 10 minutes before your scheduled time.</p>
      <p>Best regards,<br>${CONFIG.CLINIC_INFO.doctor}<br>${CONFIG.CLINIC_INFO.name}</p>
    </div>
  `;

  return await sendEmail(patient.email, subject, html);
}

// Send prescription via email
async function sendPrescriptionEmail(prescription, patient) {
  const subject = 'Your Prescription - ' + CONFIG.CLINIC_INFO.name;
  
  let medicinesHTML = '';
  prescription.medicines.forEach((med, i) => {
    medicinesHTML += `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 10px;">${i + 1}</td>
        <td style="padding: 10px;">${med.medicine}</td>
        <td style="padding: 10px;">${med.dosage}</td>
        <td style="padding: 10px;">${med.frequency}</td>
        <td style="padding: 10px;">${med.duration}</td>
      </tr>
    `;
  });

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Your Prescription</h2>
      <p>Dear ${patient.name},</p>
      <p><strong>Diagnosis:</strong> ${prescription.diagnosis}</p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background: #f3f4f6;">
            <th style="padding: 10px; text-align: left;">#</th>
            <th style="padding: 10px; text-align: left;">Medicine</th>
            <th style="padding: 10px; text-align: left;">Dosage</th>
            <th style="padding: 10px; text-align: left;">Frequency</th>
            <th style="padding: 10px; text-align: left;">Duration</th>
          </tr>
        </thead>
        <tbody>
          ${medicinesHTML}
        </tbody>
      </table>
      <p>Please follow the prescription as directed. Contact us if you have any questions.</p>
      <p>Best regards,<br>${CONFIG.CLINIC_INFO.doctor}<br>${CONFIG.CLINIC_INFO.name}</p>
    </div>
  `;

  return await sendEmail(patient.email, subject, html);
}

// Send invoice via email
async function sendInvoiceEmail(invoice, patient) {
  const subject = 'Invoice - ' + invoice.invoiceNumber;
  
  let itemsHTML = '';
  invoice.items.forEach(item => {
    itemsHTML += `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 10px;">${item.description}</td>
        <td style="padding: 10px; text-align: right;">₹${item.amount.toFixed(2)}</td>
      </tr>
    `;
  });

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Invoice</h2>
      <p>Dear ${patient.name},</p>
      <p><strong>Invoice Number:</strong> ${invoice.invoiceNumber}</p>
      <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background: #f3f4f6;">
            <th style="padding: 10px; text-align: left;">Description</th>
            <th style="padding: 10px; text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHTML}
          <tr>
            <td style="padding: 10px; text-align: right;"><strong>Subtotal:</strong></td>
            <td style="padding: 10px; text-align: right;">₹${invoice.subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; text-align: right;"><strong>GST (18%):</strong></td>
            <td style="padding: 10px; text-align: right;">₹${invoice.gst.toFixed(2)}</td>
          </tr>
          <tr style="background: #f3f4f6;">
            <td style="padding: 10px; text-align: right;"><strong>Total:</strong></td>
            <td style="padding: 10px; text-align: right;"><strong>₹${invoice.total.toFixed(2)}</strong></td>
          </tr>
        </tbody>
      </table>
      <p>Thank you for your visit!</p>
      <p>Best regards,<br>${CONFIG.CLINIC_INFO.name}</p>
    </div>
  `;

  return await sendEmail(patient.email, subject, html);
}

// Schedule appointment reminder (1 day before)
async function scheduleAppointmentReminder(appointmentId) {
  try {
    const appointmentDoc = await db.collection('appointments').doc(appointmentId).get();
    if (!appointmentDoc.exists) return { success: false, error: 'Appointment not found' };

    const appointment = appointmentDoc.data();
    const patient = await db.collection('patients').doc(appointment.patientId).get();
    
    if (!patient.exists || !patient.data().email) {
      return { success: false, error: 'Patient email not found' };
    }

    // In production, use Cloud Functions to schedule this
    // For now, send immediately if appointment is tomorrow
    const appointmentDate = new Date(appointment.date);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (appointmentDate.toDateString() === tomorrow.toDateString()) {
      return await sendAppointmentReminder(appointment, patient.data());
    }

    return { success: true, message: 'Reminder scheduled' };
  } catch (error) {
    console.error('Schedule reminder error:', error);
    return { success: false, error: error.message };
  }
}
