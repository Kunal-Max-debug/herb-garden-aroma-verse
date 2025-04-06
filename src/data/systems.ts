
export const ayushSystems = [
  {
    id: "ayurveda",
    name: "Ayurveda",
    description: "One of the world's oldest holistic healing systems, developed in India more than 3,000 years ago. It emphasizes balance between body, mind, and spirit to promote health.",
    principles: [
      "Based on the theory of three doshas (Vata, Pitta, Kapha)",
      "Focuses on prevention and holistic treatment",
      "Uses diet, herbs, lifestyle modifications, and detoxification"
    ]
  },
  {
    id: "yoga",
    name: "Yoga & Naturopathy",
    description: "Yoga combines physical postures, breathing exercises, meditation, and a distinct philosophy. Naturopathy emphasizes the body's inherent self-healing abilities.",
    principles: [
      "Mind-body integration through asanas (postures) and pranayama (breathing)",
      "Natural healing without conventional medication",
      "Focus on diet, hydration, sunlight, and natural elements"
    ]
  },
  {
    id: "unani",
    name: "Unani",
    description: "A system of alternative medicine that originated in ancient Greece but was developed and refined in the Islamic world. It is based on the teachings of Hippocrates and Galen.",
    principles: [
      "Theory of the four humors: blood, phlegm, yellow bile, and black bile",
      "Emphasis on six essential factors for health maintenance",
      "Treatment through dietary adjustments and natural remedies"
    ]
  },
  {
    id: "siddha",
    name: "Siddha",
    description: "One of the oldest systems of medicine in India, originating in Tamil Nadu. It shares concepts with Ayurveda but has distinct methods and preparations.",
    principles: [
      "Based on balance of three elements: Vatham (air), Pitham (fire), and Kapham (earth and water)",
      "Strong emphasis on mineral-based preparations along with herbs",
      "Focus on rejuvenation and longevity"
    ]
  },
  {
    id: "homeopathy",
    name: "Homeopathy",
    description: "A medical system based on the principle that 'like cures like,' where a substance that causes symptoms in a healthy person can treat those symptoms in a sick person.",
    principles: [
      "Law of similars (like cures like)",
      "Principle of minimum dose and dilution increases potency",
      "Individualized treatment based on the totality of symptoms"
    ]
  }
];

export function getSystemById(id: string) {
  return ayushSystems.find(system => system.id === id);
}
