import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import "react-advanced-cropper/dist/style.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";

import { updateUser, uploadUserPhoto } from "entities/user/api";
import { useUserStore } from "entities/user/model/store";

import { activeButtonParams } from "shared/config/tg-buttons";
import { BirthdayField } from "shared/ui";
import { InputField } from "shared/ui/input-field";

import { EditImage } from "widgets/edit-image/edit-image";

export const EditUserForm = () => {
  const me = useUserStore((store) => store.me);
  const nonce = useUserStore((store) => store.nonce);
  const setMe = useUserStore((store) => store.setMe);
  const incrementNonce = useUserStore((store) => store.incrementNonce);
  const [newImage, setNewImage] = useState<Blob | null>(null);

  const form = useForm<Partial<User>>({
    defaultValues: {
      first_name: me?.first_name,
      last_name: me?.last_name,
      birthday: me?.birthday
        ? dayjs(me?.birthday, "YYYY.DD.MM").format("DD.MM.YYYY").toString()
        : undefined,
      phone: me?.phone,
      email: me?.email,
    },
  });

  const mutationUser = useMutation({
    mutationFn: updateUser,
  });

  const mutationPhoto = useMutation({
    mutationFn: uploadUserPhoto,
  });

  const onSubmit: SubmitHandler<Partial<User>> = (data) => {
    const formData = new FormData();
    if (newImage) {
      formData.append("photo", newImage);
    }
    mutationUser.mutate(data, {
      onSuccess: () => {
        setMe({
          ...me,
          ...data,
          birthday: dayjs(data.birthday, "DD.MM.YYYY").toString(),
          photo: newImage ? `${me?.id}.webp?nonce=${nonce}` : me?.photo,
        });
        if (newImage) {
          mutationPhoto.mutate(formData, {
            onSuccess: () => {
              incrementNonce();
            },
          });
        }
        toast.success("Cохранено!");
      },
      onError: () => {
        toast.error("Ошибка!");
        console.error("Error", data);
      },
    });
  };

  const submitter = useCallback(() => {
    form.handleSubmit(onSubmit)();
  }, [newImage]);

  useEffect(() => {
    Telegram.WebApp.MainButton.setParams(activeButtonParams("Сохранить"));
    Telegram.WebApp.MainButton.onClick(submitter);

    return () => {
      Telegram.WebApp.MainButton.offClick(submitter);
      Telegram.WebApp.MainButton.hide();
    };
  }, [submitter]);

  return (
    <form className="flex flex-col gap-4 pb-10" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="absolute top-0">
        <Toaster position="top-center" richColors />
      </div>
      <EditImage image={me?.photo} onLoad={(blob) => setNewImage(blob)} />
      <Controller
        name="first_name"
        control={form.control}
        rules={{ required: { message: "Обязательное поле", value: true } }}
        render={({ field, fieldState: { error } }) => (
          <InputField
            placeholder="Богдан"
            value={field.value}
            onChange={field.onChange}
            label="Имя"
            error={error?.message}
          />
        )}
      />
      <Controller
        name="last_name"
        control={form.control}
        render={({ field, fieldState: { error } }) => (
          <InputField
            placeholder="Аксёнов"
            value={field.value}
            onChange={field.onChange}
            label="Фамилия"
            error={error?.message}
          />
        )}
      />
      <Controller
        name="birthday"
        control={form.control}
        rules={{ required: { message: "Обязательное поле", value: true } }}
        render={({ field, fieldState: { error } }) => (
          <BirthdayField
            label="Дата рождения"
            value={field.value}
            onChange={field.onChange}
            error={error?.message}
          />
        )}
      />
      <Controller
        name="phone"
        control={form.control}
        rules={{ required: { message: "Обязательное поле", value: true } }}
        render={({ field, fieldState: { error } }) => (
          <InputField
            placeholder="79886885354"
            value={field.value}
            onChange={field.onChange}
            label="Телефон"
            error={error?.message}
          />
        )}
      />
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState: { error } }) => (
          <InputField
            placeholder="bogdanaks@bk.ru"
            value={field.value}
            onChange={field.onChange}
            label="Почта"
            error={error?.message}
          />
        )}
      />
    </form>
  );
};
