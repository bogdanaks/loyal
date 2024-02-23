import { useForm } from "react-hook-form"

import { Button } from "shared/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "shared/ui/form"
import { Input } from "shared/ui/input"

export const BusinessSettingsContacts = () => {
  const form = useForm<BusinessSettingsFormFields>({
    // resolver: zodResolver(formSchema),
  })

  return (
    <Form {...form}>
      <div className="flex flex-col w-full gap-3 h-full">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Номер телефона</FormLabel>
              <FormControl>
                <Input placeholder="Название" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Адрес</FormLabel>
              <FormControl>
                <Input placeholder="Название" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Соц. сеть</FormLabel>
              <FormControl>
                <Input placeholder="Название" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-fit mt-auto">
          Сохранить
        </Button>
      </div>
    </Form>
  )
}
