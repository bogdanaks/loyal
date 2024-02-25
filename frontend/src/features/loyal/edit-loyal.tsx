import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { IMaskInput } from "react-imask"
import { toast } from "sonner"
import * as z from "zod"

import { getLoyalTypes, getMyLoyalProgram, updateLoyal } from "entities/loyal/api"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "shared/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "shared/ui/select"
import { TelegramButton } from "shared/ui/telegram-button"

const formSchema = z.object({
  type_id: z.number(),
  percent_bonus: z.string(),
  reg_bonus: z.string(),
})
type FormFields = z.infer<typeof formSchema>

export const EditLoyal = () => {
  const { data: loyalTypes } = useQuery({
    queryKey: ["loyal-types"],
    queryFn: getLoyalTypes,
  })
  const { data: loyalProgram } = useQuery({
    queryKey: ["loyal-program"],
    queryFn: getMyLoyalProgram,
  })
  const { mutate } = useMutation({
    mutationFn: updateLoyal,
  })

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })
  const watchType = form.watch("type_id")

  useEffect(() => {
    if (loyalProgram && loyalProgram.data) {
      form.reset({
        type_id: loyalProgram.data.loyal_type_id,
        percent_bonus: loyalProgram.data.percent_bonus.toString(),
        reg_bonus: loyalProgram.data.reg_bonus.toString(),
      })
    }
  }, [loyalProgram])

  const onSubmit = (data: FormFields) => {
    mutate(
      {
        ...data,
        percent_bonus: Number(data.percent_bonus),
        reg_bonus: Number(data.reg_bonus),
      },
      {
        onSuccess: () => {
          toast.success("Успешно сохранено!")
        },
        onError: () => {
          toast.error("Ошибка. Обратитесь в поддержку")
        },
      }
    )
  }

  return (
    <Form {...form}>
      <form className="flex flex-col w-full gap-3 h-full" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="type_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Тип программы</FormLabel>
              <FormDescription>
                <p>Бонусная - баллы за покупки, обмениваются в счёт покупки.</p>
                <p>Дисконтная - постоянный процент скидки.</p>
              </FormDescription>
              <FormControl>
                <Select
                  onValueChange={(val) => field.onChange(Number(val))}
                  defaultValue={field?.value?.toString()}
                  value={field?.value?.toString()}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={field.value?.toString()} />
                  </SelectTrigger>
                  <SelectContent>
                    {loyalTypes?.data.map((type) => (
                      <SelectItem key={type.id} value={type.id.toString()}>
                        {type.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="percent_bonus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Процент скидки/баллов от суммы покупки</FormLabel>
              <FormControl>
                <IMaskInput
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={field.value?.toString()}
                  unmask={true}
                  mask={Number}
                  normalizeZeros
                  autofix
                  name="percent"
                  maxLength={2}
                  inputMode="numeric"
                  from={1}
                  to={99}
                  placeholder="10"
                  onAccept={(value) => {
                    field.onChange(value)
                  }}
                  disabled={!watchType}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reg_bonus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Единоразовое начисление баллов при регистрации</FormLabel>
              <FormControl>
                <IMaskInput
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={field.value?.toString()}
                  unmask={true}
                  mask={Number}
                  normalizeZeros
                  autofix
                  name="reg-bonus"
                  inputMode="numeric"
                  onAccept={(value) => {
                    field.onChange(value)
                  }}
                  placeholder="100"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <TelegramButton
          type="submit"
          className="w-fit mt-4"
          text="Сохранить"
          onClick={() => form.handleSubmit(onSubmit)()}
        >
          Сохранить
        </TelegramButton>
      </form>
    </Form>
  )
}
