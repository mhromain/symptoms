"use client";

import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Blocks, Trash } from "lucide-react";
import { Separator } from "./ui/separator";

const categoryFormSchema = z.object({
  categories: z.array(z.string().min(1, "Le champ ne peut pas être vide")),
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

const CategoryCreation = ({
  onSubmitCategories,
}: {
  onSubmitCategories: (values: string[]) => void;
}) => {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      categories: ["Aa"],
    },
  });

  const { fields, append, remove } = useFieldArray<any>({
    control: form.control,
    name: "categories",
  });

  const onSubmit = (values: CategoryFormValues) => {
    onSubmitCategories(values.categories);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {fields.map((field, index) => (
          <FormField
            key={field.id}
            control={form.control}
            name={`categories.${index}`}
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Input placeholder={`Catégorie ${index + 1}`} {...field} />
                </FormControl>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash />
                  </Button>
                )}
              </FormItem>
            )}
          />
        ))}
        <Separator className="my-4" />
        <div className="flex gap-2">
          <Button
            type="button"
            onClick={() => append("")}
            variant="secondary"
            className="grow"
          >
            <Blocks /> Ajouter une autre catégorie
          </Button>

          <Button type="submit">Enregistrer</Button>
        </div>
      </form>
    </Form>
  );
};

export default CategoryCreation;
