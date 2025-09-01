import { createFileRoute } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  mockCategories,
  mockSymptoms,
  type Symptom,
} from "@/interfaces/symptoms";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import ChoicesTable from "@/components/ChoicesTable";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import ActionsDropdown from "@/components/ActionsDropdown";
import { Separator } from "@/components/ui/separator";
import SymptomEdition from "@/components/SymptomEdition";
import type { SymptomFormValues } from "@/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Activity, Blocks, Loader2Icon } from "lucide-react";
import CategoryCreation from "@/components/CategoryCreation";
import { useCategories, useCreateCategory } from "@/hooks/useCategories";
import {
  useCreateSymptom,
  usePatchSymptom,
  useSymptoms,
} from "@/hooks/useSymptoms";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_private/home")({
  component: HomePage,
});

function HomePage() {
  const patchSymptom = usePatchSymptom();
  const createSymptom = useCreateSymptom();
  const createCategory = useCreateCategory();
  const [searchText, setSearchText] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [category, setCategory] = useState<number | null>(null);
  const [seeDisabled, setSeeDisabled] = useState<boolean>(false);
  const [isCreateCategoryDialogOpen, setIsCreateCategoryDialogOpen] =
    useState<boolean>(false);
  const [isCreateSymptomDialogOpen, setIsCreateSymptomDialogOpen] =
    useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [clickedSymptom, setClickedSymptom] = useState<Symptom | null>(null);

  const { data: symptoms = [...mockSymptoms], isLoading: loadingSymptoms } =
    useSymptoms();
  const {
    data: categories = [...mockCategories],
    isLoading: loadingCategories,
  } = useCategories();

  const findCategoryLabel = (categoryId: number) => {
    return categories.find((cat) => cat.id === categoryId)?.label;
  };

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(searchText), 200);
    return () => clearTimeout(timeout);
  }, [searchText]);

  const filteredSymptoms = symptoms.filter(
    (ms) =>
      ms.label.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
      (category ? ms.category === category : true) &&
      (seeDisabled ? true : ms.is_active)
  );

  const onCreateCategories = (categories: string[]) => {
    createCategory.mutate(categories, {
      onSuccess: () => {
        setIsCreateCategoryDialogOpen(false);
        setClickedSymptom(null);
      },
    });
  };

  const onCreateSymptom = (values: SymptomFormValues) => {
    setIsCreateSymptomDialogOpen(false);
    setClickedSymptom(null);
    createSymptom.mutate(
      {
        ...values,
        category: parseInt(values.category) || 1,
        is_active: true,
        author: "Jean Dupont",
      },
      {
        onSuccess: () => {
          setIsCreateSymptomDialogOpen(false);
          setClickedSymptom(null);
        },
      }
    );
  };

  const onEditSymptom = (values: SymptomFormValues) => {
    if (!clickedSymptom) return;
    setIsEditDialogOpen(false);
    patchSymptom.mutate(
      {
        uid: clickedSymptom.uid,
        body: { ...values, category: parseInt(values.category) || 1 },
      },
      {
        onSuccess: () => {
          setIsEditDialogOpen(false);
          setClickedSymptom(null);
        },
      }
    );
    setClickedSymptom(null);
  };

  return (
    <div className="p-8 flex flex-col gap-4">
      <div className="flex gap-4 justify-between flex-wrap">
        <div className="flex gap-4 flex-wrap">
          <Input
            onChange={(e) => setSearchText(e.currentTarget.value)}
            placeholder="Rechercher un symptôme..."
            className="w-xs"
          />
          <Select onValueChange={(value) => setCategory(Number(value))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Toutes les catégories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Toutes les catégories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={"cat-" + cat.id} value={cat.id.toString()}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => setIsCreateSymptomDialogOpen(true)}>
            <Activity /> Nouveau symptôme
          </Button>
          <Button onClick={() => setIsCreateCategoryDialogOpen(true)}>
            <Blocks /> Nouvelle catégorie
          </Button>
        </div>
        <div className="flex items-center">
          {(loadingCategories || loadingSymptoms) && (
            <Loader2Icon size={"16"} className="animate-spin text-primary" />
          )}
        </div>
      </div>
      <Table className="table-fixed overflow-y-scroll">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[35%]">Nom</TableHead>
            <TableHead className="w-[15%]">Categorie</TableHead>
            <TableHead className="w-[35%]">Label</TableHead>
            <TableHead className="w-[15%]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSymptoms.map((symptom) => (
            <Collapsible key={"collapsible" + symptom.uid} asChild>
              <>
                <CollapsibleTrigger asChild>
                  <TableRow
                    key={"row1" + symptom.uid}
                    className={symptom.is_active ? "opacity-100" : "opacity-50"}
                  >
                    <TableCell className="overflow-hidden text-ellipsis">
                      {symptom.name}
                    </TableCell>
                    <TableCell>{findCategoryLabel(symptom.category)}</TableCell>
                    <TableCell className="overflow-hidden text-ellipsis">
                      {symptom.label}
                    </TableCell>
                    <TableCell className="text-right">
                      <ActionsDropdown
                        setIsEditDialogOpen={setIsEditDialogOpen}
                        setClickedSymptom={setClickedSymptom}
                        symptom={symptom}
                      />
                    </TableCell>
                  </TableRow>
                </CollapsibleTrigger>
                <CollapsibleContent asChild>
                  <TableRow key={"row2" + symptom.uid}>
                    <TableCell colSpan={5} className="bg-red-50">
                      <ChoicesTable symptom={symptom} />
                    </TableCell>
                  </TableRow>
                </CollapsibleContent>
              </>
            </Collapsible>
          ))}
        </TableBody>
      </Table>

      <Dialog
        open={isCreateCategoryDialogOpen}
        onOpenChange={setIsCreateCategoryDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Création de catégories</DialogTitle>
            <Separator className="my-4" />
            <CategoryCreation onSubmitCategories={onCreateCategories} />
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isCreateSymptomDialogOpen}
        onOpenChange={setIsCreateSymptomDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Création d'un symptome</DialogTitle>
            <Separator className="my-4" />
            <SymptomEdition
              onSubmitSymptom={onCreateSymptom}
              symptom={clickedSymptom}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modification du symptome</DialogTitle>
            <Separator className="my-4" />
            <SymptomEdition
              onSubmitSymptom={onEditSymptom}
              symptom={clickedSymptom}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="flex items-center gap-2">
        <Switch
          checked={seeDisabled}
          onCheckedChange={setSeeDisabled}
          className="data-[state=checked]:bg-primary"
          id="show-inactive"
        />
        <Label className="font-light" htmlFor="show-inactive">
          Voir les symptômes désactivés
        </Label>
      </div>
    </div>
  );
}
