// Reports & Analytics Module
// Generate business insights and analytics

// Get patient demographics
async function getPatientDemographics() {
  try {
    const snapshot = await db.collection('patients').where('active', '==', true).get();
    
    let totalPatients = 0;
    let maleCount = 0;
    let femaleCount = 0;
    let ageGroups = { '0-18': 0, '19-35': 0, '36-50': 0, '51-65': 0, '65+': 0 };

    snapshot.forEach(doc => {
      const patient = doc.data();
      totalPatients++;

      if (patient.gender === 'Male') maleCount++;
      if (patient.gender === 'Female') femaleCount++;

      const age = patient.age;
      if (age <= 18) ageGroups['0-18']++;
      else if (age <= 35) ageGroups['19-35']++;
      else if (age <= 50) ageGroups['36-50']++;
      else if (age <= 65) ageGroups['51-65']++;
      else ageGroups['65+']++;
    });

    return {
      success: true,
      demographics: {
        total: totalPatients,
        male: maleCount,
        female: femaleCount,
        malePercentage: totalPatients > 0 ? ((maleCount / totalPatients) * 100).toFixed(1) : 0,
        femalePercentage: totalPatients > 0 ? ((femaleCount / totalPatients) * 100).toFixed(1) : 0,
        ageGroups: ageGroups
      }
    };
  } catch (error) {
    console.error('Get demographics error:', error);
    return { success: false, error: error.message };
  }
}

// Get prescription patterns
async function getPrescriptionPatterns(limit = 10) {
  try {
    const snapshot = await db.collection('prescriptions').where('active', '==', true).get();
    
    const medicineCount = {};
    let totalPrescriptions = 0;

    snapshot.forEach(doc => {
      const prescription = doc.data();
      totalPrescriptions++;

      prescription.medicines.forEach(med => {
        const medicineName = med.medicine;
        medicineCount[medicineName] = (medicineCount[medicineName] || 0) + 1;
      });
    });

    // Sort by frequency
    const sortedMedicines = Object.entries(medicineCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([medicine, count]) => ({
        medicine: medicine,
        count: count,
        percentage: ((count / totalPrescriptions) * 100).toFixed(1)
      }));

    return {
      success: true,
      patterns: {
        totalPrescriptions: totalPrescriptions,
        topMedicines: sortedMedicines
      }
    };
  } catch (error) {
    console.error('Get prescription patterns error:', error);
    return { success: false, error: error.message };
  }
}

// Get appointment trends
async function getAppointmentTrends(days = 30) {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const snapshot = await db.collection('appointments')
      .where('active', '==', true)
      .where('createdAt', '>=', startDate)
      .get();

    const dailyCount = {};
    let totalAppointments = 0;

    snapshot.forEach(doc => {
      const appointment = doc.data();
      const date = appointment.date;
      dailyCount[date] = (dailyCount[date] || 0) + 1;
      totalAppointments++;
    });

    const trend = Object.entries(dailyCount)
      .sort((a, b) => new Date(a[0]) - new Date(b[0]))
      .map(([date, count]) => ({ date, count }));

    return {
      success: true,
      trends: {
        totalAppointments: totalAppointments,
        averagePerDay: (totalAppointments / days).toFixed(1),
        dailyTrend: trend
      }
    };
  } catch (error) {
    console.error('Get appointment trends error:', error);
    return { success: false, error: error.message };
  }
}

// Export data to CSV
function exportToCSV(data, filename) {
  if (!data || data.length === 0) {
    showToast('No data to export', 'error');
    return;
  }

  const headers = Object.keys(data[0]);
  let csv = headers.join(',') + '\n';

  data.forEach(row => {
    const values = headers.map(header => {
      const value = row[header];
      return typeof value === 'string' && value.includes(',') ? '"' + value + '"' : value;
    });
    csv += values.join(',') + '\n';
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename + '_' + new Date().toISOString().split('T')[0] + '.csv';
  a.click();
  window.URL.revokeObjectURL(url);

  showToast('Data exported successfully!', 'success');
}

// Generate monthly report
async function generateMonthlyReport(month, year) {
  try {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    // Get revenue stats
    const revenueStats = await getRevenueStats(startDate, endDate);
    
    // Get patient count
    const patientSnapshot = await db.collection('patients')
      .where('active', '==', true)
      .where('createdAt', '>=', startDate)
      .where('createdAt', '<=', endDate)
      .get();

    // Get appointment count
    const appointmentSnapshot = await db.collection('appointments')
      .where('active', '==', true)
      .where('createdAt', '>=', startDate)
      .where('createdAt', '<=', endDate)
      .get();

    // Get prescription count
    const prescriptionSnapshot = await db.collection('prescriptions')
      .where('active', '==', true)
      .where('createdAt', '>=', startDate)
      .where('createdAt', '<=', endDate)
      .get();

    return {
      success: true,
      report: {
        month: month,
        year: year,
        newPatients: patientSnapshot.size,
        totalAppointments: appointmentSnapshot.size,
        totalPrescriptions: prescriptionSnapshot.size,
        revenue: revenueStats.stats
      }
    };
  } catch (error) {
    console.error('Generate monthly report error:', error);
    return { success: false, error: error.message };
  }
}
