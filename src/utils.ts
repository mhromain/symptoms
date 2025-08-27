import z from "zod";

export const alertLevelColors: Record<number, string> = {
  1: "#ee5d50",
  2: "#fd9011",
  3: "#ffce20",
  4: "#198754",
};

export const symptomFormSchema = z.object({
  category: z.string().min(1, "Sélectionnez une catégorie"),
  name: z.string().min(1, "Le nom est requis"),
  label: z.string().min(1, "La question est requise"),
  choices: z
    .array(
      z.object({
        label: z.string().min(1, "Le choix est requis"),
        level: z.number(),
      })
    )
    .length(4), // enforce exactly 4
});

export type SymptomFormValues = z.infer<typeof symptomFormSchema>;

export const getAlertLevelColor = (level: number) => {
  return alertLevelColors[level];
};
