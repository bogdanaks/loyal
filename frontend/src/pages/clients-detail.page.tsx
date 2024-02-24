import { ChevronLeft } from "lucide-react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

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

import { Layout } from "widgets/ui/layout"

export const ClientsDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isOpenBlock, setIsOpenBlock] = useState(false)

  return (
    <Layout>
      <div className="min-h-12 px-4 flex flex-row items-center">
        <ChevronLeft size={34} className="text-black cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="flex items-center text-3xl font-bold ml-4">Богдан А.</h1>
      </div>
      <div className="p-4 flex overflow-hidden">
        <div className="bg-background p-5 rounded-3xl flex w-full max-w-[600px]">
          <div className="h-full flex flex-col w-full">
            <div className="flex flex-row gap-10 w-full items-center justify-between">
              <div className="flex flex-col">
                <h1 className="text-2xl">Богдан Аксёнов</h1>
                <p className="text-slate-500">+7 (926) 777-77-77</p>
              </div>
              <UserPhoto />
            </div>
            <div className="flex flex-row gap-8">
              <div className="flex flex-col">
                <span className="font-bold text-2xl text-primary">100</span>
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
      </div>
    </Layout>
  )
}
