import React from "react";
import SidebarPortFolio from "../components/SidebarPortFolio";
import DashBoardPortFolio from "../components/DashBoardPortFolio";
import "../styles/HomePort.css";
import { useSelector } from "react-redux";
import NavBarPortfolio from "../components/NavBarPortfolio";
import AboutPortfolio from "../components/AboutPortfolio";
import SkillPortfolio from "../components/SkillPortfolio";
import ProjectPortfolio from "../components/ProjectPortfolio";

export default function HomePortfolio() {
  const isCollaped = useSelector((state) => state.sidebarCollapse.isCollapsed);

  // const aboutPortReducer = useSelector(
  //   (state) => state.aboutPortReducer.isOpenAbout
  // );

  const isOpenAbout = useSelector(
    (state) => state.bodyPortHandleSlice.isOpenAbout
  );

  console.log("AB", isOpenAbout);
  const isOpenSkill = useSelector(
    (state) => state.bodyPortHandleSlice.isOpenSkill
  );
  const isOpenProject = useSelector(
    (state) => state.bodyPortHandleSlice.isOpenProject
  );
  const isOpenDashboard = useSelector(
    (state) => state.bodyPortHandleSlice.isOpenDashboard
  );
  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <div>
        <NavBarPortfolio />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ${
            !isCollaped ? "w-64 sidebarNotCollapsed" : "w-20 sidebarCollapsed"
          } border-r`}
        >
          <SidebarPortFolio />
        </div>

        {/* Page Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {isOpenDashboard ? (
            <DashBoardPortFolio />
          ) : isOpenAbout ? (
            <AboutPortfolio />
          ) : isOpenSkill ? (
            <div className="h-full">
              <SkillPortfolio />
            </div>
          ) : isOpenProject ? (
            <ProjectPortfolio />
          ) : (
            <DashBoardPortFolio />
          )}
        </div>
      </div>
    </div>
  );
}
