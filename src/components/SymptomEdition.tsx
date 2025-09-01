"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { mockCategories, type Symptom } from "@/interfaces/symptoms";
import { Badge } from "./ui/badge";
import {
  alertLevelColors,
  symptomFormSchema,
  type SymptomFormValues,
} from "@/utils";
import { Separator } from "./ui/separator";
import { useCategories } from "@/hooks/useCategories";
import { Loader2Icon } from "lucide-react";
import { useIsFetching } from "@tanstack/react-query";

const SymptomEdition = ({
  symptom,
  onSubmitSymptom,
}: {
  symptom: Symptom | null;
  onSubmitSymptom: (values: SymptomFormValues) => void;
}) => {
  const { data: categories = [...mockCategories] } = useCategories();
  const isCategoriesLoading = useIsFetching({ queryKey: ["categories"] });

  const form = useForm<SymptomFormValues>({
    resolver: zodResolver(symptomFormSchema),
    defaultValues: {
      category: symptom?.category.toString(),
      name: symptom?.name,
      label: symptom?.label,
      choices: [
        {
          label: symptom?.choices.find((c) => c.level == 1)?.label || "",
          level: 1,
        },
        {
          label: symptom?.choices.find((c) => c.level == 2)?.label || "",
          level: 2,
        },
        {
          label: symptom?.choices.find((c) => c.level == 3)?.label || "",
          level: 3,
        },
        {
          label: symptom?.choices.find((c) => c.level == 4)?.label || "",
          level: 4,
        },
      ],
    },
  });

  const getAlertLevelColor = (level: number) => {
    return alertLevelColors[level];
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitSymptom)}
        className="flex flex-col gap-4"
      >
        {/* Category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catégorie</FormLabel>
              <Select
                disabled={!!isCategoriesLoading}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    {!!isCategoriesLoading && (
                      <Loader2Icon
                        size={"16"}
                        className="animate-spin text-primary"
                      />
                    )}

                    <SelectValue
                      placeholder={
                        !!isCategoriesLoading
                          ? "Chargement des catégories"
                          : "Sélectionner"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Catégories</SelectLabel>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du symptôme</FormLabel>
              <FormControl>
                <Input placeholder="Nom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Label (Question) */}
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input placeholder="Label" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Choices */}
        <div className="space-y-2">
          <FormLabel>Choix de réponses</FormLabel>
          {form.watch("choices").map((_, index) => (
            <FormField
              key={index}
              control={form.control}
              name={`choices.${index}.label`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Badge
                      style={{ backgroundColor: getAlertLevelColor(index + 1) }}
                    >
                      Niveau {index + 1}
                    </Badge>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`Réponse de niveau d'alerte ${index + 1}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <Separator className="my-4" />

        <Button className="grow" type="submit">
          Enregistrer
        </Button>
      </form>
    </Form>
  );
};

export default SymptomEdition;
