import { useState } from "react";

import { UserPhoto } from "entities/user/ui";

import LockIcon from "shared/assets/icons/lock.svg?react";
import { Button } from "shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "shared/ui/dialog";
import { DropdownMenuContent, DropdownMenuItem } from "shared/ui/dropdown-menu";
import { Input } from "shared/ui/input";

import { Container } from "widgets/ui";
import { AnimationContainer } from "widgets/ui/animation-container";

export const ClientDetailPage = () => {
  const [isOpenBlock, setIsOpenBlock] = useState(false);
  return (
    <AnimationContainer>
      <Container
        header={{
          title: "Клиент",
          withBack: true,
          moreMenu: (
            <DropdownMenuContent className="mr-4">
              <DropdownMenuItem onClick={() => setIsOpenBlock(true)}>
                <LockIcon width={18} height={18} className="mr-2" />
                Заблокировать
              </DropdownMenuItem>
            </DropdownMenuContent>
          ),
        }}
      >
        <div className="h-full flex flex-col">
          <div className="flex flex-row items-center justify-between">
            <div>
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
          <div className="flex flex-col gap-4 mt-auto pb-4">
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
      </Container>
    </AnimationContainer>
  );
};
