import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { toast } from "sonner";
import * as z from "zod";

import { getLoyalTypes, getMyLoyalProgram, updateLoyal } from "entities/loyal/api";

import Icon100 from "shared/assets/icons/100.svg?react";
import BearIcon from "shared/assets/icons/bear.svg?react";
import CreditCardIcon from "shared/assets/icons/credit-card.svg?react";
import { cn } from "shared/libs/utils";
import { Button } from "shared/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "shared/ui/form";

import { GridGroup } from "widgets/ui";

const loyalTypeIcons = {
  "100": <Icon100 className="w-[40%]" />,
  "credit-card": <CreditCardIcon className="w-[40%]" />,
};

const formSchema = z.object({
  type: z.number(),
  percent_bonus: z.string(),
  reg_bonus: z.string(),
});

type FormFields = z.infer<typeof formSchema>;

export const EditLoyal = () => {
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
  });

  const { data: loyalTypes } = useQuery({
    queryKey: ["loyal-types"],
    queryFn: getLoyalTypes,
  });
  const { data: loyalProgram } = useQuery({
    queryKey: ["loyal-program"],
    queryFn: getMyLoyalProgram,
  });
  const mutation = useMutation({
    mutationFn: updateLoyal,
  });

  useEffect(() => {
    if (loyalProgram) {
      form.reset({
        type: loyalProgram.data.loyal_type_id,
        percent_bonus: loyalProgram.data.percent_bonus.toString(),
        reg_bonus: loyalProgram.data.reg_bonus.toString(),
      });
    }
  }, [loyalProgram]);

  const onSubmit = (data: FormFields) => {
    mutation.mutate(
      {
        type: data.type,
        percent_bonus: Number(data.percent_bonus),
        reg_bonus: Number(data.reg_bonus),
      },
      {
        onSuccess: () => {
          toast.success("Сохранено");
        },
        onError: () => {
          toast.error("Ошибка. Обратитесь в поддержку");
        },
      }
    );
  };

  const watchType = form.watch("type");

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4 pb-4" onSubmit={form.handleSubmit(onSubmit)}>
        <GridGroup
          title="Тип программы"
          desc={
            <>
              Бонусная - баллы за покупки, обмениваются в счёт покупки.
              <br />
              Дисконтная - постоянный процент скидки.
            </>
          }
        >
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="gap-4 grid grid-cols-2">
                    {loyalTypes?.data.map((lt) => (
                      <Button
                        key={lt.id}
                        variant="ghost"
                        type="button"
                        className={cn(
                          "w-full h-24 aspect-square bg-primary-disabled rounded-xl p-4 px-6 flex flex-col items-center justify-between border focus:bg-primary-disabled focus:border-primary hover:bg-primary-disabled",
                          { "border-primary": field.value === lt.id }
                        )}
                        onClick={() => field.onChange(lt.id)}
                      >
                        <span className="w-full flex items-center justify-center">
                          {lt.icon in loyalTypeIcons ? (
                            loyalTypeIcons[lt.icon as keyof typeof loyalTypeIcons]
                          ) : (
                            <BearIcon className="w-[40%]" />
                          )}
                        </span>
                        <span className="w-full flex items-center justify-center text-center text-slate-500">
                          {lt.title}
                        </span>
                      </Button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </GridGroup>
        <GridGroup
          title={`Настройка ${!watchType ? "" : watchType === 1 ? "бонусной" : "дисконтной"} программы`}
        >
          <FormField
            control={form.control}
            name="percent_bonus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Процент скидки/баллов от суммы покупки</FormLabel>
                <FormControl>
                  <div
                    className={cn(
                      "flex h-12 w-full py-2 rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                      { "opacity-50": !watchType }
                    )}
                  >
                    <IMaskInput
                      className="flex h-full w-full bg-background px-3 rounded-md focus-visible:outline-none"
                      value={field.value?.toString()}
                      unmask={true}
                      mask={Number}
                      normalizeZeros
                      autofix
                      name="percent"
                      maxLength={3}
                      inputMode="numeric"
                      from={1}
                      to={100}
                      onAccept={(value) => {
                        field.onChange(value);
                      }}
                      placeholder="10"
                      disabled={!watchType}
                    />
                    <div className="flex items-center justify-center pr-3">%</div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </GridGroup>
        <GridGroup title="Приветственное вознаграждение">
          <FormField
            control={form.control}
            name="reg_bonus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Единоразовое начисление баллов при регистрации</FormLabel>
                <FormControl>
                  <div className="flex h-12 w-full py-2 rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                    <IMaskInput
                      className="flex h-full w-full bg-background px-3 rounded-md focus-visible:outline-none"
                      value={field.value?.toString()}
                      unmask={true}
                      mask={Number}
                      normalizeZeros
                      autofix
                      name="reg-bonus"
                      inputMode="numeric"
                      onAccept={(value) => {
                        field.onChange(value);
                      }}
                      placeholder="100"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </GridGroup>
        <Button type="submit">Сохранить</Button>
      </form>
    </Form>
  );
};
