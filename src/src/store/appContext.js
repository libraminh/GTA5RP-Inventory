import React, { useState } from "react";

export const AppContext = React.createContext(null);

const initStore = {
  quantity: 0,
  inventory: {
    isInventoryShow: true,
    isOtherInventoryShow: true,
    isFastInventoryShow: true,
    isWeightShow: false,
    type: "normal",
    disabled: false,
    disabledFunction: null,
    ownerHouse: null,
    coisas: [],
    itemData: [],
    inventoryItems: null,
    otherInventoryItems: null,
  },
};

const StoreWrapper = ({ children }) => {
  const [store, setStore] = useState(initStore);
  const [actions, setActions] = useState({
    updateQuantity: (inputNumber) => {
      setStore({ ...store, quantity: inputNumber });
    },
    showWeightDiv: () => {
      setStore({
        ...store,
        inventory: {
          ...store.inventory,
          isWeightShow: true,
        },
      });
    },
    hideWeightDiv: () => {
      setStore({
        ...store,
        inventory: {
          ...store.inventory,
          isWeightShow: false,
        },
      });
    },
    showPlayerInventory: () => {
      setStore({
        ...store,
        inventory: {
          ...store.inventory,
          isInventoryShow: true,
        },
      });
    },
    hidePlayerInventory: () => {
      setStore({
        ...store,
        inventory: {
          ...store.inventory,
          isInventoryShow: false,
        },
      });
    },
    showOtherInventory: () => {
      setStore({
        ...store,
        inventory: {
          ...store.inventory,
          isOtherInventoryShow: true,
        },
      });
    },
    hideOtherInventory: () => {
      setStore({
        ...store,
        inventory: {
          ...store.inventory,
          isOtherInventoryShow: false,
        },
      });
    },
    toggleWeightDiv: () => {
      setStore({
        ...store,
        inventory: {
          ...store.inventory,
          isWeightShow: !store.inventory.isWeightShow,
        },
      });
    },
    setInventoryItems: (items) => {
      setStore({
        ...store,
        inventory: {
          ...store.inventory,
          inventoryItems: items,
        },
      });
    },
    setOtherInventoryItems: (items) => {
      setStore({
        ...store,
        inventory: {
          ...store.inventory,
          otherInventoryItems: items,
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
