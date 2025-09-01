import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSymptoms, createSymptom, patchSymptom } from "@/api/symptoms";
import type { Symptom } from "@/interfaces/symptoms";

export function useSymptoms() {
  return useQuery({
    queryKey: ["symptoms"],
    queryFn: getSymptoms,
    staleTime: Infinity,
    refetchOnMount: false,
  });
}

export function useCreateSymptom() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createSymptom,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["symptoms"] }),
  });
}

export function usePatchSymptom() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ uid, body }: { uid: string; body: Partial<Symptom> }) =>
      patchSymptom(uid, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["symptoms"] }),
  });
}
