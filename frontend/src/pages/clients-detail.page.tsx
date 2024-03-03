import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { getShopClient } from "entities/shop/api"
import { UserPhoto } from "entities/user/ui"

import { Button } from "shared/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "shared/ui/dialog"
import { Input } from "shared/ui/input"

import { Container } from "widgets/ui/container"
import { Layout } from "widgets/ui/layout"

export const ClientsDetailPage = () => {
  const { id } = useParams()
  const [isOpenBlock, setIsOpenBlock] = useState(false)
  const { data, isLoading } = useQuery({
    queryKey: ["client", id],
    queryFn: () => getShopClient(Number(id)),
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    enabled: !!id,
  })

  const user = data?.data?.user

  return (
    <Layout>
      <Container
        title={`${user?.first_name} ${user?.last_name}`}
        withBack
        className="max-w-[600px]"
        isLoading={isLoading || !data}
      >
        <div className="flex w-full">
          <div className="h-full flex flex-col w-full">
            <div className="flex flex-row gap-10 w-full items-center justify-between">
              <div className="flex flex-col">
                <h1 className="text-2xl">
                  {user?.first_name} {user?.last_name}
                </h1>
                <p className="text-slate-500">+{user?.phone}</p>
              </div>
              <UserPhoto src={user?.photo} />
            </div>
            <div className="flex flex-row gap-8">
              <div className="flex flex-col">
                <span className="font-bold text-2xl text-primary">{data?.data?.balance ?? 0}</span>
                <span className="text-slate-500">баллов</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl text-primary">100</span>
                <span className="text-slate-500">покупок</span>
              </div>
            </div>
            <div className="flex flex-col gap-4 pb-4 mt-20">
              <Dialog>
                <DialogTrigger className="w-full">
                  <Button variant="outline" className="w-full">
                    Редактировать баллы
                  </Button>
                </DialogTrigger>
                <DialogContent className="top-[30%]">
                  <DialogHeader>
                    <DialogTitle>Редактирование баллов</DialogTitle>
                  </DialogHeader>
                  <Input placeholder="Введите количество баллов" type="number" className="mt-4" />
                  <div className="w-full flex flex-row mt-2 gap-4">
                    <Button className="w-full" variant="destructive">
                      Списать
                    </Button>
                    <Button className="w-full" variant="default">
                      Добавить
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="destructive" onClick={() => setIsOpenBlock(true)}>
                Заблокировать
              </Button>
              <Dialog open={isOpenBlock} onOpenChange={() => setIsOpenBlock(false)}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Вы уверены, что хотите заблокировать клиента?</DialogTitle>
                    <DialogDescription>
                      <p>
                        После блокировки, клиент останется в списке, но будет помечен как
                        заблокированный.
                      </p>
                      <p>Клиенту нельзя будет назначать баллы.</p>
                    </DialogDescription>
                  </DialogHeader>
                  <Button className="mt-4" variant="destructive">
                    Заблокировать
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  )
}
