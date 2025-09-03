"use client";

import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Blocks, Loader2Icon, Trash } from "lucide-react";
import { useIsFetching } from "@tanstack/react-query";

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
  const isCategoriesLoading = useIsFetching({ queryKey: ["categories"] });

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
        {/* <Separator className="my-4" /> */}
        <div className="flex gap-2">
          <Button
            type="button"
            onClick={() => append("")}
            variant="secondary"
            className="grow"
            disabled={!!isCategoriesLoading}
          >
            <Blocks /> Ajouter une autre catégorie
          </Button>

          <Button type="submit" disabled={!!isCategoriesLoading}>
            {!!isCategoriesLoading && (
              <Loader2Icon size={"16"} className="animate-spin text-white" />
            )}
            Enregistrer
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CategoryCreation;
