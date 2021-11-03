import React, { useCallback } from "react";
import { formatMoney, setCost } from "@/utils";
import { ITEM_ACCOUNT, ITEM_MONEY, ITEM_WEAPON } from "@/utils/constant";

export const useRenderCount = (item, itemInventory) => {
  const renderCount = () => {
    let cost = "";
    if (itemInventory === "shop") {
      cost = setCost(item);
    }
    let count = item.count;

    switch (item.type) {
      case ITEM_WEAPON:
        if (count === 0) return;
        return (
          <>
            <img
              style={{ width: "10px" }}
              src={`/build/static/media/bullet.png`}
            />
            <span>{item.count}</span>
          </>
        );

      case ITEM_ACCOUNT:
      case ITEM_MONEY:
        return <>{formatMoney(item.count)}$</>;
    }

    return <>{itemInventory === "shop" ? cost : count}</>;
  };

  return {
    renderCount,
  };
};
