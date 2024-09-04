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
    <div>
      {" "}
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          className={!isCollaped ? "sidebarNotCollapsed" : "sidebarCollapsed"}
          // style={
          //   !isCollaped
          //     ? {

          //       }
          //     : {  }
          // }
        >
          <SidebarPortFolio />
        </div>{" "}
        <div className="bodyPortfolio">
          <div className="navPortContainer">
            <NavBarPortfolio />
          </div>
          <div className="bodyContainer">
            {}{" "}
            {isOpenDashboard === true ? (
              <div>
                <DashBoardPortFolio />
              </div>
            ) : isOpenAbout === true ? (
              <div>
                <AboutPortfolio />
              </div>
            ) : isOpenSkill === true ? (
              <div>
                <SkillPortfolio />
              </div>
            ) : isOpenProject === true ? (
              <div>
                <ProjectPortfolio />
              </div>
            ) : (
              <div>
                <DashBoardPortFolio />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
