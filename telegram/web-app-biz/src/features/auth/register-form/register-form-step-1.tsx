import { useQuery } from "@tanstack/react-query";
import { Controller, UseFormReturn } from "react-hook-form";

import { RegisterData } from "entities/auth/api";

import { getShopTypes } from "entities/shop/api";
import { ShopType } from "entities/shop/ui";

import { activeButtonParams } from "shared/config/tg-buttons";

interface Props {
  form: UseFormReturn<RegisterData, unknown, RegisterData>;
}

export const RegisterFormStep1 = ({ form }: Props) => {
  const { data } = useQuery({
    queryKey: ["shop-types"],
    queryFn: getShopTypes,
  });

  return (
    <>
      <p className="text-xs text-slate-500">Выберите тип вашего бизнеса</p>
      <Controller
        name="biz_type"
        control={form.control}
        rules={{ required: { message: "Обязательное поле", value: true } }}
        render={({ field }) => (
          <ul className="grid grid-cols-2 gap-x-2 gap-y-3">
            {data?.data.map((i) => (
              <ShopType
                key={i.id}
                id={i.id}
                title={i.title}
                onClick={(id) => {
                  field.onChange(id);
                  Telegram.WebApp.MainButton.setParams(activeButtonParams("Зарегистрироваться"));
                }}
                isActive={field.value === i.id}
              />
            ))}
          </ul>
        )}
      />
    </>
  );
};
