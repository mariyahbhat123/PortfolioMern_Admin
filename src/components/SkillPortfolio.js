import React, { useEffect, useState } from "react";
import "../styles/SkillPort.css";
import { MdClose, MdSchool } from "react-icons/md";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function SkillPortfolio() {
  const [skillData, setSkillData] = useState([]);
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [showUpdateSkillModal, setShowUpdateSkillModal] = useState(false);
  const [editData, setEditData] = useState(null);

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
  useEffect(() => {
    handleGetSkills();
  }, []);

  const handleEditData = (data) => {
    setShowUpdateSkillModal(true);
    setEditData(data);
  };

  const handleCloseData = () => {
    setShowUpdateSkillModal(false);
    setEditData(null);
  };

  console.log(showUpdateSkillModal, "SHow update");

  return (
    <div className="shadow-md w-[80vw] p-8 relative h-full ">
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center text-3xl font-semibold space-x-4">
          <MdSchool className="w-10 h-10" />
          <h1 className="">Skills</h1>{" "}
        </div>
        <div>
          <button
            className="border border-purple-300 px-8 py-2 text-base font-semibold bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white rounded-md"
            onClick={() => setShowAddSkillModal(true)}
          >
            Add Skill
          </button>
        </div>
      </div>
      <div className="mt-4">
        <AddedSkillsComp
          skillData={skillData}
          fetchSkill={handleGetSkills}
          handleEditData={handleEditData}
        />
      </div>
      {showAddSkillModal && (
        <AddSkillModal
          onClose={() => setShowAddSkillModal(false)}
          onSuccess={handleGetSkills}
        />
      )}

      {showUpdateSkillModal && (
        <UpdateSkillModal
          onClose={handleCloseData}
          onSuccess={handleGetSkills}
          editData={editData}
        />
      )}

      {/* <div className="innerSkillContainer">
          <form action="" className="formSkill">
            <h2 className="skillAdd">Skill</h2>

            <label htmlFor="skillImage" className="skillLabel">
              Skill Image
            </label>
            <br />
            <input type="file" className="skillInpText" />
            <br />

            <label htmlFor="skillName" className="skillLabel">
              Skill Name
            </label>
            <br />

            <input
              type="text"
              className="skillInpText"
              placeholder="Skill Name"
            />
            <br />

            <label htmlFor="skillDescription" className="skillLabel">
              Skill Description
            </label>
            <br />
            <textarea
              name="skillDescription"
              id=""
              className="skillInpText"
              placeholder="Skill Description"
            ></textarea>
            <br />

            <button className="skillSubmitBtn">Submit</button>
          </form>
        </div> */}
    </div>
  );
}

export function AddedSkillsComp({ skillData, fetchSkill, handleEditData }) {
  const [skills, setSkills] = useState();

  const tableData = [
    {
      name: "React",
      description:
        "A powerful JavaScript library for building dynamic, component-driven user interfaces, widely used in modern web development for creating single-page applications with fast rendering.",
      date: "2025-01-12",
      option: "Beginner",
      action: "Edit",
    },
    {
      name: "Node.js",
      description:
        "An open-source, cross-platform runtime environment that allows developers to run JavaScript code on the server, enabling scalable backend services and APIs.",
      date: "2025-02-08",
      option: "Intermediate",
      action: "Edit",
    },
    {
      name: "Tailwind CSS",
      description:
        "A utility-first CSS framework that provides low-level utility classes, giving developers full control to design responsive and customizable interfaces quickly without leaving their HTML.",
      date: "2025-03-15",
      option: "Advanced",
      action: "Edit",
    },
    {
      name: "Docker",
      description:
        "A platform designed to help developers build, share, and run applications inside containers, ensuring consistent environments across different stages of development and deployment.",
      date: "2025-04-02",
      option: "Intermediate",
      action: "Edit",
    },
    {
      name: "Kubernetes",
      description:
        "An open-source system for automating deployment, scaling, and management of containerized applications, providing powerful orchestration features for cloud-native environments.",
      date: "2025-05-20",
      option: "Beginner",
      action: "Edit",
    },
  ];

  const formatDate = (dateString) => {
    if (!dateString) return null;

    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short", // short month (Jan, Feb, Mar...)
      day: "numeric",
    });
  };

  const handleDeleteSkill = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/deleteSkill/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response, "DELETE RESPONSE");
      fetchSkill();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="shadow-md p-8 w-full">
      <table className="table-fixed w-full border-collapse">
        <tr className="titleRowSkill bg-gray-100 rounded-sm">
          {/* <th className="titleSkill">#</th> */}

          <th className="titleSkill px-4 py-4 text-left">Name</th>
          <th className="titleSkill px-4 py-4 text-left w-[40%] ">
            Description
          </th>
          <th className="titleSkill px-4 py-4 text-left  ">Date</th>
          <th className="titleSkill px-4 py-4 text-left ">Level</th>
          <th className="titleSkill px-4 py-4 text-left">Action</th>
        </tr>
        <tbody>
          {skillData.map((data) => {
            return (
              <tr className="border border-x-0 border-t-0  border-b-slate-300 ">
                <td className=" px-4 py-4 text-left text-sm">
                  {data.technologyName}
                </td>
                <td className=" px-4 py-4 text-left truncate text-sm">
                  {data.description}
                </td>
                <td className=" px-4 py-4 text-left text-sm">
                  {formatDate(data.date)}
                </td>{" "}
                <td className=" px-4 py-4 text-left text-sm capitalize ">
                  {data.level}
                </td>
                <td className=" px-4 py-4 text-left flex  space-x-4 ">
                  <button
                    className="bg-green-100 p-2 flex items-center justify-center rounded-md cursor-pointer hover:bg-green-200 hover:scale-95 "
                    onClick={() => handleEditData(data)}
                  >
                    <FaEdit className="w-4 h-4 text-green-600 hover:text-green-700" />
                  </button>
                  <button
                    className="bg-red-100 p-2 flex items-center justify-center rounded-md cursor-pointer hover:bg-red-200 hover:scale-95"
                    onClick={() => handleDeleteSkill(data._id)}
                  >
                    <FaTrash className="w-4 h-4 text-red-600 hover:text-red-700" />
                  </button>
                </td>
              </tr>
            );
          })}{" "}
        </tbody>
      </table>
    </div>
  );
}

export const AddSkillModal = ({ onClose, onSuccess }) => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [skillData, setSkillData] = useState({
    name: "",
    level: "",
    description: "",
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 2 * 1024 * 1024) {
        // 2 MB limit
        setError("File size must be less than 2 MB");
        setFile(null);
        setPreview(null);
        return;
      }
      setError("");
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSkillData = async () => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("name", skillData.name);
      formData.append("level", skillData.level);
      formData.append("description", skillData.description);
      const res = await fetch("http://localhost:5000/api/addSkills", {
        method: "POST",

        body: formData,
      });

      console.log(res, "response");
      setSkillData({
        name: "",
        level: "",
        description: "",
      });
      setFile(null);
      onSuccess();
      onClose();
    } catch (err) {
      console.log("ERROR", err);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Actual modal */}
      <div className="w-[50%] max-h-[80vh] bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex justify-between items-center bg-gradient-to-r from-purple-400 to-purple-500 text-white p-6 rounded-t-lg text-lg">
          <div>
            {" "}
            <h2 className="text-2xl font-semibold">Skill</h2>
          </div>

          <button className="" onClick={onClose}>
            <MdClose className="w-8 h-8" />
          </button>
        </div>
        <form action="" className="px-6 py-2 max-h-[60vh] overflow-y-scroll ">
          {/* <div className="text-center">
          <div className="flex justify-center">
            <img
              src=""
              alt="Skill image"
              className="rounded-full w-20 h-20 border border-gray-400"
            />
          </div>
          <label htmlFor="skillImage" className="mt-2">
            Skill Image
          </label>
          <br />
          <input type="file" className="mt-2" />
        </div> */}
          <div className="text-left mt-4 w-full">
            <label htmlFor="skillName" className="">
              Skill Name
            </label>
            <br />

            <input
              type="text"
              className="border border-gray-400 p-2 w-[100%] mt-2 rounded-md"
              placeholder="Skill Name"
              onChange={(e) =>
                setSkillData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="text-left mt-4">
            <label htmlFor="skillDescription" className="">
              Skill Description
            </label>
            <br />
            <textarea
              name="skillDescription"
              id=""
              className="border border-gray-400 p-2 w-[100%] mt-2 rounded-md"
              placeholder="Write a description"
              onChange={(e) =>
                setSkillData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            ></textarea>
          </div>
          <div className="text-left mt-4">
            <label htmlFor="skillLevel" className="">
              Level
            </label>
            <br />
            <select
              value={skillData.level}
              name="skillLevel"
              id=""
              className="border border-gray-400 p-2 w-[100%] mt-2 rounded-md"
              onChange={(e) =>
                setSkillData((prev) => ({ ...prev, level: e.target.value }))
              }
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div className="text-left mt-2">
            <label htmlFor="">Skill Image</label>
            <div
              className={`border border-gray-500 border-dotted  p-8 mt-2 text-center  flex items-center justify-center rounded-md ${
                preview ? "flex-col h-48" : "h-40"
              }`}
            >
              {preview && (
                <div className="mb-3 relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="mx-auto h-32 w-32 object-cover rounded-md shadow"
                  />
                  <button
                    className="absolute z-20 translate-x-[55px] translate-y-[-135px] bg-white rounded-full p-1 shadow-md"
                    onClick={() => setPreview(null)}
                  >
                    <MdClose className="w-4 h-4" />
                  </button>
                </div>
              )}
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-blue-600 underline"
              >
                Upload File
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        </form>
        <div className="p-8 flex justify-end space-x-2">
          <button
            className="border-2 border-gray-600 text-gray-600 hover:bg-gray-100 px-6 py-1 font-semibold rounded-md"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="border-2 border-[#695aa6] font-semibold px-6 py-1 text-[#695aa6] rounded-md hover:bg-gradient-to-r hover:from-purple-400  hover:to-purple-500 hover:border-purple-500 hover:text-white"
            onClick={handleSkillData}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export const UpdateSkillModal = ({ onClose, onSuccess, editData }) => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [upDatedkillData, setUpdatedSkillData] = useState({
    technologyName: editData.technologyName || "",
    level: editData.level || "",
    description: editData.description || "",
  });

  console.log(editData, "EDIT DATA");
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 2 * 1024 * 1024) {
        // 2 MB limit
        setError("File size must be less than 2 MB");
        setFile(null);
        setPreview(null);
        return;
      }
      setError("");
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpdateData = async () => {
    // const formData = new FormData();
    // if (editData.technologyName !== upDatedkillData.name) {
    //   formData.append("technologyName", upDatedkillData.name);
    // }
    // if (editData.description !== upDatedkillData.description) {
    //   formData.append("description", upDatedkillData.description);
    // }
    // if (editData.level !== upDatedkillData.level) {
    //   formData.append("level", upDatedkillData.level);
    // }
    try {
      const res = await fetch(
        `http://localhost:5000/api/updateSkill/${editData._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(upDatedkillData),
        }
      );

      console.log(res, "respinse update");
      onClose();
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Actual modal */}
      <div className="w-[50%] max-h-[80vh] bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex justify-between items-center bg-gradient-to-r from-purple-400 to-purple-500 text-white p-6 rounded-t-lg text-lg">
          <div>
            {" "}
            <h2 className="text-2xl font-semibold">Update Skill</h2>
          </div>

          <button className="" onClick={onClose}>
            <MdClose className="w-8 h-8" />
          </button>
        </div>
        <form action="" className="px-6 py-2 max-h-[60vh] overflow-y-scroll ">
          {/* <div className="text-center">
          <div className="flex justify-center">
            <img
              src=""
              alt="Skill image"
              className="rounded-full w-20 h-20 border border-gray-400"
            />
          </div>
          <label htmlFor="skillImage" className="mt-2">
            Skill Image
          </label>
          <br />
          <input type="file" className="mt-2" />
        </div> */}
          <div className="text-left mt-4 w-full">
            <label htmlFor="skillName" className="">
              Skill Name
            </label>
            <br />

            <input
              type="text"
              value={
                upDatedkillData.technologyName
                  ? upDatedkillData.technologyName
                  : editData.technologyName
              }
              className="border border-gray-400 p-2 w-[100%] mt-2 rounded-md"
              placeholder="Skill Name"
              onChange={(e) =>
                setUpdatedSkillData((prev) => ({
                  ...prev,
                  technologyName: e.target.value,
                }))
              }
            />
          </div>
          <div className="text-left mt-4">
            <label htmlFor="skillDescription" className="">
              Skill Description
            </label>
            <br />
            <textarea
              name="skillDescription"
              id=""
              value={
                upDatedkillData.description
                  ? upDatedkillData.description
                  : editData.description
              }
              className="border border-gray-400 p-2 w-[100%] mt-2 rounded-md"
              placeholder="Write a description"
              onChange={(e) =>
                setUpdatedSkillData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            ></textarea>
          </div>
          <div className="text-left mt-4">
            <label htmlFor="skillLevel" className="">
              Level
            </label>
            <br />
            <select
              name="skillLevel"
              id=""
              value={
                upDatedkillData.level ? upDatedkillData.level : editData.level
              }
              className="border border-gray-400 p-2 w-[100%] mt-2 rounded-md"
              onChange={(e) =>
                setUpdatedSkillData((prev) => ({
                  ...prev,
                  level: e.target.value,
                }))
              }
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div className="text-left mt-2">
            <label htmlFor="">Skill Image</label>
            <div
              className={`border border-gray-500 border-dotted  p-8 mt-2 text-center  flex items-center justify-center rounded-md ${
                preview || editData ? "flex-col h-48" : "h-40"
              }`}
            >
              {preview ||
                (editData && (
                  <div className="mb-3 relative">
                    <img
                      src={
                        preview !== null
                          ? preview
                          : `http://localhost:5000/skillImages/${editData.image}`
                      }
                      alt="Preview"
                      className="mx-auto h-32 w-32 object-cover rounded-md shadow"
                    />
                    <button
                      className="absolute z-20 translate-x-[55px] translate-y-[-135px] bg-white rounded-full p-1 shadow-md"
                      onClick={() => setPreview(null)}
                    >
                      <MdClose className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-blue-600 underline"
              >
                Upload File
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        </form>
        <div className="p-8 flex justify-end space-x-2">
          <button
            className="border-2 border-gray-600 text-gray-600 hover:bg-gray-100 px-6 py-1 font-semibold rounded-md"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="border-2 border-[#695aa6] font-semibold px-6 py-1 text-[#695aa6] rounded-md hover:bg-gradient-to-r hover:from-purple-400  hover:to-purple-500 hover:border-purple-500 hover:text-white"
            onClick={handleUpdateData}
          >
            Update Skill
          </button>
        </div>
      </div>
    </div>
  );
};
