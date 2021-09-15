import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

let initState = {
  isUIShow: false,
  isInventoryShow: true,
  isOtherInventoryShow: true,
  isFastInventoryShow: true,
  isWeightShow: false,
  eventType: "normal",
  disabled: false,
  disabledFunction: null,
  ownerHouse: null,
  coisas: [],
  itemData: [],
  inventoryItems: [],
  otherInventoryItems: [],
  infoDivText: "Kho Khác",
  nearPlayers: [], // nearPlayers
  dataItem: null,
  isNearPlayersShow: false,
  playerWeight: {
    weight: "",
    maxWeight: "",
  },
  trunkWeight: {
    weight: "",
    maxWeight: "",
  },
  isShowBarWeight: false,
  otherInventory: [],
  fastItems: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  quantity: 1,
  // notificationData: {
  //   itemname: "bread",
  //   itemlabel: "Bánh Mì",
  //   itemcount: 3,
  //   itemremove: true,
  // },
  notificationData: [],
};

const InventorySlice = createSlice({
  name: "inventory",
  initialState: initState,
  reducers: {
    removeNotification: (state, action) => {
      state.notificationData = state.notificationData.filter(
        (item) => item.id !== action.payload.id
      );
    },
    setPlayerWeight: (state, action) => {
      state.playerWeight = action.payload;
    },
    setTrunkWeight: (state, action) => {
      state.trunkWeight = action.payload;
    },
    showBarWeight: (state, action) => {
      state.isShowBarWeight = true;
    },
    hideBarWeight: (state, action) => {
      state.isShowBarWeight = false;
    },
    setType: (state, action) => {
      state.eventType = action.payload;
    },
    toggleIsUIShow: (state, action) => {
      state.isUIShow = !state.isUIShow;
    },
    openUI: (state, action) => {
      state.isUIShow = true;
      state.isNearPlayersShow = false;
      state.nearPlayers = [];
    },
    hideUI: (state, action) => {
      state.isUIShow = false;
    },
    toggleNearPlayers: (state, action) => {
      state.isNearPlayersShow = !state.isNearPlayersShow;
    },
    setOtherItems: (state, action) => {
      state.otherInventory = action.payload;
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
    setFastItemsBE: (state, action) => {
      state.fastItems = action.payload;
    },
    removeFastItems: (state, action) => {
      state.fastItems[action.payload.index] = {};
    },
    setDataItem: (state, action) => {
      state.dataItem = action.payload;
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
      state.inventoryItems = action.payload;
    },
    setOtherInventoryItems: (state, action) => {
      state.otherInventoryItems = action.payload;
    },
    setNotification: (state, action) => {
      state.notificationData.push(action.payload);
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
  setOtherItems,
  setFastItems,
  setFastItemsBE,
  removeFastItems,
  toggleIsUIShow,
  setNotification,
  toggleNearPlayers,
  openUI,
  hideUI,
  setSampleText,
  setType,
  setPlayerWeight,
  setTrunkWeight,
  removeNotification,
  showBarWeight,
  hideBarWeight,
} = InventorySlice.actions;

export default InventorySlice.reducer;
