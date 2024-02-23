import { useForm } from "react-hook-form"

import { Button } from "shared/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "shared/ui/form"

import { EditBanner } from "widgets/edit-image/edit-banner"
import { EditImage } from "widgets/edit-image/edit-image"

export const BusinessSettingsPhotos = () => {
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
              <FormLabel>Фото</FormLabel>
              <FormControl>
                <EditImage image={field.value} onLoad={(img) => field.onChange(img)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Баннеры</FormLabel>
              <FormControl>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row gap-4 w-full">
                    <EditBanner image={field.value} onLoad={(img) => field.onChange(img)} />
                    <EditBanner image={field.value} onLoad={(img) => field.onChange(img)} />
                  </div>
                  <div className="flex flex-row gap-4 w-full">
                    <EditBanner image={field.value} onLoad={(img) => field.onChange(img)} />
                    <EditBanner image={field.value} onLoad={(img) => field.onChange(img)} />
                  </div>
                </div>
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
