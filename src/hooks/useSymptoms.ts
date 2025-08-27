import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSymptoms, createSymptom, updateSymptom } from "@/api/symptoms";
import type { Symptom } from "@/interfaces/symptoms";

export function useSymptoms() {
  return useQuery({ queryKey: ["symptoms"], queryFn: getSymptoms });
}

export function useCreateSymptom() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createSymptom,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["symptoms"] }),
  });
}

export function useUpdateSymptom() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ uid, body }: { uid: string; body: Partial<Symptom> }) =>
      updateSymptom(uid, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["symptoms"] }),
  });
}
