import { Controller, UseFormReturn } from "react-hook-form";
import { IMaskInput } from "react-imask";

import { RegisterData } from "entities/auth/api";

import { InputField } from "shared/ui";
import { Label } from "shared/ui/label";

interface Props {
  form: UseFormReturn<RegisterData, unknown, RegisterData>;
}

export const RegisterFormStep2 = ({ form }: Props) => {
  return (
    <>
      <Controller
        name="biz_name"
        control={form.control}
        rules={{ required: { message: "Обязательное поле", value: true } }}
        render={({ field, fieldState: { error } }) => (
          <InputField
            value={field.value}
            onChange={field.onChange}
            label="Название"
            error={error?.message}
          />
        )}
      />
      <Controller
        name="name"
        control={form.control}
        rules={{ required: { message: "Обязательное поле", value: true } }}
        render={({ field, fieldState: { error } }) => (
          <InputField
            value={field.value}
            onChange={field.onChange}
            label="Ваше имя"
            error={error?.message}
          />
        )}
      />
      <Controller
        name="phone"
        control={form.control}
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col">
            <Label htmlFor="phone" className="mb-1.5 text-slate-500">
              Номер телефона
            </Label>
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
            {error && (
              <Label htmlFor="phone" className="mt-1.5 text-xs text-red-500">
                {error?.message}
              </Label>
            )}
          </div>
        )}
      />
      <Controller
        name="email"
        control={form.control}
        rules={{ required: { message: "Обязательное поле", value: true } }}
        render={({ field, fieldState: { error } }) => (
          <InputField
            value={field.value}
            onChange={field.onChange}
            label="E-mail"
            type="email"
            autoComplete="email"
            placeholder="example@mail.ru"
            error={error?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={form.control}
        rules={{ required: { message: "Обязательное поле", value: true } }}
        render={({ field, fieldState: { error } }) => (
          <InputField
            value={field.value}
            onChange={field.onChange}
            type="password"
            label="Пароль"
            error={error?.message}
          />
        )}
      />
    </>
  );
};
