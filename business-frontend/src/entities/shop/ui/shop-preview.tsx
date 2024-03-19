import { Info } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Drawer } from "vaul"

import CartIcon from "shared/assets/icons/cart.svg?react"
import { config } from "shared/config"

import { ShopBigAvatar, ShopBonusBadge, ShopWorkTimeDrawer } from "."
import { useShopStore } from "../model/store"

export const ShopPreview = () => {
  const shop = useShopStore((state) => state.shop)
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  if (!shop) {
    return null
  }

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth)
    }
  }, [containerRef])

  return (
    <Drawer.Root>
      <div
        className="w-full h-full flex flex-col py-4 bg-muted grow relative overflow-y-auto"
        ref={containerRef}
      >
        <div className="flex flex-row items-center justify-between px-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-4xl">{shop.title}</h3>
            <ShopBonusBadge icon={<CartIcon />} text={`от ${shop.loyal_program.percent_bonus}%`} />
          </div>
          <div className="flex items-center justify-end flex-col">
            <h3 className="text-4xl">500</h3>
            <span>баллов</span>
          </div>
        </div>

        <div className="bg-background flex flex-col grow h-full px-4 rounded-t-[40px] mt-[30%] pt-[90px] pb-8 relative">
          <div className="absolute -top-[90px] rounded-full overflow-hidden left-[calc(50%-90px)]">
            <ShopBigAvatar src={`${config.apiDomain}/static/shops/${shop.id}/${shop.photo}`} />
          </div>

          <h3 className="flex items-center justify-center mt-2 text-muted-foreground text-sm">
            [{shop.type.title}]
          </h3>

          <div className="flex flex-col mt-6">
            <div className="flex flex-row items-center gap-2">
              <span>Режим работы</span>
              <Drawer.Trigger>
                <button className="flex items-center justify-center">
                  <Info size={20} />
                </button>
              </Drawer.Trigger>
            </div>
            <div className="flex flex-row items-center justify-between">
              <span className="text-[50px] leading-[50px]">9:00</span>
              <span className="h-[3px] w-[10%] rounded-xl bg-black" />
              <span className="text-[50px] leading-[50px]">22:00</span>
            </div>
          </div>

          <div className="mt-6 flex flex-row overflow-x-auto gap-2">
            {Object.entries(shop.banners).map(([, src], index) => (
              <div
                key={index}
                style={{
                  height: containerWidth / 2 / 1.78,
                  minWidth: containerWidth / 2,
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <img
                  src={`${config.apiDomain}/static/shops/${shop.id}/${src}`}
                  className="w-full h-full"
                />
              </div>
            ))}
          </div>
          {shop.description && (
            <div className="mt-4 flex flex-col gap-2">
              <h3 className="font-medium">Описание</h3>
              <span className="text-muted-foreground text-sm">{shop.description}</span>
            </div>
          )}
          {shop.phone && (
            <div className="mt-4 flex flex-col gap-2">
              <h3 className="font-medium">Номер телефона</h3>
              <span className="text-muted-foreground text-sm">{shop.phone}</span>
            </div>
          )}
          {shop.address && (
            <div className="mt-4 flex flex-col gap-2">
              <h3 className="font-medium">Адрес</h3>
              <span className="text-muted-foreground text-sm">{shop.address}</span>
            </div>
          )}
        </div>

        <Drawer.Portal container={containerRef.current}>
          <Drawer.Content className="sticky w-full bg-background bottom-0">
            <div className="bg-[#181818] h-[8px] w-[80px] rounded-lg my-5 mb-3 mx-auto" />
            <ShopWorkTimeDrawer />
          </Drawer.Content>
        </Drawer.Portal>
      </div>
    </Drawer.Root>
  )
}
