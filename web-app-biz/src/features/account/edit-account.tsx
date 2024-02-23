import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";

import { updateAccount } from "entities/business/api";
import { useBusinessStore } from "entities/business/model/store";

import { removeAuthToken } from "shared/libs/ls";
import { Button } from "shared/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "shared/ui/form";
import { Input } from "shared/ui/input";

import { EditPassword } from "./edit-password";

type FormFields = Omit<BusinessAccount, "id" | "created_at" | "updated_at">;

const formSchema = z.object({
  name: z.string({ required_error: "Обязательное поле." }).min(3).max(25),
  phone: z.string({ required_error: "Обязательное поле." }).min(10, { message: "Неверный формат" }),
  email: z.string({ required_error: "Обязательное поле." }).email(),
});

export const EditAccount = () => {
  const account = useBusinessStore((state) => state.account);
  const setAccount = useBusinessStore((state) => state.setAccount);
  const navigate = useNavigate();

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: account?.email,
      name: account?.name,
      phone: account?.phone,
    },
  });

  useEffect(() => {
    if (account) {
      form.reset({
        email: account.email,
        name: account.name,
        phone: account.phone,
      });
    }
  }, [account]);

  const mutation = useMutation({
    mutationFn: updateAccount,
  });

  const onSubmit = (data: FormFields) => {
    if (!account) {
      return;
    }

    mutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        toast.success("Сохранено");
        setAccount({ ...account, name: data.name, phone: data.phone, email: data.email });
      },
      onError: () => {
        toast.error("Ошибка. Обратитесь в поддержку");
      },
    });
  };

  const handleExit = () => {
    removeAuthToken();
    setAccount(null);
    navigate("/auth");
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4 pb-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ваше имя</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ваше имя" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Номер телефона</FormLabel>
              <FormControl>
                <IMaskInput
                  className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  mask="+7 (000) 000-00-00"
                  value={field.value}
                  unmask={true}
                  name="phone"
                  inputMode="numeric"
                  onAccept={(value) => {
                    field.onChange(value);
                  }}
                  placeholder="+7 (000) 000-00-00"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Почта</FormLabel>
              <FormControl>
                <Input {...field} placeholder="example@mail.ru" type="email" autoComplete="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Сохранить</Button>
        <EditPassword />
        <Button
          type="button"
          variant="outline"
          className="border-red-500 mt-auto"
          onClick={handleExit}
        >
          Выйти
        </Button>
      </form>
    </Form>
  );
};
