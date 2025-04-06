
import { Category } from '@/types';

export const categoriesData: Category[] = [
  {
    id: "digestive",
    name: "Digestive Health",
    description: "Plants that aid digestion, relieve indigestion, and treat digestive disorders.",
    plantIds: ["mint", "turmeric"]
  },
  {
    id: "respiratory",
    name: "Respiratory Support",
    description: "Plants that benefit the respiratory system, treat coughs, colds, and asthma.",
    plantIds: ["mint", "tulsi"]
  },
  {
    id: "adaptogenic",
    name: "Adaptogens",
    description: "Plants that help the body adapt to stress and promote overall balance.",
    plantIds: ["ashwagandha", "tulsi"]
  },
  {
    id: "antimicrobial",
    name: "Antimicrobial Plants",
    description: "Plants with properties that combat bacterial, viral, and fungal infections.",
    plantIds: ["neem", "tulsi"]
  },
  {
    id: "skin-care",
    name: "Skin Care",
    description: "Plants beneficial for skin health, treating various skin conditions and promoting healing.",
    plantIds: ["neem", "turmeric"]
  },
  {
    id: "anti-inflammatory",
    name: "Anti-inflammatory",
    description: "Plants that reduce inflammation and associated pain.",
    plantIds: ["turmeric", "tulsi"]
  },
  {
    id: "aromatic",
    name: "Aromatic Herbs",
    description: "Plants with strong, pleasant aromas that have therapeutic benefits.",
    plantIds: ["mint", "tulsi"]
  },
  {
    id: "nervine",
    name: "Nervine Herbs",
    description: "Plants that support and nourish the nervous system.",
    plantIds: ["ashwagandha"]
  },
  {
    id: "rejuvenative",
    name: "Rejuvenative Plants",
    description: "Plants that promote longevity and overall vitality.",
    plantIds: ["ashwagandha"]
  }
];

export function getCategoryById(id: string): Category | undefined {
  return categoriesData.find(category => category.id === id);
}

export function getAllCategoryNames(): string[] {
  return categoriesData.map(category => category.name);
}
