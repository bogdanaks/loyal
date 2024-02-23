import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { updatePassword } from "entities/business/api";

import { InputField } from "shared/ui";
import { Button } from "shared/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "shared/ui/dialog";

interface FormFields {
  old_password: string;
  new_password: string;
  new_password_repeate: string;
}

const formSchema = z
  .object({
    old_password: z
      .string({ required_error: "Обязательное поле." })
      .min(6, { message: "Минимум 6 символов." })
      .max(100, { message: "Максимум 100 символов." }),
    new_password: z
      .string({ required_error: "Обязательное поле." })
      .min(6, { message: "Минимум 6 символов." })
      .max(100, { message: "Максимум 100 символов." }),
    new_password_repeate: z
      .string({ required_error: "Обязательное поле." })
      .min(6, { message: "Минимум 6 символов." })
      .max(100, { message: "Максимум 100 символов." }),
  })
  .refine((data) => data.new_password === data.new_password_repeate, {
    message: "Пароль не совпадает",
    path: ["new_password_repeate"],
  });

export const EditPassword = () => {
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      new_password_repeate: "",
    },
  });

  const mutation = useMutation<BaseResponse<string>, ResponseError, UpdatePasswordData, unknown>({
    mutationFn: updatePassword,
  });

  const onSubmit = (data: FormFields) => {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset({
          new_password: "",
          new_password_repeate: "",
          old_password: "",
        });
        toast.success("Сохранено");
      },
      onError: (error) => {
        console.log("err", error);
        if (error.status === 400) {
          toast.error(error.payload.message);
          return;
        }
        toast.error("Ошибка. Обратитесь в поддержку");
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Button type="button" variant="outline" className="w-full">
          Изменить пароль
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Изменить пароль</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            form.handleSubmit(onSubmit)();
            e.preventDefault();
            e.stopPropagation();
          }}
          className="flex flex-col gap-4 mt-4"
        >
          <Controller
            name="old_password"
            control={form.control}
            rules={{ required: { message: "Обязательное поле", value: true } }}
            render={({ field, fieldState: { error } }) => (
              <InputField
                placeholder="Старый пароль"
                value={field.value}
                onChange={field.onChange}
                label="Старый пароль"
                error={error?.message}
                type="password"
              />
            )}
          />
          <Controller
            name="new_password"
            control={form.control}
            rules={{ required: { message: "Обязательное поле", value: true } }}
            render={({ field, fieldState: { error } }) => (
              <InputField
                placeholder="Новый пароль"
                value={field.value}
                onChange={field.onChange}
                label="Новый пароль"
                error={error?.message}
                type="password"
              />
            )}
          />
          <Controller
            name="new_password_repeate"
            control={form.control}
            rules={{ required: { message: "Обязательное поле", value: true } }}
            render={({ field, fieldState: { error } }) => (
              <InputField
                placeholder="Повторите новый пароль"
                value={field.value}
                onChange={field.onChange}
                label="Повторите новый пароль"
                error={error?.message}
                type="password"
              />
            )}
          />
          <div className="w-full flex flex-row mt-2 gap-4">
            <Button className="w-full" variant="default" type="submit">
              Сохранить
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
