import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import "../styles/SidebarPort.css";
import Button from "react-bootstrap/Button";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useDispatch, useSelector } from "react-redux";

import {
  isCollapsedSidebar,
  isNotCollapsedSidebar,
} from "../Redux/slices/sidebarCollapse";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InfoIcon from "@mui/icons-material/Info";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import { openAbout } from "../Redux/slices/aboutPortSlice";
import {
  openAboutEdit,
  openDashboard,
  openProject,
  openSkill,
} from "../Redux/slices/bodyPortSlice";

export default function SidebarPortFolio() {
  //   const navigate = useNavigate();
  const dispatch = useDispatch();

  const isCollaped = useSelector((state) => state.sidebarCollapse.isCollapsed);

  const handleCollapse = () => {
    if (!isCollaped) {
      dispatch(isCollapsedSidebar());
    } else {
      dispatch(isNotCollapsedSidebar());
    }
  };

  // const handleAbout = () => {
  //   dispatch(openAbout());
  // };

  return (
    <div className="sidebarCon pb-3 min-h-[89.8vh]">
      <div className="h-full flex flex-col justify-between">
        <div
          className="flex
          flex-col
            justify-center
            items-center space-y-4 p-2"
        >
          <div
            className={`
          w-[90%]
             appearance-none mt-2`}
          >
            <Button
              variant="none"
              onClick={handleCollapse}
              className={`text-white w-[100%] border border-[#7b5fa1] bg-[#c4aaf3] rounded-[10px] ${
                !isCollaped
                  ? " flex items-center justify-start gap-4 px-[10px] py-4   text-base cursor-pointer transition-colors"
                  : "py-2"
              }`}
            >
              {" "}
              <MenuIcon sx={{ fontSize: "26px" }} />
              {!isCollaped ? <span className="textSidebar">Menu</span> : ""}
            </Button>
          </div>

          <div
            className={` 
             w-[90%]
               appearance-none`}
          >
            <Button
              variant="none"
              className={`text-white w-[100%] border border-[#7b5fa1] bg-[#c4aaf3] rounded-[10px] ${
                !isCollaped
                  ? " flex items-center justify-start gap-4 px-[10px] py-4   text-base cursor-pointer transition-colors"
                  : "py-2"
              }`}
              onClick={() => dispatch(openDashboard())}
            >
              <DashboardIcon sx={{ fontSize: "23px" }} />
              {!isCollaped ? (
                <span className="textSidebar">Dashboard</span>
              ) : (
                ""
              )}
            </Button>
          </div>
          <div
            className={`
           w-[90%]
              appearance-none`}
          >
            <Button
              variant="none"
              className={`text-white w-[100%] border border-[#7b5fa1] bg-[#c4aaf3] rounded-[10px] ${
                !isCollaped
                  ? " flex items-center justify-start gap-4 px-[10px] py-4   text-base cursor-pointer transition-colors"
                  : "py-2"
              }`}
              onClick={() => dispatch(openAboutEdit())}
            >
              <InfoIcon sx={{ fontSize: "23px" }} />
              {!isCollaped ? <span className="textSidebar">About</span> : ""}
            </Button>
          </div>
          <div
            className={`
           w-[90%]
            appearance-none`}
          >
            <Button
              variant="none"
              className={`text-white w-[100%] border border-[#7b5fa1] bg-[#c4aaf3] rounded-[10px] ${
                !isCollaped
                  ? " flex items-center justify-start gap-4 px-[10px] py-4   text-base cursor-pointer transition-colors"
                  : "py-2"
              }`}
              onClick={() => dispatch(openSkill())}
            >
              <PsychologyIcon sx={{ fontSize: "23px" }} />
              {!isCollaped ? <span className="textSidebar">Skill</span> : ""}
            </Button>
          </div>
          <div
            className={` 
         w-[90%]
         appearance-none`}
          >
            <Button
              variant="none"
              className={`text-white w-[100%] border border-[#7b5fa1] bg-[#c4aaf3] rounded-[10px] ${
                !isCollaped
                  ? " flex items-center justify-start gap-4 px-[10px] py-4   text-base cursor-pointer transition-colors"
                  : "py-2"
              }`}
              onClick={() => dispatch(openProject())}
            >
              <ChecklistRtlIcon sx={{ fontSize: "23px" }} />
              {!isCollaped ? <span className="textSidebar">Project</span> : ""}
            </Button>
          </div>
        </div>
        <div className="flex justify-center px-2">
          <div
            className={` 
         w-[90%]
         appearance-none`}
            // className="buttonContainerSide"
            // style={!isCollaped ? { height: "50vh" } : { height: "50vh" }}
          >
            <Button
              variant="none"
              className={`text-white w-[100%] border border-[#7b5fa1] bg-[#c4aaf3] rounded-[10px] ${
                !isCollaped
                  ? " flex items-center justify-start gap-4 px-[10px] py-4   text-base cursor-pointer transition-colors"
                  : "py-2"
              }`}
            >
              <ExitToAppIcon sx={{ fontSize: "23px" }} />
              {!isCollaped ? <span className="textSidebar">Logout</span> : ""}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
