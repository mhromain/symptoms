import type { SymptomCategory } from "@/interfaces/symptoms";
import { api } from "./client";

export const getCategories = () => api<SymptomCategory[]>("/api/categories");

export const createCategory = (categories: string[]) =>
  api<SymptomCategory>("/api/categories", {
    method: "POST",
    body: JSON.stringify(categories),
  });

export const deleteCategory = (ids: number[]) =>
  api<SymptomCategory>("/api/categories", {
    method: "DELETE",
    body: JSON.stringify(ids),
  });
