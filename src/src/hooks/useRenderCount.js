import React from "react";
import { formatMoney } from "@/utils";
import { ITEM_ACCOUNT, ITEM_MONEY, ITEM_WEAPON } from "@/utils/constant";

export const useRenderCount = (item) => {
  const renderCount = () => {
    let count = item.count;

    switch (item.type) {
      case ITEM_WEAPON:
        if (count === 0) return;
        return (
          <>
            <img
              style={{ width: "10px" }}
              src={require("@/assets/images/bullet.png")}
            />
            <span>{item.count}</span>
          </>
        );

      case ITEM_ACCOUNT:
      case ITEM_MONEY:
        return <>{formatMoney(item.count)}$</>;
    }

    return <>{count}</>;
  };

  return {
    renderCount,
  };
};
