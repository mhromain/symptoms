export interface Symptom {
  id: number;
  uid: string;
  category: number;
  name: string;
  label: string;
  choices: Choice[];
  creation_date: string;
  modification_date: string;
  is_active: boolean;
  author: string;
  last_author: string;
}

export interface Choice {
  label: string;
  level: number;
}

export interface SymptomCategory {
  id: number;
  label: string;
}

export const mockSymptoms: Symptom[] = [
  {
    id: 1,
    uid: "symp-001",
    category: 1,
    name: "Mal de ventre",
    label: "Avez-vous mal au ventre?",
    choices: [
      { label: "Non", level: 3 },
      { label: "Oui, un peu", level: 2 },
      { label: "Oui, beaucoup", level: 1 },
    ],
    creation_date: "2025-08-26T10:00:00Z",
    modification_date: "2025-08-26T10:00:00Z",
    is_active: true,
    author: "Alexis Roux",
    last_author: "Alexis Roux",
  },
  {
    id: 2,
    uid: "symp-002",
    category: 1,
    name: "Mal aux oreilles",
    label: "Avez-vous mal aux oreilles?",
    choices: [
      { label: "Non", level: 3 },
      { label: "Oui, un peu", level: 2 },
      { label: "Oui, beaucoup", level: 1 },
    ],
    creation_date: "2025-08-26T10:00:00Z",
    modification_date: "2025-08-26T10:00:00Z",
    is_active: false,
    author: "Romain Reghem",
    last_author: "Romain Reghem",
  },
  {
    id: 3,
    uid: "symp-003",
    category: 2,
    name: "Boutons sur le visage",
    label: "Avez-vous des boutons sur le visage?",
    choices: [
      { label: "Non", level: 4 },
      { label: "Un seul", level: 3 },
      { label: "Oui, quelques uns", level: 2 },
      { label: "Oui, pleins", level: 1 },
    ],
    creation_date: "2025-08-26T10:00:00Z",
    modification_date: "2025-08-26T10:00:00Z",
    is_active: true,
    author: "Alexis Roux",
    last_author: "Alexis Roux",
  },
];

export const mockCategories: SymptomCategory[] = [
  { id: 1, label: "Douleurs" },
  { id: 2, label: "Visibles" },
];
