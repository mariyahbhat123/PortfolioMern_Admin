import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaProjectDiagram } from "react-icons/fa";
import { MdSchool } from "react-icons/md";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useState } from "react";

export default function DashBoardPortFolio() {
  const isCollapsed = useSelector((state) => state.sidebarCollapse.isCollapsed);
  const [projectData, setProjectData] = useState([]);
  const [skillData, setSkillData] = useState([]);
  const [adminData, setAdminData] = useState({});
  console.log(isCollapsed, "isCollaped");
  const countData = [
    {
      title: "skill",
      totalData: skillData.length || 0,
    },
    {
      title: "project",
      totalData: projectData.length || 0,
    },
  ];

  const userId = localStorage.getItem("user_id");

  const handleAdminData = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/adminData/${userId}`, {
        method: "GET", // HTTP method
        headers: {
          "Content-Type": "application/json", // tell server it's JSON
        },
      });
      console.log(res, "ADMIN DATA");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const { adminData } = await res.json(); // <-- parse the JSON response
      setAdminData(adminData);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("Admin data", adminData);

  const handleGetSkills = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/skills", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await response.json();

      if (jsonData) {
        setSkillData(jsonData.skillData);
        console.log(skillData, "json data");
      } else {
        console.log("Unable to fetch");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetProjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await response.json();

      if (jsonData) {
        setProjectData(jsonData.projectData);
        console.log(projectData, "json data");
      } else {
        console.log("Unable to fetch");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleAdminData();
    handleGetProjects();
    handleGetSkills();
  }, [userId]);

  console.log(countData, "d");
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 ">
        <div className="space-y-4">
          <WelcomeWidget isCollapsed={isCollapsed} adminData={adminData} />
          <div className=" grid grid-cols-2 gap-4">
            {countData.map((data) => (
              <CountPortfolioDataCard cardData={data} />
            ))}
          </div>
        </div>
        <div>
          <SkillChart isCollapsed={isCollapsed} />
        </div>
      </div>
    </div>
  );
}

export const WelcomeWidget = ({ isCollapsed, adminData }) => {
  console.log("welcome isCollaped", isCollapsed?.isCollapsed);
  const formatDate = (dateString) => {
    if (!dateString) return null;

    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short", // short month (Jan, Feb, Mar...)
      day: "numeric",
    });
  };
  return (
    <div
      className={`shadow-md p-8 rounded-lg ${
        isCollapsed?.isCollapsed ? "w-[640px] " : "w-[560px]"
      }`}
    >
      <div className="flex flex-row items-center space-x-6">
        <div>
          <img
            src=""
            alt=""
            className="w-28 h-28 rounded-full border border-gray-800"
          />
        </div>
        <div className="text-left space-y-5 ">
          <div className="space-y-1">
            <p className="text-4xl font-semibold text-gray-800">
              Welcome Back!
            </p>
            <p className="text-xl font-medium text-gray-800">
              {adminData.first_name}&nbsp;
              {adminData.last_name}
            </p>
            <p className="text-base font-medium text-gray-800">Admin</p>
          </div>
          <p className="text-sm font-medium text-gray-400">
            Last login : {formatDate(adminData.last_login)}
          </p>
        </div>
      </div>
    </div>
  );
};

export const SkillChart = (isCollapsed) => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [chartValue, setChartValue] = useState([]);
  const data = [
    {
      2024: [
        { name: "Q1", skillsLearned: 4 },
        { name: "Q2", skillsLearned: 0 },
        { name: "Q3", skillsLearned: 2 },
        { name: "Q4", skillsLearned: 1 },
      ],
    },
    {
      2025: [
        { name: "Q1", skillsLearned: 2 },
        { name: "Q2", skillsLearned: 1 },
        { name: "Q3", skillsLearned: 3 },
        { name: "Q4", skillsLearned: 0 },
      ],
    },
  ];

  const years = data.map((item) => Object.keys(item)[0]);
  const selectedYearData =
    data.find((item) => item[selectedYear])?.[selectedYear] || [];
  console.log(selectedYearData, "sele");
  return (
    <div
      className={` shadow-md p-8 ${
        isCollapsed?.isCollapsed ? "w-[640px] " : "w-[560px]"
      }`}
    >
      <div className="flex justify-between items-center ">
        <div>
          <h2>Skill Progress</h2>
        </div>
        <div>
          <select
            name=""
            id=""
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {years.map((val) => (
              <option value={val}>{val}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4">
        <SkillProgressChart data={selectedYearData} />
      </div>
    </div>
  );
};

export const CountPortfolioDataCard = (cardData) => {
  console.log(cardData, "CARD DATA");
  return (
    <div
      className={`rounded-lg shadow-md p-8 border-l-4 ${
        cardData.cardData.title == "skill"
          ? "border-red-200 "
          : "border-green-200"
      } `}
    >
      <div className="flex justify-left items-center space-x-6">
        <div
          className={` w-16 h-16 rounded-lg flex justify-center items-center ${
            cardData.cardData.title == "skill" ? "bg-red-100 " : "bg-green-100"
          }`}
        >
          {cardData.cardData.title === "skill" ? (
            <MdSchool className="w-10 h-10 text-red-500" />
          ) : (
            <FaProjectDiagram className="w-8 h-8 text-green-500" />
          )}
        </div>
        <div className="space-y-1">
          <p className="text-xl font-semibold capitalize">
            {cardData.cardData.title}
          </p>
          <p className="text-4xl font-semibold">
            {cardData.cardData.totalData}
          </p>
        </div>
      </div>
    </div>
  );
};

export const SkillProgressChart = (data) => {
  return (
    <div>
      <BarChart width={500} height={250} data={data.data}>
        <XAxis dataKey="name" stroke="#8884d8" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar dataKey="skillsLearned" fill="#8884d8" barSize={30} />
      </BarChart>
    </div>
  );
};
