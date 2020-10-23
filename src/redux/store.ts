import { createStore } from "redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IJoke, TinitialState } from "./type";

const initialState: TinitialState = [];

const jokes = createSlice({
  name: "jokes",
  initialState,
  reducers: {
    addJokes: (state, action: PayloadAction<IJoke>) => {
      if (state.filter((v) => v.id !== action.payload.id)) {
        return [...state, { ...action.payload }];
      } else {
        return state;
      }
    },
  },
});

export const { addJokes } = jokes.actions;
export const store = createStore(jokes.reducer);

export type TRootState = ReturnType<typeof store.getState>;
