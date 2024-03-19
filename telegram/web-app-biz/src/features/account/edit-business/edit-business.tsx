import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { getMyShop, getShopTypes, updateMyShop } from "entities/shop/api";

import { Button } from "shared/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "shared/ui/form";
import { Input } from "shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "shared/ui/select";
import { Textarea } from "shared/ui/textarea";

import { EditBanner } from "widgets/edit-image/edit-banner";
import { EditImage } from "widgets/edit-image/edit-image";
import { GridGroup } from "widgets/ui";

import { EditWorkingHours } from "./ui/edit-working-hours";

const workStatuses = [
  {
    id: 0,
    title: "Работает",
  },
  {
    id: 1,
    title: "Больше не работает",
  },
  {
    id: 2,
    title: "Временно не работает",
  },
];

const workDaySchema = z.object({
  opening_time: z.string(),
  closing_time: z.string(),
  breaks_time_from: z.string(),
  breaks_time_to: z.string(),
});

const workDaySchemaWithDays = z.object({
  days: z.string().array(),
  opening_time: z.string(),
  closing_time: z.string(),
  breaks_time_from: z.string(),
  breaks_time_to: z.string(),
});

const formSchema = z.object({
  title: z
    .string({ required_error: "Обязательное поле." })
    .min(3, { message: "Минимум 3 символа." })
    .max(25, { message: "Максимум 25 символов." }),
  short_description: z.string().max(40, { message: "Максимум 40 символов." }),
  description: z.string().max(100, { message: "Максимум 100 символов." }),
  type_id: z.number({ required_error: "Обязательное поле." }),
  status: z.literal(0).or(z.literal(1)).or(z.literal(2)),
  working_hours: z.object(
    {
      common: workDaySchemaWithDays,
      by_days: z.record(workDaySchema),
    },
    {
      required_error: "Обязательное настройте график.",
      invalid_type_error: "Обязательное настройте график.",
    }
  ),
  photo: z.any(),
  banners: z.array(z.any()),
});

type FormFields = z.infer<typeof formSchema>;

export const EditBusiness = () => {
  const { data } = useQuery({
    queryKey: ["shop-types"],
    queryFn: getShopTypes,
    retry: 3,
  });
  const { data: shop } = useQuery({
    queryKey: ["shop"],
    queryFn: getMyShop,
    retry: false,
  });
  const mutation = useMutation({
    mutationFn: updateMyShop,
  });

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (shop) {
      form.reset({
        title: shop?.data?.title,
        type_id: shop?.data?.type_id,
        description: shop?.data?.description ?? "",
        short_description: shop?.data?.short_description ?? "",
        status: shop?.data?.status,
        photo: shop?.data?.photo,
        banners: shop?.data?.banners ?? [],
        working_hours: shop?.data?.working_hours,
      });
    }
  }, [shop]);

  const handleBannerChange = (value: Blob, index: number, prevName: string | null) => {
    form.setValue(`banners.${index}`, { file: value, name: prevName });
  };

  const onSubmit = (data: FormFields) => {
    const formData = new FormData();
    formData.append("photo", data.photo);
    for (const banner of data.banners) {
      if (!banner) {
        continue;
      }

      if (banner.name) {
        formData.append("banners", banner.file, banner.name);
      } else {
        if (typeof banner === "string") {
          formData.append("banners", banner);
        }
        formData.append("banners", banner.file);
      }
    }
    formData.append("data", JSON.stringify(data));
    mutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Сохранено!");
      },
      onError: () => {
        toast.error("Ошибка. Обратитесь в поддержку");
      },
    });
  };

  if (!shop) {
    return null;
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4 pb-4" onSubmit={form.handleSubmit(onSubmit)}>
        <GridGroup title="Данные">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название</FormLabel>
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
                <FormLabel>Тип</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field?.value?.toString()}
                    value={field?.value?.toString()}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={field.value?.toString()} />
                    </SelectTrigger>
                    <SelectContent>
                      {data?.data.map((type) => (
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
            name="short_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Короткое описание</FormLabel>
                <FormControl>
                  <Textarea placeholder="Короткое описание" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Полное описание</FormLabel>
                <FormControl>
                  <Textarea placeholder="Полное описание" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </GridGroup>
        <GridGroup title="Режим работы">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Текущий статус</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field?.value?.toString()}
                    value={field?.value?.toString()}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={field.value?.toString()} />
                    </SelectTrigger>
                    <SelectContent>
                      {workStatuses.map((status) => (
                        <SelectItem key={status.id.toString()} value={status.id.toString()}>
                          {status.title}
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
            name="working_hours"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>Время работы</FormLabel>
                <FormControl>
                  <EditWorkingHours value={field.value} onSave={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </GridGroup>
        <GridGroup title="Фотографии" desc="Добавьте фото и баннеры вашей компании">
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Фото</FormLabel>
                <FormControl>
                  <EditImage
                    shopId={shop.data.id}
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Баннеры</FormLabel>
                <FormControl>
                  <ul className="flex flex-row gap-3 overflow-x-auto">
                    <EditBanner
                      shopId={shop.data.id}
                      image={field.value?.[0] ?? ""}
                      onLoad={(img) => {
                        handleBannerChange(img, 0, field.value?.[0] ?? null);
                      }}
                    />
                    <EditBanner
                      shopId={shop.data.id}
                      image={field.value?.[1] ?? ""}
                      onLoad={(img) => {
                        handleBannerChange(img, 1, field.value?.[1] ?? null);
                      }}
                    />
                    <EditBanner
                      shopId={shop.data.id}
                      image={field.value?.[2] ?? ""}
                      onLoad={(img) => {
                        handleBannerChange(img, 2, field.value?.[2] ?? null);
                      }}
                    />
                    <EditBanner
                      shopId={shop.data.id}
                      image={field.value?.[3] ?? ""}
                      onLoad={(img) => {
                        handleBannerChange(img, 3, field.value?.[3] ?? null);
                      }}
                    />
                  </ul>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </GridGroup>
        <GridGroup title="Доп. информация">
          <p>Контакты</p>
          <p>Адрес</p>
          <p>Сайт</p>
        </GridGroup>
        <Button type="submit">Сохранить</Button>
        <Button type="button" variant="outline">
          Посмотреть карточку заведения
        </Button>
      </form>
    </Form>
  );
};
