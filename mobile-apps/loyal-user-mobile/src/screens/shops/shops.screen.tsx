import { useNavigation } from "@react-navigation/native"
import { useQuery } from "@tanstack/react-query"
import { StatusBar } from "expo-status-bar"
import { useMemo, useState } from "react"
import {
  Animated,
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  useWindowDimensions,
} from "react-native"
import { SceneRendererProps, TabBar, TabView } from "react-native-tab-view"
import { Layout } from "react-native-tab-view/lib/typescript/src/types"

import { StackNavigation } from "app/export-type"

import { getMyShopsByType, getShopTypes } from "entities/shop/api"
import { ShopCard } from "entities/shop/ui"

import { useMyTheme } from "shared/hooks/use-my-theme"

import { EmptyData } from "widgets/ui"
import { LoadingWrapper } from "widgets/ui/loading-wrapper"
import { ScreenContainer } from "widgets/ui/screen-container"

type ShopListProps = {
  jumpTo: (key: string) => void
  layout: Layout
  position: Animated.AnimatedInterpolation<number>
  activeIndex: number
} & {
  route: {
    index: number
    key: string
    title: string
  }
}

const ShopList = ({ route, activeIndex }: ShopListProps) => {
  const { colors } = useMyTheme()
  const navigation = useNavigation<StackNavigation>()
  const { data, isLoading } = useQuery({
    queryKey: ["shops", route.key],
    queryFn: () => getMyShopsByType(Number(route.key)),
    retry: 1,
    enabled: activeIndex === route.index,
  })

  const handlePressShop = (shop: ShopClient) => {
    navigation.navigate("ShopsDetail", { shop })
  }

  return (
    <ScreenContainer style={{ paddingHorizontal: 0 }}>
      <StatusBar style="dark" backgroundColor={colors.background} />
      <LoadingWrapper isLoading={isLoading}>
        {data?.data.length ? (
          <FlatList
            data={data?.data ?? []}
            showsVerticalScrollIndicator={false}
            style={{ paddingHorizontal: 16 }}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => handlePressShop(item)}
                style={{ marginTop: index === 0 ? 16 : 0 }}
              >
                <ShopCard shopClient={item} />
              </Pressable>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <EmptyData />
        )}
      </LoadingWrapper>
    </ScreenContainer>
  )
}

export const ShopsScreen = () => {
  const { colors } = useMyTheme()
  const layout = useWindowDimensions()
  const [index, setIndex] = useState(0)
  const { data, isLoading: isLoadingGetShopTypes } = useQuery({
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
    return <ShopList {...props} activeIndex={index} />
  }

  const isLoading = isLoadingGetShopTypes || !tabRoutes.length

  return (
    <SafeAreaView style={{ flex: 1, padding: 0, backgroundColor: "#fff" }}>
      <LoadingWrapper isLoading={isLoading}>
        <TabView
          renderTabBar={(props) => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: colors.primary }}
              style={{ backgroundColor: "#fff", paddingVertical: 0, height: 44 }}
              inactiveColor={colors.mutedForeground}
              activeColor="#000"
              scrollEnabled
              tabStyle={{ width: "auto" }}
              renderLabel={(propsLabel) => <Text>{propsLabel.route.title}</Text>}
              labelStyle={{ fontSize: 14, fontWeight: "500" }}
            />
          )}
          navigationState={{ index, routes: tabRoutes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </LoadingWrapper>
    </SafeAreaView>
  )
}
