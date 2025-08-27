import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Ellipsis, Pen, ShieldBan, ShieldCheck } from "lucide-react";
import type React from "react";
import type { Symptom } from "@/interfaces/symptoms";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { useState } from "react";
import SymptomToggle from "./SymptomToggle";

const ActionsDropdown = ({
  setIsEditDialogOpen,
  setClickedSymptom,
  symptom,
}: {
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setClickedSymptom: React.Dispatch<React.SetStateAction<Symptom | null>>;
  symptom: Symptom;
}) => {
  const [isToggleDialogOpen, setIsToggleDialogOpen] = useState<boolean>(false);
  const isActive = symptom.is_active;

  const openEditDialog = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsEditDialogOpen(true);
    setClickedSymptom(symptom);
  };

  const openToggleDialog = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsToggleDialogOpen(true);
  };

  const onToggleSymptom = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("toggling", symptom);
    setIsToggleDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={openEditDialog}>
            <Pen /> Modifier
          </DropdownMenuItem>
          {isActive ? (
            <DropdownMenuItem onClick={openToggleDialog}>
              <ShieldBan />
              Désactiver
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={openToggleDialog}>
              <ShieldCheck />
              Réactiver
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isToggleDialogOpen} onOpenChange={setIsToggleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isActive ? "Désactiver" : "Réactiver"} ce symptôme ?
            </DialogTitle>
            <Separator className="my-4" />
            <SymptomToggle
              onToggleSymptom={onToggleSymptom}
              symptom={symptom}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ActionsDropdown;
