import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import Big from "big.js"
import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { IMaskInput } from "react-imask"
import { toast } from "sonner"
import * as z from "zod"

import { updateClientBonusMinus, updateClientBonusPlus } from "entities/shop/api"
import { useShopStore } from "entities/shop/model/store"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "shared/ui/tabs"

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

const calculateMaxPoints = (
  point_amount: number,
  check_amount: number,
  max_off_check_percent: number
) => {
  const maxValueByPoint = Math.min(point_amount, check_amount)
  const maxValueFromCheck = Big(check_amount).mul(Big(max_off_check_percent).div(100))
  return Math.round(Math.min(Math.max(maxValueByPoint, 0), maxValueFromCheck.toNumber()))
}

const formSchema = z
  .object({
    check_amount: z
      .number({ required_error: "Обязательное поле." })
      .min(1, { message: "Минимум 1" }),
    point_amount: z
      .number({ required_error: "Обязательное поле." })
      .min(1, { message: "Минимум 1" })
      .optional(),
  })
  .refine((data) => (data.point_amount ? Big(data.point_amount).lte(data.check_amount) : true), {
    message: "Количество баллов не может превышать сумму чека.",
    path: ["point_amount"],
  })

type FormFields = z.infer<typeof formSchema>

export const ScanSuccessPayment = ({ client, loyalProgram, onSuccess }: Props) => {
  const shop = useShopStore((state) => state.shop)
  const balance = client?.client?.balance ?? 0
  const [type, setType] = useState<string>("plus")
  const [isOpenConfirm, setIsOpenConfirm] = useState(false)

  const { mutate: mutatePlus } = useMutation({
    mutationFn: updateClientBonusPlus,
    retry: false,
  })

  const { mutate: mutateMinus } = useMutation({
    mutationFn: updateClientBonusMinus,
    retry: false,
  })

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
  })

  const watchCheckAmount = form.watch("check_amount")
  const watchPointAmount = form.watch("point_amount")

  const calculatePoints = useMemo(() => {
    const regBonus = !client?.client ? loyalProgram.reg_bonus : 0
    if (!watchCheckAmount) {
      return regBonus
    }

    return Math.round(regBonus + (loyalProgram.percent_bonus / 100) * watchCheckAmount)
  }, [watchCheckAmount, loyalProgram, client])

  const handleAllBonus = () => {
    if (!shop) {
      return
    }

    if (!watchCheckAmount) {
      form.setError("point_amount", { message: "Введите сумму чека.", type: "max" })
      return
    }

    const calcMax = calculateMaxPoints(
      client?.client?.balance ?? 0,
      watchCheckAmount,
      shop.loyal_program.max_off_check_percent
    )

    form.setValue("point_amount", calcMax)
  }

  const checkMaxOfPoints = () => {
    if (!shop) {
      return false
    }

    const calcMax = calculateMaxPoints(
      watchPointAmount ?? 0,
      watchCheckAmount ?? 0,
      shop.loyal_program.max_off_check_percent
    )

    if (Big(watchPointAmount ?? 0).gt(calcMax)) {
      form.setError("point_amount", {
        message: `Максимально возможное использование баллов не выше ${shop.loyal_program.max_off_check_percent}% от суммы чека.`,
        type: "max",
      })
      return false
    }
    return true
  }

  const handleOpenConfirm = (open: boolean) => {
    const isOk = checkMaxOfPoints()
    if (isOk) {
      setIsOpenConfirm(open)
    }
  }

  const submitPlus = (data: FormFields) => {
    mutatePlus(
      {
        check_amount: data.check_amount,
        user_id: client.id,
      },
      {
        onSuccess: () => {
          toast.success("Успешно выполнено!")
          onSuccess({
            ...data,
            is_new: client?.client === null,
            is_accrual: true,
            bonus_points: calculatePoints,
            user_id: client.id,
            client_id: client.client?.id ?? 0,
          })
        },
        onError: () => {
          toast.error("Ошибка. Обратитесь в поддержку")
        },
      }
    )
  }

  const submitMinus = (data: FormFields) => {
    mutateMinus(
      {
        check_amount: data.check_amount,
        point_amount: Number(data.point_amount),
        user_id: client.id,
      },
      {
        onSuccess: () => {
          toast.success("Успешно выполнено!")
          onSuccess({
            ...data,
            is_new: client?.client === null,
            is_accrual: true,
            bonus_points: calculatePoints,
            user_id: client.id,
            client_id: client.client?.id ?? 0,
          })
        },
        onError: () => {
          toast.error("Ошибка. Обратитесь в поддержку")
        },
      }
    )
  }

  const onSubmit = (data: FormFields) => {
    const isOk = checkMaxOfPoints()
    if (!isOk) {
      return
    }

    const isAccrual = type === "plus"
    if (isAccrual) {
      submitPlus(data)
    } else {
      submitMinus(data)
    }
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
        <div title="Оплата">
          <Tabs
            defaultValue="plus"
            className="w-full"
            autoFocus={false}
            value={type}
            onValueChange={setType}
          >
            <TabsList className="w-full">
              <TabsTrigger className="w-full" value="minus">
                Списание
              </TabsTrigger>
              <TabsTrigger className="w-full" value="plus">
                Начисление
              </TabsTrigger>
            </TabsList>
            <TabsContent value="minus" autoFocus={false}>
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
                            name="check-amount"
                            autoFocus={false}
                            inputMode="numeric"
                            onAccept={(value) => {
                              field.onChange(Number(value))
                              form.clearErrors("point_amount")
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
                <FormField
                  control={form.control}
                  name="point_amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Количество баллов</FormLabel>
                      <FormControl>
                        <div className="flex h-12 w-full py-2 rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                          <IMaskInput
                            className="flex h-full w-full bg-background px-3 rounded-md focus-visible:outline-none"
                            value={field.value?.toString()}
                            unmask={true}
                            mask={Number}
                            normalizeZeros
                            autofix
                            scale={0}
                            min={1}
                            name="point-amount"
                            autoFocus={false}
                            inputMode="numeric"
                            onAccept={(value) => {
                              field.onChange(Number(value))
                              form.clearErrors("point_amount")
                            }}
                            placeholder="100"
                          />
                          <Button
                            className="flex items-center justify-center py-2 h-full mr-3"
                            type="button"
                            onClick={handleAllBonus}
                            variant="outline"
                            disabled={!balance}
                          >
                            MAX
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                className="w-full h-10 mt-4"
                variant="destructive"
                type="button"
                onClick={() => handleOpenConfirm(true)}
                disabled={
                  !client?.client?.balance ||
                  client?.client?.balance === 0 ||
                  !watchCheckAmount ||
                  watchCheckAmount === 0
                }
              >
                Списать
              </Button>
            </TabsContent>
            <TabsContent value="plus" autoFocus={false}>
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
                    Итого: <span className="text-2xl">{calculatePoints}</span> баллов
                  </span>
                  <span className="text-sm text-slate-500">
                    {loyalProgram.percent_bonus}% от чека
                  </span>
                </div>
              </div>
              <Button
                className="w-full h-10 mt-4"
                disabled={!watchCheckAmount || watchCheckAmount === 0}
                type="button"
                onClick={() => setIsOpenConfirm(true)}
              >
                Начислить
              </Button>
            </TabsContent>
          </Tabs>
        </div>
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
                Клиенту начислится: <b>{calculatePoints}</b>
              </span>
              {type === "minus" && (
                <span>
                  С клиента спишется: <b>{watchPointAmount ?? 0}</b>
                </span>
              )}
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
