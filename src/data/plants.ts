
import { Plant } from '@/types';

export const plantsData: Plant[] = [
  {
    id: "mint",
    name: "Mint",
    botanicalName: "Mentha (various species, including Mentha spicata, Mentha piperita)",
    commonNames: ["Mint", "Peppermint", "Spearmint", "Pudina"],
    systems: ["Ayurveda", "Unani"],
    imageUrl: "/lovable-uploads/6a3d6692-3d12-46af-b917-1d84096cf519.png",
    habitat: "Native to Europe and the Middle East, but now cultivated worldwide. Grows well in temperate climates and can be found near water sources in the wild.",
    description: "Mint is an aromatic herb with square stems and serrated leaves. The leaves contain essential oils, particularly menthol, which gives mint its characteristic aroma and flavor. It is a common culinary herb and has numerous medicinal properties.",
    medicinalUses: [
      "Digestive aid: Relieves indigestion, bloating, and gas",
      "Respiratory relief: Helps with congestion and soothes throat irritation",
      "Antimicrobial: Has antibacterial and antifungal properties",
      "Mental clarity: The aroma improves alertness and memory",
      "Pain relief: Used topically for headaches and muscle pain"
    ],
    cultivationMethods: [
      "Prefers partial shade and moist, well-draining soil",
      "Propagates easily through runners, so plant in contained areas",
      "Water regularly but avoid waterlogging",
      "Pinch back tips to encourage bushy growth",
      "Harvest leaves just before flowering for maximum potency"
    ],
    medicinialRecipes: [
      {
        name: "Mint Tea for Digestion",
        ingredients: ["Fresh mint leaves (10-15)", "Water (1 cup)", "Honey (optional)"],
        preparation: "Bring water to a boil. Add fresh mint leaves and steep for 5-7 minutes. Strain and add honey if desired.",
        uses: "Drink after meals to aid digestion and prevent bloating."
      },
      {
        name: "Mint Cooling Compress",
        ingredients: ["Fresh mint leaves (handful)", "Water (2 cups)", "Clean cloth"],
        preparation: "Boil water, add mint leaves, and steep for 10 minutes. Allow to cool. Soak cloth in the liquid and apply to forehead or affected area.",
        uses: "Use for headaches, skin irritation, or to cool the body during fever."
      }
    ],
    categories: ["Digestive", "Respiratory", "Aromatic"]
  },
  {
    id: "tulsi",
    name: "Tulsi",
    botanicalName: "Ocimum sanctum (or Ocimum tenuiflorum)",
    commonNames: ["Holy Basil", "Sacred Basil", "Queen of Herbs"],
    systems: ["Ayurveda", "Yoga"],
    imageUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
    habitat: "Native to the Indian subcontinent, now grown in many tropical parts of the world. Flourishes in tropical and subtropical conditions.",
    description: "Tulsi is a sacred plant in Hinduism and an important herb in Ayurvedic medicine. It has aromatic leaves with a distinctive clove-like scent and taste. The plant can be recognized by its purple-tinged leaves and stems.",
    medicinalUses: [
      "Adaptogen: Helps the body adapt to stress",
      "Immune boosting: Enhances immune system function",
      "Respiratory support: Alleviates coughs, colds, and bronchitis",
      "Anti-inflammatory: Reduces inflammation and associated pain",
      "Cardiovascular health: Supports heart function and circulation"
    ],
    cultivationMethods: [
      "Prefers full sunlight and well-draining soil",
      "Can be grown from seeds or cuttings",
      "Regular watering, but allow soil to dry between waterings",
      "Pinch flowers to encourage leaf growth",
      "Harvest leaves in the morning for maximum essential oil content"
    ],
    medicinialRecipes: [
      {
        name: "Tulsi Tea for Immunity",
        ingredients: ["Fresh tulsi leaves (15-20)", "Water (1 cup)", "Ginger (small piece, optional)", "Honey (optional)"],
        preparation: "Bring water to a boil. Add tulsi leaves and ginger if using. Steep for 5-10 minutes. Strain and add honey if desired.",
        uses: "Drink daily, especially during seasonal changes, to boost immunity."
      },
      {
        name: "Tulsi Respiratory Relief",
        ingredients: ["Dried tulsi leaves (2 tsp)", "Black pepper (pinch)", "Honey (1 tsp)"],
        preparation: "Grind dried tulsi leaves into powder. Mix with a pinch of black pepper and honey to form a paste.",
        uses: "Consume twice daily to alleviate cough and respiratory congestion."
      }
    ],
    categories: ["Respiratory", "Adaptogenic", "Sacred", "Aromatic"]
  },
  {
    id: "ashwagandha",
    name: "Ashwagandha",
    botanicalName: "Withania somnifera",
    commonNames: ["Indian Ginseng", "Winter Cherry", "Poison Gooseberry"],
    systems: ["Ayurveda", "Unani"],
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
    habitat: "Native to dry regions of India, Middle East, and parts of Africa. Thrives in dry, subtropical conditions.",
    description: "Ashwagandha is a small, woody shrub with oval leaves and bell-shaped flowers that yield orange-red berries. The root is the primary part used in herbal medicine, known for its distinct horse-like smell (Ashwagandha means 'smell of horse' in Sanskrit).",
    medicinalUses: [
      "Adaptogen: Helps manage stress and anxiety",
      "Energy enhancement: Combats fatigue and promotes vitality",
      "Brain function: Improves memory and cognitive functions",
      "Anti-inflammatory: Reduces inflammation throughout the body",
      "Immune modulator: Enhances immune system function"
    ],
    cultivationMethods: [
      "Requires well-draining sandy soil",
      "Prefers full sun exposure",
      "Drought-resistant once established",
      "Seeds should be sown directly in soil during spring",
      "Harvest roots after plants are 1-2 years old"
    ],
    medicinialRecipes: [
      {
        name: "Ashwagandha Rejuvenative Tonic",
        ingredients: ["Ashwagandha root powder (1 tsp)", "Warm milk (1 cup)", "Honey (1 tsp)", "Ghee (1/4 tsp)"],
        preparation: "Bring milk to a simmer. Add ashwagandha powder and stir well. Let it simmer for 5 minutes. Remove from heat, add ghee and honey.",
        uses: "Consume before bedtime to promote restful sleep and rejuvenation."
      },
      {
        name: "Ashwagandha Nerve Tonic",
        ingredients: ["Ashwagandha root powder (1/2 tsp)", "Brahmi powder (1/2 tsp)", "Warm water (1 cup)", "Honey (1 tsp)"],
        preparation: "Mix ashwagandha and brahmi powders in warm water. Stir well and add honey.",
        uses: "Take daily to support nervous system health and mental clarity."
      }
    ],
    categories: ["Adaptogenic", "Nervine", "Rejuvenative"]
  },
  {
    id: "turmeric",
    name: "Turmeric",
    botanicalName: "Curcuma longa",
    commonNames: ["Haldi", "Indian Saffron", "Golden Spice"],
    systems: ["Ayurveda", "Unani", "Siddha"],
    imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    habitat: "Native to Southeast Asia, primarily India. Requires a warm, humid climate and considerable rainfall.",
    description: "Turmeric is a perennial herbaceous plant with large, lily-like leaves and vibrant yellow-orange rhizomes (underground stems). The rhizome is the part used as a spice and medicine, containing curcumin, the active compound responsible for its bright color and therapeutic properties.",
    medicinalUses: [
      "Anti-inflammatory: Reduces inflammation and associated pain",
      "Antioxidant: Protects cells from oxidative damage",
      "Digestive aid: Improves digestion and reduces bloating",
      "Liver support: Helps detoxify and protect liver function",
      "Wound healing: Applied topically for skin conditions and wounds"
    ],
    cultivationMethods: [
      "Requires warm temperatures (20-30°C) and high humidity",
      "Plant rhizome pieces with 2-3 buds in well-draining, fertile soil",
      "Needs regular watering but not waterlogging",
      "Harvest when leaves turn yellow and stems dry (8-10 months after planting)",
      "Cure rhizomes by boiling and drying before storing"
    ],
    medicinialRecipes: [
      {
        name: "Golden Milk",
        ingredients: ["Turmeric powder (1 tsp)", "Milk (1 cup)", "Black pepper (pinch)", "Honey (1 tsp)", "Ghee (1/4 tsp)"],
        preparation: "Warm milk on low heat. Add turmeric, black pepper, and ghee. Simmer for 5 minutes. Remove from heat and add honey.",
        uses: "Drink before bedtime to reduce inflammation and promote healing."
      },
      {
        name: "Turmeric Paste for Wounds",
        ingredients: ["Turmeric powder (2 tsp)", "Neem oil (1 tsp)", "Water (as needed)"],
        preparation: "Mix turmeric powder with neem oil. Add enough water to form a thick paste.",
        uses: "Apply to cuts, burns, or skin infections to promote healing and prevent infection."
      }
    ],
    categories: ["Anti-inflammatory", "Culinary", "Skin Care"]
  },
  {
    id: "neem",
    name: "Neem",
    botanicalName: "Azadirachta indica",
    commonNames: ["Indian Lilac", "Margosa Tree", "Nimtree"],
    systems: ["Ayurveda", "Unani", "Siddha"],
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    habitat: "Native to the Indian subcontinent. Thrives in tropical and subtropical regions, highly adaptable to different soil types.",
    description: "Neem is a fast-growing evergreen tree that can reach up to 15-20 meters in height. It has pinnate leaves, fragrant white flowers, and olive-like fruits. All parts of the tree, particularly the leaves, bark, and seeds, are used medicinally for their powerful antimicrobial and medicinal properties.",
    medicinalUses: [
      "Antimicrobial: Effective against bacteria, viruses, and fungi",
      "Blood purifier: Detoxifies the blood and supports liver function",
      "Skin conditions: Treats acne, eczema, psoriasis, and other skin issues",
      "Dental care: Improves oral hygiene and treats gum disease",
      "Insect repellent: Natural protection against various pests"
    ],
    cultivationMethods: [
      "Highly adaptable to various soils, even poor, stony, or sandy soil",
      "Drought-resistant once established",
      "Grow from seeds or seedlings",
      "Prefers full sun exposure",
      "Minimal maintenance required after establishment"
    ],
    medicinialRecipes: [
      {
        name: "Neem Face Wash",
        ingredients: ["Neem leaves (handful)", "Water (2 cups)", "Gram flour (2 tbsp, optional)"],
        preparation: "Boil neem leaves in water for 10-15 minutes. Strain and cool. If using gram flour, mix it with a small amount of the neem water to form a paste.",
        uses: "Use as a face wash for acne and other skin problems."
      },
      {
        name: "Neem Blood Purifier",
        ingredients: ["Dried neem leaves (1 tsp)", "Water (1 cup)"],
        preparation: "Boil water, add dried neem leaves, and steep for 5-10 minutes. Strain before consuming.",
        uses: "Drink once daily, preferably in the morning on an empty stomach, to purify blood and detoxify."
      }
    ],
    categories: ["Antimicrobial", "Skin Care", "Detoxifying"]
  },
  {
    id: "brahmi",
    name: "Brahmi",
    botanicalName: "Bacopa monnieri",
    commonNames: ["Water Hyssop", "Herb of Grace", "Thyme-leaved Gratiola"],
    systems: ["Ayurveda"],
    imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    habitat: "Native to wetlands of India, Australia, Europe, Africa, Asia, and North and South America. Thrives in marshy areas and along stream banks.",
    description: "Brahmi is a small, creeping herb with numerous branches and small, succulent leaves. It's one of the most important herbs in Ayurvedic medicine, especially known for its effects on the brain and nervous system.",
    medicinalUses: [
      "Cognitive enhancement: Improves memory, concentration, and learning ability",
      "Anxiolytic: Reduces anxiety and stress",
      "Adaptogen: Helps the body adapt to stress",
      "Neuroprotective: Protects brain cells from damage",
      "Anti-epileptic: Helps in managing seizures"
    ],
    cultivationMethods: [
      "Grows best in wet, boggy conditions",
      "Can be grown in pots with the bottom immersed in water",
      "Propagates easily through stem cuttings",
      "Prefers full to partial sun",
      "Regular fertilization with organic matter"
    ],
    medicinialRecipes: [
      {
        name: "Brahmi Ghee",
        ingredients: ["Fresh brahmi leaves (2 cups)", "Ghee (1 cup)", "Water (1/2 cup)"],
        preparation: "In a pan, heat ghee. Add brahmi leaves and water. Simmer until water evaporates. Strain and store in a glass container.",
        uses: "Consume 1 teaspoon daily to enhance memory and cognitive function."
      },
      {
        name: "Brahmi Tonic",
        ingredients: ["Brahmi powder (1 tsp)", "Warm milk (1 cup)", "Honey (1 tsp)"],
        preparation: "Mix brahmi powder in warm milk. Add honey and stir well.",
        uses: "Drink daily before bedtime to improve memory and reduce anxiety."
      }
    ],
    categories: ["Cognitive", "Adaptogenic", "Nervine"]
  },
  {
    id: "amla",
    name: "Amla",
    botanicalName: "Phyllanthus emblica",
    commonNames: ["Indian Gooseberry", "Emblic Myrobalan"],
    systems: ["Ayurveda", "Unani", "Siddha"],
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
    habitat: "Native to India, grows in tropical and subtropical regions of Southeast Asia.",
    description: "Amla is a medium-sized deciduous tree with feathery leaves and round, light green fruits. The fruit is highly valued for its exceptionally high vitamin C content and is one of the most important medicinal fruits in Ayurveda.",
    medicinalUses: [
      "Antioxidant: Rich in vitamin C and other antioxidants",
      "Digestive aid: Improves digestion and metabolism",
      "Hair health: Strengthens hair and prevents premature graying",
      "Eye health: Improves eyesight and reduces eye strain",
      "Immune booster: Enhances immunity and protects against illnesses"
    ],
    cultivationMethods: [
      "Grows in various soil types, but prefers well-draining soil",
      "Tolerates drought once established",
      "Propagated through seeds or grafting",
      "Requires full sun exposure",
      "Fruits mature in winter months"
    ],
    medicinialRecipes: [
      {
        name: "Amla Juice",
        ingredients: ["Fresh amla fruits (5-6)", "Water (1 cup)", "Honey (1 tbsp, optional)"],
        preparation: "Deseed amla fruits. Blend with water. Strain and add honey if desired.",
        uses: "Drink daily on an empty stomach to boost immunity and improve digestion."
      },
      {
        name: "Triphala Mixture",
        ingredients: ["Amla powder (1 part)", "Haritaki powder (1 part)", "Bibhitaki powder (1 part)"],
        preparation: "Mix equal parts of all three powders thoroughly. Store in an airtight container.",
        uses: "Take 1 teaspoon with warm water before bedtime for digestive health and detoxification."
      }
    ],
    categories: ["Antioxidant", "Digestive", "Rejuvenative"]
  },
  {
    id: "shatavari",
    name: "Shatavari",
    botanicalName: "Asparagus racemosus",
    commonNames: ["Wild Asparagus", "Indian Asparagus", "Hundred Husbands"],
    systems: ["Ayurveda"],
    imageUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
    habitat: "Native to India, Nepal, Sri Lanka, and the Himalayas. Grows in gravelly, rocky soils at altitudes up to 1500m.",
    description: "Shatavari is a climbing plant with pine needle-like leaves and small white flowers. The name 'Shatavari' means 'she who possesses a hundred husbands,' highlighting its traditional use as a female reproductive tonic.",
    medicinalUses: [
      "Female reproductive health: Supports hormonal balance and fertility",
      "Galactagogue: Enhances lactation in nursing mothers",
      "Adaptogen: Helps manage stress",
      "Digestive tonic: Soothes the digestive tract",
      "Immune support: Enhances immunity"
    ],
    cultivationMethods: [
      "Grows well in well-drained, sandy loam soil",
      "Requires partial shade",
      "Propagated through seeds or root division",
      "Regular watering but avoid waterlogging",
      "Harvest roots when plant is 1-2 years old"
    ],
    medicinialRecipes: [
      {
        name: "Shatavari Milk",
        ingredients: ["Shatavari powder (1 tsp)", "Milk (1 cup)", "Ghee (1/4 tsp)", "Jaggery (1 tsp)"],
        preparation: "Heat milk. Add shatavari powder, ghee, and jaggery. Simmer for 5 minutes. Strain before consuming.",
        uses: "Drink daily to support female reproductive health and vitality."
      },
      {
        name: "Shatavari Ghee",
        ingredients: ["Shatavari powder (1/4 cup)", "Ghee (1 cup)"],
        preparation: "Heat ghee in a pan. Add shatavari powder and stir on low heat for 5-7 minutes. Strain and store in a glass container.",
        uses: "Consume 1 teaspoon daily for hormonal balance and rejuvenation."
      }
    ],
    categories: ["Women's Health", "Adaptogenic", "Rejuvenative"]
  },
  {
    id: "triphala",
    name: "Triphala",
    botanicalName: "Combination of Terminalia chebula, Terminalia bellirica, and Phyllanthus emblica",
    commonNames: ["Three Fruits", "Triphala Churna"],
    systems: ["Ayurveda"],
    imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    habitat: "Components grow in various regions of India and Southeast Asia.",
    description: "Triphala is a traditional Ayurvedic herbal formulation consisting of three fruits: Amalaki (Emblica officinalis), Bibhitaki (Terminalia bellirica), and Haritaki (Terminalia chebula). It is one of the most important and widely used formulations in Ayurvedic medicine.",
    medicinalUses: [
      "Digestive health: Cleanses and tones the digestive tract",
      "Detoxification: Removes accumulated toxins from the body",
      "Gentle laxative: Relieves constipation without causing dependency",
      "Eye health: Improves vision and treats various eye disorders",
      "Immune support: Strengthens immunity due to high vitamin C content"
    ],
    cultivationMethods: [
      "Components grow in different environments, from tropical to subtropical regions",
      "Amalaki prefers well-draining soil, while Haritaki can tolerate rocky terrain",
      "All components propagated through seeds",
      "Full sun exposure preferred for all three plants",
      "Fruits harvested when fully mature"
    ],
    medicinialRecipes: [
      {
        name: "Triphala Tea",
        ingredients: ["Triphala powder (1 tsp)", "Hot water (1 cup)", "Honey (optional)"],
        preparation: "Steep triphala powder in hot water for 10 minutes. Strain and add honey if desired.",
        uses: "Drink before bedtime for gentle detoxification and digestive cleansing."
      },
      {
        name: "Triphala Eye Wash",
        ingredients: ["Triphala powder (1 tsp)", "Water (1 cup)"],
        preparation: "Boil water, add triphala powder, and simmer for 10 minutes. Cool and strain through fine cloth multiple times until clear.",
        uses: "Use as an eye wash for tired, strained eyes (after consulting a healthcare provider)."
      }
    ],
    categories: ["Digestive", "Detoxifying", "Rejuvenative"]
  },
  {
    id: "guduchi",
    name: "Guduchi",
    botanicalName: "Tinospora cordifolia",
    commonNames: ["Heart-leaved Moonseed", "Giloy", "Amrita"],
    systems: ["Ayurveda", "Siddha"],
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    habitat: "Native to tropical regions of India, Myanmar, and Sri Lanka. Grows on large trees or climbs along them.",
    description: "Guduchi is a climbing shrub with heart-shaped leaves and small yellow flowers. The stem, which is bitter in taste, is the most used part in Ayurvedic medicine. The name 'Amrita' means 'nectar of immortality,' reflecting its rejuvenating properties.",
    medicinalUses: [
      "Immunomodulator: Enhances immune system function",
      "Antipyretic: Reduces fever",
      "Anti-inflammatory: Alleviates inflammation and pain",
      "Adaptogen: Helps the body adapt to stress",
      "Liver protector: Supports liver function and aids in detoxification"
    ],
    cultivationMethods: [
      "Can grow in various soil types, but prefers well-draining soil",
      "Propagated through stem cuttings",
      "Requires support for climbing",
      "Moderate watering, avoiding waterlogging",
      "Harvest stems when plant is mature (2-3 years old)"
    ],
    medicinialRecipes: [
      {
        name: "Guduchi Juice",
        ingredients: ["Fresh guduchi stems (2-3 inches)", "Water (1 cup)"],
        preparation: "Crush guduchi stems. Soak in water overnight. In the morning, filter and drink.",
        uses: "Drink daily on an empty stomach to boost immunity and reduce inflammation."
      },
      {
        name: "Guduchi Kwath",
        ingredients: ["Dried guduchi powder (1 tbsp)", "Water (2 cups)"],
        preparation: "Boil water with guduchi powder until it reduces to half. Strain and drink warm.",
        uses: "Take during fever, infections, or when feeling low on energy."
      }
    ],
    categories: ["Immunomodulatory", "Adaptogenic", "Anti-inflammatory"]
  }
];

export function getPlantById(id: string): Plant | undefined {
  return plantsData.find(plant => plant.id === id);
}

export function getPlantsBySystem(system: string): Plant[] {
  return plantsData.filter(plant => 
    plant.systems.some(s => s.toLowerCase() === system.toLowerCase())
  );
}

export function getPlantsByCategory(category: string): Plant[] {
  return plantsData.filter(plant => 
    plant.categories.some(c => c.toLowerCase() === category.toLowerCase())
  );
}

export function searchPlants(query: string): Plant[] {
  const lowerQuery = query.toLowerCase();
  return plantsData.filter(plant => 
    plant.name.toLowerCase().includes(lowerQuery) ||
    plant.botanicalName.toLowerCase().includes(lowerQuery) ||
    plant.commonNames.some(name => name.toLowerCase().includes(lowerQuery)) ||
    plant.medicinalUses.some(use => use.toLowerCase().includes(lowerQuery)) ||
    plant.categories.some(category => category.toLowerCase().includes(lowerQuery))
  );
}
