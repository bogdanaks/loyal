import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { IMaskInput } from "react-imask"
import { toast } from "sonner"
import * as z from "zod"

import { updateClientBonusPlus } from "entities/shop/api"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "shared/ui/alert-dialog"
import { Button } from "shared/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "shared/ui/form"

export interface SuccessPaymentData {
  is_new: boolean
  is_accrual: boolean
  check_amount: number
  bonus_points: number
  point_amount?: number
  user_id: number
  client_id: number
}

interface Props {
  client: UserAsClient
  loyalProgram: LoyalProgram
  onSuccess: (data: SuccessPaymentData) => void
}

const formSchema = z.object({
  check_amount: z.number({ required_error: "Обязательное поле." }).min(1, { message: "Минимум 1" }),
})

type FormFields = z.infer<typeof formSchema>

export const ScanSuccessPayment = ({ client, loyalProgram, onSuccess }: Props) => {
  const [isOpenConfirm, setIsOpenConfirm] = useState(false)

  const mutation = useMutation({
    mutationFn: updateClientBonusPlus,
    retry: false,
  })

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
  })

  const watchCheckAmount = form.watch("check_amount")

  const calculatePoints = useMemo(() => {
    const regBonus = !client?.client ? loyalProgram.reg_bonus : 0
    if (!watchCheckAmount) {
      return regBonus
    }

    return Math.round(regBonus + (loyalProgram.percent_bonus / 100) * watchCheckAmount)
  }, [watchCheckAmount, loyalProgram, client])

  const handleOpenConfirm = (open: boolean) => {
    setIsOpenConfirm(open)
  }

  const onSubmit = (data: FormFields) => {
    if (!client?.client) {
      return
    }

    mutation.mutate(
      {
        check_amount: data.check_amount,
        user_id: client.id,
      },
      {
        onSuccess: () => {
          if (!client?.client) {
            return
          }

          toast.success("Успешно выполнено!")
          onSuccess({
            ...data,
            is_new: client?.client === null,
            is_accrual: true,
            bonus_points: calculatePoints,
            user_id: client.id,
            client_id: client.client.id,
          })
        },
        onError: () => {
          toast.error("Ошибка. Обратитесь в поддержку")
        },
      }
    )
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 pb-4"
        onSubmit={(e) => {
          form.handleSubmit(onSubmit)()
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <div className="flex flex-col gap-2 mt-4">
          <FormField
            control={form.control}
            name="check_amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Сумма чека</FormLabel>
                <FormControl autoFocus={false}>
                  <div className="flex h-12 w-full py-2 rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                    <IMaskInput
                      className="flex h-full w-full bg-background px-3 rounded-md focus-visible:outline-none"
                      value={field.value?.toString()}
                      unmask={true}
                      mask={Number}
                      normalizeZeros
                      autofix
                      autoFocus={false}
                      name="check-amount"
                      inputMode="numeric"
                      onAccept={(value) => {
                        field.onChange(Number(value))
                      }}
                      placeholder="100"
                    />
                    <div className="flex items-center justify-center py-2 pr-3">руб.</div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col">
            <span>
              Итого: <span className="text-2xl">{calculatePoints}</span>р. скидка
            </span>
            <span className="text-sm text-slate-500">{loyalProgram.percent_bonus}% от чека</span>
          </div>
        </div>
        <Button
          className="w-full h-10 mt-4"
          disabled={!watchCheckAmount || watchCheckAmount === 0}
          type="button"
          onClick={() => setIsOpenConfirm(true)}
        >
          Расчитать
        </Button>
        <AlertDialog open={isOpenConfirm} onOpenChange={handleOpenConfirm}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Подтвердите действие</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="flex flex-col gap-1">
              <span>
                Сумма чека: <b>{watchCheckAmount}</b> руб.
              </span>
              <span>
                Скидка: <b>{calculatePoints}р.</b>
              </span>
            </div>
            <AlertDialogFooter className="flex flex-row items-center justify-center gap-2">
              <AlertDialogCancel className="w-full mt-0" type="button">
                Отменить
              </AlertDialogCancel>
              <AlertDialogAction
                className="w-full"
                type="button"
                onClick={() => {
                  form.clearErrors()
                  form.handleSubmit(onSubmit)()
                }}
              >
                Подтвердить
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Form>
  )
}
