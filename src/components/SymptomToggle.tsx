import type { Symptom } from "@/interfaces/symptoms";
import { DialogDescription } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const SymptomToggle = ({
  symptom,
  onToggleSymptom,
}: {
  symptom: Symptom | null;
  onToggleSymptom: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <>
      <DialogDescription>
        Symptome : {symptom?.label}. <br />
        Crée par : {symptom?.author} <br />
        Le : {new Date(symptom?.creation_date || "").toLocaleDateString()}
        <br />
      </DialogDescription>
      <Separator className="my-4" />
      <Button onClick={onToggleSymptom}>
        Oui, {symptom?.is_active ? "désactiver" : "réactiver"}
      </Button>
    </>
  );
};

export default SymptomToggle;
