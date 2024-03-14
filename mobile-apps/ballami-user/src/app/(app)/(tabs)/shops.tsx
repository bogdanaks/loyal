import { useQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { SceneRendererProps, TabBar, TabView } from "react-native-tab-view"

import { getShopTypes } from "entities/shop/api"

import { theme } from "shared/config/theme"

import { ShopsList } from "widgets/shops-list"
import { Loader } from "widgets/ui/loader"

export default function ShopsPage() {
  const [index, setIndex] = useState(0)
  const { data, isLoading } = useQuery({
    queryKey: ["shop-types"],
    queryFn: getShopTypes,
    retry: 1,
  })

  const tabRoutes = useMemo(() => {
    if (!data) {
      return []
    }

    return data.data.map((item, index) => ({
      index,
      key: item.id.toString(),
      title: item.title,
    }))
  }, [data])

  const renderScene = (
    props: SceneRendererProps & {
      route: {
        index: number
        key: string
        title: string
      }
    }
  ) => {
    return <ShopsList {...props} activeIndex={index} shopTypeId={Number(props.route.key)} />
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <SafeAreaView
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <TabView
        navigationState={{ index, routes: tabRoutes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: theme.primary }}
            style={{ backgroundColor: "#fff", paddingVertical: 0, height: 44 }}
            inactiveColor={theme.mutedForeground}
            activeColor="#000"
            scrollEnabled
            tabStyle={{ width: "auto" }}
            renderLabel={(propsLabel) => <Text>{propsLabel.route.title}</Text>}
            labelStyle={{ fontSize: 14, fontWeight: "500" }}
          />
        )}
      />
    </SafeAreaView>
  )
}
