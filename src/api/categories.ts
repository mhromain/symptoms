import type { SymptomCategory } from "@/interfaces/symptoms";
import { api } from "./client";

export const getCategories = () => api<SymptomCategory[]>("/api/categories");

export const createCategory = (body: { label: string }) =>
  api<SymptomCategory>("/api/categories", {
    method: "POST",
    body: JSON.stringify(body),
  });
