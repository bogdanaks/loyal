import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { Smartphone } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { IMaskInput } from "react-imask"
import { toast } from "sonner"
import * as z from "zod"

import { checkPhone } from "entities/shop/api"

import { Button } from "shared/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "shared/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "shared/ui/form"

const formSchema = z.object({
  phone: z.string({ required_error: "Обязательное поле." }).min(10, { message: "Неверный формат" }),
})
type FormFields = z.infer<typeof formSchema>

interface Props {
  onSuccess: (client: UserAsClient) => void
}

export const ScanningByPhone = ({ onSuccess }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: undefined,
    },
  })
  const watchPhone = form.watch("phone")

  const { error, data, refetch, isLoading } = useQuery({
    queryKey: ["check-phone"],
    queryFn: () => checkPhone(`7${watchPhone}`),
    retry: false,
    enabled: false,
  })

  const onSubmit = () => {
    refetch({ cancelRefetch: true })
  }

  useEffect(() => {
    if (error) {
      toast.error("Ошибка сканирования: Клиент не найден")
    }
  }, [error])

  useEffect(() => {
    if (data) {
      setIsOpen(false)
      form.reset()
      form.clearErrors()
      onSuccess(data.data)
    }
  }, [data])

  useEffect(() => {
    return () => {
      form.clearErrors()
      form.reset()
    }
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="w-full flex items-center justify-center">
        <Button type="button" variant="outline" className="flex w-[85%] rounded-3xl">
          <Smartphone className="mr-4" />
          Ввести номер
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Поиск по номеру</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Номер телефона</FormLabel>
                <FormControl>
                  <IMaskInput
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    mask="+7 (000) 000-00-00"
                    value={field.value}
                    unmask={true}
                    name="phone"
                    inputMode="numeric"
                    onAccept={(value) => {
                      field.onChange(value)
                    }}
                    placeholder="+7 (000) 000-00-00"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="button" onClick={() => form.handleSubmit(onSubmit)()} disabled={isLoading}>
            Поиск
          </Button>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
