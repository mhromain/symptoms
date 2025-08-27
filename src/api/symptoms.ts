// src/api/symptoms.ts
import type { Symptom } from "@/interfaces/symptoms";
import { api } from "./client";

export const getSymptoms = () => api<Symptom[]>("/api/symptoms");

export const createSymptom = (body: Omit<Symptom, "uid">) =>
  api<Symptom>("/api/symptoms", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const updateSymptom = (uid: string, body: Partial<Symptom>) =>
  api<Symptom>(`/api/symptoms/${uid}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
