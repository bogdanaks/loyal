import { FlashList } from "@shopify/flash-list"
import { useQuery } from "@tanstack/react-query"
import { Link } from "expo-router"
import React from "react"
import { Pressable } from "react-native"

import { getMyShopsByType } from "entities/shop/api"
import { ShopCard } from "entities/shop/ui"

import { Loader } from "./ui/loader"
import { NoData } from "./ui/no-data"

interface Props {
  shopTypeId: number
  activeIndex: number
  route: {
    index: number
    key: string
    title: string
  }
}

export const ShopsList = ({ shopTypeId, activeIndex, route }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["shops", shopTypeId],
    queryFn: () => getMyShopsByType(shopTypeId),
    retry: 1,
    enabled: activeIndex === route.index,
  })

  if (isLoading) {
    return <Loader />
  }

  if (!data?.data.length) {
    return <NoData />
  }

  return (
    <FlashList
      renderItem={({ item, index }) => {
        return (
          <Link
            href={{
              pathname: "/shop-detail",
              params: { shop: JSON.stringify(item) },
            }}
            asChild
          >
            <Pressable style={{ marginTop: index === 0 ? 16 : 0 }}>
              <ShopCard shopClient={item} />
            </Pressable>
          </Link>
        )
      }}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      estimatedItemSize={50}
      data={data?.data}
    />
  )
}
