import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { deleteShopPhoto, uploadShopPhoto } from "entities/shop/api"
import { useShopStore } from "entities/shop/model/store"

import { Button } from "shared/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "shared/ui/form"

import { EditBanner } from "widgets/edit-image/edit-banner"
import { EditImage } from "widgets/edit-image/edit-image"

const formSchema = z.object({
  photo: z.any(),
  banners: z.any(),
})

type FormFields = z.infer<typeof formSchema>

interface Props {
  shop: Shop
}

export const BusinessSettingsPhotos = ({ shop }: Props) => {
  const setShop = useShopStore((state) => state.setShop)

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      photo: shop.photo ?? "",
      banners: shop.banners ?? {},
    },
  })
  const { mutate } = useMutation<BaseResponse<Shop>, ResponseError, FormData, unknown>({
    mutationFn: uploadShopPhoto,
  })
  const { mutate: mutateDelete } = useMutation<BaseResponse<Shop>, ResponseError, string, unknown>({
    mutationFn: deleteShopPhoto,
    retry: false,
  })

  useEffect(() => {
    if (shop) {
      form.reset({
        photo: shop?.photo ?? "",
        banners: shop?.banners ?? {},
      })
    }
  }, [shop])

  const handleBannerChange = (value: Blob, index: number, prevName: string | null) => {
    form.setValue(`banners.${index}`, { file: value, name: prevName })
  }

  const onSubmit = (data: FormFields) => {
    const formData = new FormData()
    formData.append("photo", data.photo)

    console.log(data.banners)
    for (const [keyIndex, banner] of Object.entries(data.banners)) {
      if (!banner) {
        continue
      }

      const bFile = banner as { file: Blob; name: string } | string
      if (typeof banner === "string") {
        continue
      }

      const bFileBlob = bFile as { file: Blob; name: string }
      const query = new URLSearchParams({ index: keyIndex, name: bFileBlob.name })
      formData.append("banners", bFileBlob.file, query.toString())
    }

    mutate(formData, {
      onSuccess: (response) => {
        toast.success("Успешно сохранено!")
        setShop({ ...shop, photo: response.data.photo, banners: response.data.banners })
      },
      onError: () => {
        toast.error("Ошибка. Обратитесь в поддержку")
      },
    })
  }

  const onDelete = (id: string) => {
    mutateDelete(id, {
      onSuccess: () => {
        toast.success("Успешно удалено!")
        const findIndex = Object.keys(shop.banners).find((key) => shop.banners[key] === id)
        const copyShop = JSON.parse(JSON.stringify(shop))

        if (findIndex) {
          delete copyShop.banners[findIndex]
        }
        setShop(copyShop)
      },
      onError: () => {
        toast.error("Ошибка. Обратитесь в поддержку")
      },
    })
  }

  const watchBanners = form.watch("banners")

  return (
    <Form {...form}>
      <form className="flex flex-col w-full gap-3 h-full" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Фото</FormLabel>
              <FormControl>
                <EditImage
                  shopId={shop.id}
                  image={field.value}
                  onLoad={(img) => field.onChange(img)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="banners"
          render={() => (
            <FormItem>
              <FormLabel>Баннеры</FormLabel>
              <FormControl>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row gap-4 w-full">
                    <EditBanner
                      shopId={shop.id}
                      image={watchBanners[0] ?? ""}
                      onLoad={(img) => handleBannerChange(img, 0, watchBanners?.[0] ?? null)}
                      onRemove={() => {
                        onDelete(watchBanners?.[0])
                        form.setValue(`banners.${0}`, null)
                      }}
                    />
                    <EditBanner
                      shopId={shop.id}
                      image={watchBanners[1] ?? ""}
                      onLoad={(img) => handleBannerChange(img, 1, watchBanners?.[1] ?? null)}
                      onRemove={() => {
                        onDelete(watchBanners?.[1])
                        form.setValue(`banners.${1}`, null)
                      }}
                    />
                  </div>
                  <div className="flex flex-row gap-4 w-full">
                    <EditBanner
                      shopId={shop.id}
                      image={watchBanners[2] ?? ""}
                      onLoad={(img) => handleBannerChange(img, 2, watchBanners?.[2] ?? null)}
                      onRemove={() => {
                        onDelete(watchBanners?.[2])
                        form.setValue(`banners.${2}`, null)
                      }}
                    />
                    <EditBanner
                      shopId={shop.id}
                      image={watchBanners[3] ?? ""}
                      onLoad={(img) => handleBannerChange(img, 3, watchBanners?.[3] ?? null)}
                      onRemove={() => {
                        onDelete(watchBanners?.[3])
                        form.setValue(`banners.${3}`, null)
                      }}
                    />
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
      </form>
    </Form>
  )
}
