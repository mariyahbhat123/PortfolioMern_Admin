import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import "../styles/SidebarPort.css";
import Button from "react-bootstrap/Button";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
    <div className="sidebarCon">
      <div>
        <div className="hamburgerContainer">
          <div className="containerChildIcon">
            <Button
              variant="none"
              onClick={handleCollapse}
              style={
                !isCollaped
                  ? {
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-evenly",
                    }
                  : { width: "100%" }
              }
            >
              {" "}
              <MenuIcon sx={{ fontSize: "26px" }} />
              {!isCollaped ? <span>Menu</span> : ""}
            </Button>
          </div>
        </div>
        <div>
          <div className="containerChildIcon mt-3">
            <Button
              variant="none"
              style={
                !isCollaped
                  ? {
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-evenly",
                    }
                  : { width: "100%" }
              }
              onClick={() => dispatch(openDashboard())}
            >
              <DashboardIcon sx={{ fontSize: "23px" }} />
              {!isCollaped ? <span>Dashboard</span> : ""}
            </Button>
          </div>
          <div className="containerChildIcon mt-3">
            <Button
              variant="none"
              style={
                !isCollaped
                  ? {
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-evenly",
                    }
                  : { width: "100%" }
              }
              onClick={() => dispatch(openAboutEdit())}
            >
              <InfoIcon sx={{ fontSize: "23px" }} />
              {!isCollaped ? <span>About</span> : ""}
            </Button>
          </div>
          <div className="containerChildIcon mt-3">
            <Button
              variant="none"
              style={
                !isCollaped
                  ? {
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-evenly",
                    }
                  : { width: "100%" }
              }
              onClick={() => dispatch(openSkill())}
            >
              <PsychologyIcon sx={{ fontSize: "23px" }} />
              {!isCollaped ? <span>Skill</span> : ""}
            </Button>
          </div>
          <div className="containerChildIcon mt-3">
            <Button
              variant="none"
              style={
                !isCollaped
                  ? {
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-evenly",
                    }
                  : { width: "100%" }
              }
              onClick={() => dispatch(openProject())}
            >
              <ChecklistRtlIcon sx={{ fontSize: "23px" }} />
              {!isCollaped ? <span>Project</span> : ""}
            </Button>
          </div>
        </div>
        <div
          className="buttonContainerSide"
          style={!isCollaped ? { height: "60vh" } : { height: "60vh" }}
        >
          <Button
            variant="none"
            style={
              !isCollaped
                ? {
                    marginTop: "auto",
                    display: "flex",
                    justifyContent: "space-evenly",
                  }
                : { marginTop: "auto" }
            }
          >
            <ExitToAppIcon sx={{ fontSize: "23px" }} />
            {!isCollaped ? <span>Logout</span> : ""}
          </Button>
        </div>
      </div>
    </div>
  );
}
