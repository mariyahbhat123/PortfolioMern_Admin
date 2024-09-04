import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenAbout: false,
  isOpenSkill: false,
  isOpenProject: false,
  isOpenDashboard: true,
};

const bodyPortSlice = createSlice({
  name: "BODY_PORTFOLIO_HANDLE_SLICE",
  initialState,
  reducers: {
    openAboutEdit: (state) => {
      state.isOpenAbout = true;
      state.isOpenDashboard = false;
      state.isOpenProject = false;
      state.isOpenSkill = false;
    },

    openSkill: (state) => {
      state.isOpenSkill = true;
      state.isOpenAbout = false;
      state.isOpenDashboard = false;
      state.isOpenProject = false;
    },
    openDashboard: (state) => {
      state.isOpenSkill = false;
      state.isOpenAbout = false;
      state.isOpenDashboard = true;
      state.isOpenProject = false;
    },
    openProject: (state) => {
      state.isOpenSkill = false;
      state.isOpenAbout = false;
      state.isOpenDashboard = false;
      state.isOpenProject = true;
    },
  },
});

export const { openAboutEdit, openSkill, openDashboard, openProject } =
  bodyPortSlice.actions;

export default bodyPortSlice.reducer;
