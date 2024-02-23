import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { getShopTypes } from "entities/shop/api";
import { ShopItem, ShopsGroup } from "entities/shop/ui";

import { Tabs } from "shared/ui";

export const ShopList = () => {
  const { data } = useQuery({
    queryKey: ["shop-types"],
    queryFn: getShopTypes,
  });

  const [activeTab, setActiveTab] = useState("rest_cafe");
  const handleTabClick = (key: string) => {
    setActiveTab(key);
  };

  const tabItems = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.data.map((i) => ({ key: i.title, value: i.title }));
  }, [data]);

  return (
    <ul
      style={{
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      <Tabs items={tabItems} activeKey={activeTab} onClick={handleTabClick} />
      <div className="mt-5">
        <ShopsGroup title="Рестораны и кафе">
          <ShopItem id={1} />
          <ShopItem id={1} />
        </ShopsGroup>
        <ShopsGroup title="Рестораны и кафе">
          <ShopItem id={1} />
          <ShopItem id={1} />
        </ShopsGroup>
        <ShopsGroup title="Рестораны и кафе">
          <ShopItem id={1} />
          <ShopItem id={1} />
        </ShopsGroup>
        <ShopsGroup title="Рестораны и кафе">
          <ShopItem id={1} />
          <ShopItem id={1} />
        </ShopsGroup>
        <ShopsGroup title="Рестораны и кафе">
          <ShopItem id={1} />
          <ShopItem id={1} />
        </ShopsGroup>
        <ShopsGroup title="Рестораны и кафе">
          <ShopItem id={1} />
          <ShopItem id={1} />
        </ShopsGroup>
      </div>
    </ul>
  );
};
