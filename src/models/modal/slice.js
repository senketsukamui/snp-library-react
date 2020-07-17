import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalInputState: {
    author: "",
    title: "",
    description: "",
    image: "",
  },
};

const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    changeModalInputState(state, action) {
      state.modalInputState[action.payload.field] = action.payload.value;
    },
    clearModalInputState(state, action) {
      state.modalInputState = initialState.modalInputState;
    },
    setModalInputState(state, action) {
      state.modalInputState = action.payload;
    },
  },
});

export const {
  changeModalInputState,
  clearModalInputState,
  setModalInputState,
} = modal.actions;

export default modal;
