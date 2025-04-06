
export interface Plant {
  id: string;
  name: string;
  botanicalName: string;
  commonNames: string[];
  systems: AyushSystem[];
  imageUrl: string;
  habitat: string;
  description: string;
  medicinalUses: string[];
  cultivationMethods: string[];
  medicinialRecipes: Recipe[];
  modelPath?: string; // Path to 3D model if available
  categories: string[];
  parts?: PlantPart[]; // Added plant parts information
}

export interface PlantPart {
  name: string;
  description: string;
  uses: string[];
  position: { x: number, y: number };
}

export interface Recipe {
  name: string;
  ingredients: string[];
  preparation: string;
  uses: string;
}

export type AyushSystem = 'Ayurveda' | 'Yoga' | 'Unani' | 'Siddha' | 'Homeopathy';

export interface Category {
  id: string;
  name: string;
  description: string;
  plantIds: string[];
}

export interface Tour {
  id: string;
  name: string;
  description: string;
  plantIds: string[];
}
