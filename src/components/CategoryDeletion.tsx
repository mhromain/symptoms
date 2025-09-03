"use client";

import { useCategories } from "@/hooks/useCategories";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

export interface SymptomCategory {
  id: number;
  label: string;
}

// --- Schema ---
const categoryDeletionSchema = z.object({
  categoryIds: z
    .array(z.number())
    .min(1, "Sélectionnez au moins une catégorie"),
});

type CategoryDeletionValues = z.infer<typeof categoryDeletionSchema>;

const CategoryDeletion = ({
  onDeleteCategories,
}: {
  onDeleteCategories: (ids: number[]) => void;
}) => {
  const { data: categories, isLoading } = useCategories();

  const form = useForm<CategoryDeletionValues>({
    resolver: zodResolver(categoryDeletionSchema),
    defaultValues: { categoryIds: [] },
  });

  const onSubmit = (values: CategoryDeletionValues) => {
    onDeleteCategories(values.categoryIds);
  };

  if (isLoading)
    return (
      <div className="flex justify-center p-4">
        <Loader2Icon size={24} className="animate-spin text-primary" />
      </div>
    );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {categories?.map((category) => (
          <FormField
            key={category.id}
            control={form.control}
            name="categoryIds"
            render={({ field }) => {
              return (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(category.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...field.value, category.id]);
                        } else {
                          field.onChange(
                            field.value.filter(
                              (id: number) => id !== category.id
                            )
                          );
                        }
                      }}
                    />
                  </FormControl>
                  <span>{category.label}</span>
                </FormItem>
              );
            }}
          />
        ))}

        <Button type="submit" disabled={isLoading}>
          {isLoading && (
            <Loader2Icon size={24} className="animate-spin text-primary" />
          )}{" "}
          Supprimer les catégories
        </Button>
      </form>
    </Form>
  );
};

export default CategoryDeletion;
