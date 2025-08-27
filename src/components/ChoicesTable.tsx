import type { Symptom } from "@/interfaces/symptoms";
import { Badge } from "./ui/badge";
import { getAlertLevelColor } from "@/utils";

const ChoicesTable = ({ symptom }: { symptom: Symptom }) => {
  symptom.choices.sort((a, b) => a.level - b.level);

  return (
    <div className="flex flex-col gap-4">
      {symptom.choices.map((choice, index) => (
        <div key={index} className="flex gap-4">
          <Badge style={{ backgroundColor: getAlertLevelColor(choice.level) }}>
            Niveau {choice.level}
          </Badge>
          <p>{choice.label}</p>
        </div>
      ))}
    </div>
  );
};

export default ChoicesTable;
