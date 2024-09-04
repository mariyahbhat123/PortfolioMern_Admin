import { configureStore } from "@reduxjs/toolkit";

import sidebarCollapse from "../slices/sidebarCollapse";
import aboutPortSlice from "../slices/aboutPortSlice";
import bodyPortSlice from "../slices/bodyPortSlice";

export const store = configureStore({
  reducer: {
    sidebarCollapse: sidebarCollapse,
    // aboutPortReducer: aboutPortSlice,
    bodyPortHandleSlice: bodyPortSlice,
  },
});
