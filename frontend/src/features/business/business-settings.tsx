import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

import { getMyShop } from "entities/shop/api"
import { useShopStore } from "entities/shop/model/store"

import { Button } from "shared/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "shared/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "shared/ui/tabs"

import { BusinessSettingsContacts } from "./business-contacts"
import { BusinessSettingsData } from "./business-data"
import { BusinessSettingsPhotos } from "./business-photos"
import { BusinessSettingsWorkingHours } from "./business-working-hours"

export const BusinessSettings = () => {
  const shop = useShopStore((state) => state.shop)
  const setShop = useShopStore((state) => state.setShop)
  const { data } = useQuery({
    queryKey: ["my-shop"],
    queryFn: getMyShop,
    retry: 1,
  })

  useEffect(() => {
    if (!data) {
      return
    }

    setShop(data.data)
  }, [data])

  if (!shop) {
    return null
  }

  return (
    <div className="p-4">
      <div className="bg-background p-5 rounded-3xl flex">
        <Tabs
          defaultValue="data"
          orientation="horizontal"
          className="flex flex-row gap-6 w-full min-h-[600px]"
        >
          <TabsList className="flex-col gap-5 pb-0 bg-background border-r-2 border-muted pr-6 rounded-none h-full justify-start items-start">
            <TabsTrigger
              value="data"
              className="data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:shadow-none"
            >
              Данные
            </TabsTrigger>
            <TabsTrigger
              value="working_hours"
              className="data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:shadow-none"
            >
              График работы
            </TabsTrigger>
            <TabsTrigger
              value="photo"
              className="data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:shadow-none"
            >
              Фотографии
            </TabsTrigger>
            <TabsTrigger
              value="contacts"
              className="data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:shadow-none"
            >
              Контакная информация
            </TabsTrigger>
            <Sheet>
              <SheetTrigger className="mt-auto">
                <Button type="button" variant="outline">
                  Предпросмотр магазина
                </Button>
              </SheetTrigger>
              <SheetContent className="sm:max-w-md max-[500px]:w-[100vw] px-0">
                <SheetHeader className="px-5">
                  <SheetTitle>Предпросмотр магазина</SheetTitle>
                </SheetHeader>
                <div className="mt-6 h-full bg-red-200">Карточка магазина</div>
              </SheetContent>
            </Sheet>
          </TabsList>
          <TabsContent value="data" className="mt-0 w-full">
            <BusinessSettingsData shop={shop} />
          </TabsContent>
          <TabsContent value="working_hours" className="mt-0 w-full">
            <BusinessSettingsWorkingHours shop={shop} />
          </TabsContent>
          <TabsContent value="photo" className="mt-0 w-full">
            <BusinessSettingsPhotos shop={shop} />
          </TabsContent>
          <TabsContent value="contacts" className="mt-0 w-full">
            <BusinessSettingsContacts shop={shop} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
