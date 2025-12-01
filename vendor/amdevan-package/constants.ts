import { HealthPackage } from './types';

export const HEALTH_PACKAGES: HealthPackage[] = [
  {
    id: 1,
    title: "Basic Health Check-Up",
    target: "General population / first-time visitors",
    purpose: "Early detection of common health issues",
    includes: [
      "Doctor consultation (in-person or telemedicine)",
      "Blood pressure and vitals assessment",
      "BMI check",
      "Complete Blood Count (CBC)",
      "Blood sugar and lipid profile",
      "Urine routine test",
      "Lifestyle counseling"
    ],
    optional: ["ECG", "Thyroid test"],
    iconName: 'activity',
    priceEstimate: "$99"
  },
  {
    id: 2,
    title: "Executive / Corporate Health",
    target: "Working professionals and corporate teams",
    purpose: "Screening for stress-related, metabolic, and cardiac risks",
    includes: [
      "Comprehensive physical exam",
      "CBC, LFT, RFT, lipid profile, thyroid panel",
      "ECG & Chest X-ray",
      "Eye and dental screening",
      "Physician follow-up via teleconsultation",
      "Mental wellness screening"
    ],
    addOn: "Corporate partnership model for annual employee check-ups",
    iconName: 'briefcase',
    priceEstimate: "$249"
  },
  {
    id: 3,
    title: "Women’s Health & Wellness",
    target: "Women aged 18–60",
    purpose: "Reproductive, hormonal, and general wellness",
    includes: [
      "Gynecological consultation",
      "CBC, thyroid function test, blood sugar test",
      "Breast examination and counseling",
      "Iron, vitamin D, and calcium level tests",
      "Tele-follow-up for reports"
    ],
    optional: ["Pap smear", "Pelvic ultrasound"],
    addOn: "Prenatal & postnatal care package",
    iconName: 'heart',
    priceEstimate: "$189"
  },
  {
    id: 4,
    title: "Senior Citizen Health",
    target: "Adults aged 60+",
    purpose: "Chronic disease prevention and geriatric care",
    includes: [
      "Comprehensive physical exam",
      "Sugar, lipid, renal, liver, and thyroid profile",
      "ECG and blood pressure monitoring",
      "Arthritis and bone density screening",
      "Pharmacist medication review",
      "Home sample collection",
      "Teleconsultation follow-up"
    ],
    addOn: "Home health visit by nurse or physiotherapist",
    iconName: 'user',
    priceEstimate: "$199"
  },
  {
    id: 5,
    title: "Chronic Disease Management",
    target: "Patients with diabetes, hypertension, asthma, etc.",
    purpose: "Ongoing disease monitoring and medication adherence",
    includes: [
      "Specialist consultation (monthly or quarterly)",
      "HbA1c and routine lab monitoring",
      "Blood pressure tracking",
      "Digital health monitoring through the app",
      "Home-delivery of medicines",
      "Teleconsultation reminders",
      "Emergency guidance line"
    ],
    addOn: "Family membership plan for multi-patient support",
    iconName: 'clock',
    priceEstimate: "$49/mo"
  },
  {
    id: 6,
    title: "Family Health Protection",
    target: "Families of 3–6 members",
    purpose: "Annual preventive care for households",
    includes: [
      "Annual health check-ups for all members",
      "Pediatric, maternal, and geriatric consultations",
      "Vaccination records and reminders",
      "Telemedicine support for minor illnesses",
      "Discounts on diagnostic tests and pharmacy purchases"
    ],
    iconName: 'users',
    priceEstimate: "$399/yr"
  },
  {
    id: 7,
    title: "Maternal & Child Health",
    target: "Expecting mothers and infants",
    purpose: "Safe pregnancy and healthy early childhood development",
    includes: [
      "Regular antenatal visits",
      "Ultrasound and lab screenings",
      "Lactation and nutrition counseling",
      "Immunization scheduling",
      "Postnatal teleconsultation",
      "Pediatric growth monitoring"
    ],
    iconName: 'baby',
    priceEstimate: "$299"
  },
  {
    id: 8,
    title: "Preventive Cancer Screening",
    target: "Adults aged 35+",
    purpose: "Early detection of common cancers",
    includes: [
      "Physical examination",
      "Pap smear (women) or PSA test (men)",
      "Chest X-ray",
      "Abdominal ultrasound",
      "CBC, liver function test",
      "Optional cancer marker screening",
      "Teleconsultation for report explanation"
    ],
    iconName: 'shield',
    priceEstimate: "$349"
  },
  {
    id: 9,
    title: "Mental Health & Wellness",
    target: "Students, professionals, and elderly",
    purpose: "Emotional well-being and early psychological support",
    includes: [
      "Online counseling sessions",
      "Psychiatric screening",
      "Stress–anxiety–sleep assessments",
      "Lifestyle and nutrition counseling",
      "Access to guided mindfulness and therapy programs"
    ],
    iconName: 'smile',
    priceEstimate: "$79/session"
  },
  {
    id: 10,
    title: "Telehealth Membership",
    target: "Frequent telemedicine users and rural patients",
    purpose: "Affordable, continuous digital care",
    includes: [
      "Unlimited GP or specialist teleconsultations",
      "E-prescriptions with pharmacy delivery",
      "Discounted diagnostics and clinic visits",
      "Priority scheduling for in-person care",
      "Access to digital health records"
    ],
    iconName: 'smartphone',
    priceEstimate: "$19/mo"
  }
];

export const ADDITIONAL_SERVICES = [
  "Home sample collection",
  "Home healthcare (nursing or physiotherapy)",
  "Ambulance and NEMT support",
  "Corporate and municipal healthcare partnerships"
];