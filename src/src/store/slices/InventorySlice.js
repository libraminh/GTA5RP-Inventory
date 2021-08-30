import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

const nearPlayers = [
  {
    player: 197,
    idcard: 3,
  },
  {
    player: 1927,
    idcard: 2,
  },
  {
    player: 17,
    idcard: 1,
  },
  {
    player: 1,
    idcard: 3908,
  },
  {
    player: 197,
    idcard: 3,
  },
  {
    player: 1927,
    idcard: 2,
  },
  {
    player: 17,
    idcard: 1,
  },
  {
    player: 1,
    idcard: 3908,
  },
];

let initState = {
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
  infoDivText: "Kho Khác",
  nearPlayers, // nearPlayers
  dataItem: null,
  isNearPlayersShow: false,

  otherInventory: [],
  fastItems: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  quantity: 0,
  notificationData: {
    itemname: "bread",
    itemlabel: "Bánh Mì",
    itemcount: 3,
    itemremove: true,
  },
};

const InventorySlice = createSlice({
  name: "inventory",
  initialState: initState,
  reducers: {
    toggleNearPlayers: (state, action) => {
      state.isNearPlayersShow = !state.isNearPlayersShow;
    },
    setOtherItems: (state, action) => {
      state.otherInventory = [...state.otherInventory, action.payload];
    },
    setFastItems: (state, action) => {
      if (action.payload.slot >= 0) {
        state.fastItems[action.payload.slot] = action.payload.item;
      } else {
        let shouldSkip = false;

        state.fastItems = state.fastItems.map((item) => {
          if (shouldSkip) return item;

          const isEmpty =
            Object.keys(item).length === 0 && item.constructor === Object;

          if (isEmpty) {
            shouldSkip = true;
            return action.payload;
          } else {
            return item;
          }
        });
      }
    },
    removeFastItems: (state, action) => {
      state.fastItems[action.payload.index] = {};
    },
    setNotification: (state, action) => {
      // setStore({
      //   ...state,
      //   notificationData: notiData,
      // });
    },
    setDataItem: (state, action) => {
      // setStore({
      //   ...state,
      //   inventory: {
      //     ...state.inventory,
      //     dataItem: item,
      //   },
      // });
    },
    setNearPlayer: (state, action) => {
      state.nearPlayers = action.payload;
    },
    setInfoDivText: (state, action) => {
      state.infoDivText = action.payload;
    },
    updateQuantity: (state, action) => {
      // setStore({ ...state, quantity: inputNumber });
    },
    showWeightDiv: (state, action) => {
      // setStore({
      //   ...state,
      //   inventory: {
      //     ...state.inventory,
      //     isWeightShow: true,
      //   },
      // });
    },
    hideWeightDiv: (state, action) => {
      // setStore({
      //   ...state,
      //   inventory: {
      //     ...state.inventory,
      //     isWeightShow: false,
      //   },
      // });
    },
    showPlayerInventory: (state, action) => {
      // setStore({
      //   ...state,
      //   inventory: {
      //     ...state.inventory,
      //     isInventoryShow: true,
      //   },
      // });
    },
    hidePlayerInventory: (state, action) => {
      // setStore({
      //   ...state,
      //   inventory: {
      //     ...state.inventory,
      //     isInventoryShow: false,
      //   },
      // });
    },
    showOtherInventory: (state, action) => {
      // setStore({
      //   ...state,
      //   inventory: {
      //     ...state.inventory,
      //     isOtherInventoryShow: true,
      //   },
      // });
    },
    hideOtherInventory: (state, action) => {
      // setStore({
      //   ...state,
      //   inventory: {
      //     ...state.inventory,
      //     isOtherInventoryShow: false,
      //   },
      // });
    },
    toggleWeightDiv: (state, action) => {
      // setStore({
      //   ...state,
      //   inventory: {
      //     ...state.inventory,
      //     isWeightShow: !store.inventory.isWeightShow,
      //   },
      // });
    },
    setInventoryItems: (state, action) => {
      // setStore({
      //   ...state,
      //   inventory: {
      //     ...state.inventory,
      //     inventoryItems: items,
      //   },
      // });
    },
    setOtherInventoryItems: (state, action) => {
      // setStore({
      //   ...state,
      //   inventory: {
      //     ...state.inventory,
      //     otherInventoryItems: state,
      //     action,
      //   },
      // });
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
  },
});

export const {
  setOtherInventoryItems,
  setInventoryItems,
  toggleWeightDiv,
  hideOtherInventory,
  showOtherInventory,
  hidePlayerInventory,
  showPlayerInventory,
  hideWeightDiv,
  showWeightDiv,
  updateQuantity,
  setInfoDivText,
  setNearPlayer,
  setDataItem,
  setNotification,
  setOtherItems,
  setFastItems,
  removeFastItems,
  toggleNearPlayers,
} = InventorySlice.actions;

export default InventorySlice.reducer;
