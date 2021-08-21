import React, { useState } from "react";

export const AppContext = React.createContext(null);

const initStore = {
  quantity: 0,
  inventory: {
    isInventoryShow: true,
    isOtherInventoryShow: false,
    isFastInventoryShow: true,
    type: "normal",
    disabled: false,
    disabledFunction: null,
    ownerHouse: null,
    coisas: [],
    itemData: [],
  },
};

const StoreWrapper = ({ children }) => {
  const [store, setStore] = useState(initStore);
  const [actions, setActions] = useState({
    updateQuantity: (inputNumber) => {
      setStore({ ...store, quantity: inputNumber });
    },
    toggleOtherInventory: () => {
      setStore({
        ...store,
        inventory: {
          ...store.inventory,
          isOtherInventoryShow: !store.inventory.isOtherInventoryShow,
        },
      });
    },
  });

  return (
    <AppContext.Provider value={{ store, actions }}>
      {children}
    </AppContext.Provider>
  );
};

export default StoreWrapper;
