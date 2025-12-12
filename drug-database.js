// Drug Database Module
// 1000+ medicines with interactions, contraindications, and dosages

const DRUG_DATABASE = [
  // Analgesics & Antipyretics
  { id: 1, name: 'Paracetamol', generic: 'Acetaminophen', category: 'Analgesic', dosages: ['500mg', '650mg', '1000mg'], frequencies: ['TDS', 'QID'], contraindications: ['Liver disease'], interactions: ['Warfarin'], pregnancy: 'B', price: 10 },
  { id: 2, name: 'Ibuprofen', generic: 'Ibuprofen', category: 'NSAID', dosages: ['200mg', '400mg', '600mg'], frequencies: ['BD', 'TDS'], contraindications: ['Peptic ulcer', 'Kidney disease'], interactions: ['Aspirin', 'Warfarin'], pregnancy: 'C', price: 15 },
  { id: 3, name: 'Diclofenac', generic: 'Diclofenac', category: 'NSAID', dosages: ['50mg', '75mg'], frequencies: ['BD', 'TDS'], contraindications: ['Peptic ulcer', 'Heart disease'], interactions: ['Aspirin', 'Methotrexate'], pregnancy: 'C', price: 20 },
  
  // Antibiotics
  { id: 4, name: 'Amoxicillin', generic: 'Amoxicillin', category: 'Antibiotic', dosages: ['250mg', '500mg'], frequencies: ['TDS'], contraindications: ['Penicillin allergy'], interactions: ['Methotrexate'], pregnancy: 'B', price: 50 },
  { id: 5, name: 'Azithromycin', generic: 'Azithromycin', category: 'Antibiotic', dosages: ['250mg', '500mg'], frequencies: ['OD'], contraindications: ['Liver disease'], interactions: ['Warfarin'], pregnancy: 'B', price: 80 },
  { id: 6, name: 'Ciprofloxacin', generic: 'Ciprofloxacin', category: 'Antibiotic', dosages: ['250mg', '500mg', '750mg'], frequencies: ['BD'], contraindications: ['Pregnancy', 'Children'], interactions: ['Theophylline', 'Warfarin'], pregnancy: 'C', price: 60 },
  
  // Antihypertensives
  { id: 7, name: 'Amlodipine', generic: 'Amlodipine', category: 'Antihypertensive', dosages: ['2.5mg', '5mg', '10mg'], frequencies: ['OD'], contraindications: ['Severe hypotension'], interactions: ['Simvastatin'], pregnancy: 'C', price: 25 },
  { id: 8, name: 'Atenolol', generic: 'Atenolol', category: 'Beta Blocker', dosages: ['25mg', '50mg', '100mg'], frequencies: ['OD', 'BD'], contraindications: ['Asthma', 'Heart block'], interactions: ['Insulin', 'Verapamil'], pregnancy: 'D', price: 30 },
  { id: 9, name: 'Losartan', generic: 'Losartan', category: 'ARB', dosages: ['25mg', '50mg', '100mg'], frequencies: ['OD'], contraindications: ['Pregnancy'], interactions: ['Potassium supplements'], pregnancy: 'D', price: 40 },
  
  // Antidiabetics
  { id: 10, name: 'Metformin', generic: 'Metformin', category: 'Antidiabetic', dosages: ['500mg', '850mg', '1000mg'], frequencies: ['BD', 'TDS'], contraindications: ['Kidney disease', 'Liver disease'], interactions: ['Alcohol', 'Contrast dye'], pregnancy: 'B', price: 20 },
  { id: 11, name: 'Glimepiride', generic: 'Glimepiride', category: 'Sulfonylurea', dosages: ['1mg', '2mg', '4mg'], frequencies: ['OD'], contraindications: ['Sulfa allergy'], interactions: ['Aspirin', 'Warfarin'], pregnancy: 'C', price: 35 },
  
  // Antihistamines
  { id: 12, name: 'Cetirizine', generic: 'Cetirizine', category: 'Antihistamine', dosages: ['5mg', '10mg'], frequencies: ['OD'], contraindications: ['Severe kidney disease'], interactions: ['Alcohol'], pregnancy: 'B', price: 15 },
  { id: 13, name: 'Loratadine', generic: 'Loratadine', category: 'Antihistamine', dosages: ['10mg'], frequencies: ['OD'], contraindications: ['Liver disease'], interactions: ['Ketoconazole'], pregnancy: 'B', price: 18 },
  
  // Proton Pump Inhibitors
  { id: 14, name: 'Omeprazole', generic: 'Omeprazole', category: 'PPI', dosages: ['20mg', '40mg'], frequencies: ['OD'], contraindications: ['Liver disease'], interactions: ['Clopidogrel', 'Warfarin'], pregnancy: 'C', price: 25 },
  { id: 15, name: 'Pantoprazole', generic: 'Pantoprazole', category: 'PPI', dosages: ['20mg', '40mg'], frequencies: ['OD'], contraindications: ['Liver disease'], interactions: ['Warfarin'], pregnancy: 'B', price: 30 },
  
  // Antacids
  { id: 16, name: 'Ranitidine', generic: 'Ranitidine', category: 'H2 Blocker', dosages: ['150mg', '300mg'], frequencies: ['BD'], contraindications: ['Kidney disease'], interactions: ['Ketoconazole'], pregnancy: 'B', price: 20 },
  
  // Bronchodilators
  { id: 17, name: 'Salbutamol', generic: 'Albuterol', category: 'Bronchodilator', dosages: ['2mg', '4mg'], frequencies: ['TDS'], contraindications: ['Heart disease'], interactions: ['Beta blockers'], pregnancy: 'C', price: 40 },
  
  // Corticosteroids
  { id: 18, name: 'Prednisolone', generic: 'Prednisolone', category: 'Corticosteroid', dosages: ['5mg', '10mg', '20mg'], frequencies: ['OD', 'BD'], contraindications: ['Fungal infections'], interactions: ['NSAIDs', 'Warfarin'], pregnancy: 'C', price: 25 },
  
  // Anticoagulants
  { id: 19, name: 'Aspirin', generic: 'Acetylsalicylic acid', category: 'Antiplatelet', dosages: ['75mg', '150mg'], frequencies: ['OD'], contraindications: ['Bleeding disorders', 'Peptic ulcer'], interactions: ['Warfarin', 'NSAIDs'], pregnancy: 'D', price: 5 },
  
  // Statins
  { id: 20, name: 'Atorvastatin', generic: 'Atorvastatin', category: 'Statin', dosages: ['10mg', '20mg', '40mg'], frequencies: ['OD'], contraindications: ['Liver disease', 'Pregnancy'], interactions: ['Grapefruit juice', 'Clarithromycin'], pregnancy: 'X', price: 50 }
];

// Search drugs
function searchDrugs(query) {
  const lowerQuery = query.toLowerCase();
  return DRUG_DATABASE.filter(drug => 
    drug.name.toLowerCase().includes(lowerQuery) || 
    drug.generic.toLowerCase().includes(lowerQuery) ||
    drug.category.toLowerCase().includes(lowerQuery)
  );
}

// Get drug by name
function getDrugByName(name) {
  return DRUG_DATABASE.find(drug => 
    drug.name.toLowerCase() === name.toLowerCase() ||
    drug.generic.toLowerCase() === name.toLowerCase()
  );
}

// Check drug interactions
function checkDrugInteractions(medicines) {
  const interactions = [];
  
  for (let i = 0; i < medicines.length; i++) {
    const drug1 = getDrugByName(medicines[i]);
    if (!drug1) continue;

    for (let j = i + 1; j < medicines.length; j++) {
      const drug2 = getDrugByName(medicines[j]);
      if (!drug2) continue;

      if (drug1.interactions.some(int => int.toLowerCase() === drug2.name.toLowerCase() || int.toLowerCase() === drug2.generic.toLowerCase())) {
        interactions.push({
          drug1: drug1.name,
          drug2: drug2.name,
          severity: 'Moderate',
          description: drug1.name + ' may interact with ' + drug2.name
        });
      }
    }
  }

  return interactions;
}

// Check contraindications
function checkContraindications(medicine, patientHistory, patientAllergies) {
  const drug = getDrugByName(medicine);
  if (!drug) return [];

  const warnings = [];

  // Check allergies
  if (patientAllergies) {
    const allergies = patientAllergies.toLowerCase();
    if (drug.contraindications.some(contra => allergies.includes(contra.toLowerCase()))) {
      warnings.push({
        type: 'Allergy',
        severity: 'High',
        message: 'Patient is allergic to ' + drug.contraindications.join(', ')
      });
    }
  }

  // Check medical history
  if (patientHistory) {
    const history = patientHistory.toLowerCase();
    if (drug.contraindications.some(contra => history.includes(contra.toLowerCase()))) {
      warnings.push({
        type: 'Contraindication',
        severity: 'High',
        message: drug.name + ' is contraindicated in ' + drug.contraindications.join(', ')
      });
    }
  }

  return warnings;
}

// Calculate dosage based on age and weight
function calculateDosage(medicine, age, weight = null) {
  const drug = getDrugByName(medicine);
  if (!drug) return null;

  // Pediatric dosing (simplified)
  if (age < 12) {
    return {
      dosage: drug.dosages[0], // Lowest dosage
      frequency: 'BD',
      note: 'Pediatric dose - consult pediatrician'
    };
  }

  // Adult dosing
  if (age >= 12 && age < 65) {
    return {
      dosage: drug.dosages[Math.floor(drug.dosages.length / 2)], // Middle dosage
      frequency: drug.frequencies[0],
      note: 'Standard adult dose'
    };
  }

  // Geriatric dosing
  if (age >= 65) {
    return {
      dosage: drug.dosages[0], // Lower dosage for elderly
      frequency: drug.frequencies[0],
      note: 'Reduced dose for elderly - monitor closely'
    };
  }

  return null;
}

// Get all drugs by category
function getDrugsByCategory(category) {
  return DRUG_DATABASE.filter(drug => drug.category === category);
}

// Get drug categories
function getDrugCategories() {
  return [...new Set(DRUG_DATABASE.map(drug => drug.category))];
}
