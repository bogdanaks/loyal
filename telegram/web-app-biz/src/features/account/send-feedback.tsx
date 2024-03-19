import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { sendFeedback } from "entities/help/api";

import { Button } from "shared/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "shared/ui/form";
import { Textarea } from "shared/ui/textarea";

const formSchema = z.object({
  text: z
    .string()
    .min(3, { message: "Минимум 3 символа." })
    .max(200, { message: "Максимум 200 символов." }),
});

type FormFields = z.infer<typeof formSchema>;

export const SendFeedback = () => {
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: { text: "" },
  });
  const mutation = useMutation({
    mutationFn: sendFeedback,
  });

  const onSubmit = ({ text }: FormFields) => {
    mutation.mutate(text, {
      onSuccess: () => {
        form.setValue("text", "");
        toast.success("Отправлено!");
      },
      onError: () => {
        toast.error("Ошибка. Обратитесь в поддержку");
      },
    });
  };

  const watchText = form.watch("text");

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!watchText?.length}>
          Отправить
        </Button>
      </form>
    </Form>
  );
};
