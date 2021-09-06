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
  isUIShow: false,
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
  inventoryItems: [],
  otherInventoryItems: [],
  infoDivText: "Kho Khác",
  nearPlayers, // nearPlayers
  dataItem: null,
  isNearPlayersShow: false,

  otherInventory: [],
  fastItems: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  quantity: 1,
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
    setType: (state, action) => {
      state.type = action.payload;
    },
    toggleIsUIShow: (state, action) => {
      console.log("toggleIsUIShow");
      state.isUIShow = !state.isUIShow;
    },
    openUI: (state, action) => {
      console.log("toggleIsUIShow true");
      state.isUIShow = true;
    },
    hideUI: (state, action) => {
      console.log("toggleIsUIShow false");
      state.isUIShow = false;
    },
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
      state.notificationData = action.payload;
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
      state.quantity = action.payload;
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
      state.isInventoryShow = true;
    },
    hidePlayerInventory: (state, action) => {
      state.isInventoryShow = false;
    },
    showOtherInventory: (state, action) => {
      state.isOtherInventoryShow = true;
    },
    hideOtherInventory: (state, action) => {
      state.isOtherInventoryShow = false;
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
      console.log("setInventoryItems", action);
      state.inventoryItems = action.payload;
    },
    setOtherInventoryItems: (state, action) => {
      state.otherInventoryItems = action.payload;
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
  toggleIsUIShow,
  toggleNearPlayers,
  openUI,
  hideUI,
  setSampleText,
  setType,
} = InventorySlice.actions;

export default InventorySlice.reducer;
