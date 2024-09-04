import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCollapsed: true,
};

const sidebarCollapse = createSlice({
  name: "SIDEBAR_COLLAPSE",
  initialState,
  reducers: {
    isCollapsedSidebar: (state) => {
      state.isCollapsed = true;
    },
    isNotCollapsedSidebar: (state) => {
      state.isCollapsed = false;
    },
  },
});

export const { isCollapsedSidebar, isNotCollapsedSidebar } =
  sidebarCollapse.actions;
export default sidebarCollapse.reducer;
