import React, { useEffect, useState } from "react";
import "../styles/ProjectPort.css";

import { FaEdit, FaTrash } from "react-icons/fa";
import { MdClose, MdSchool } from "react-icons/md";

export default function ProjectPortfolio() {
  const [projectData, setProjectData] = useState([]);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [showUpdateProjectModal, setShowUpdateProjectModal] = useState(false);
  const [editData, setEditData] = useState(null);

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
    handleGetProjects();
  }, []);

  const handleEditData = (data) => {
    setShowUpdateProjectModal(true);
    setEditData(data);
  };

  const handleCloseData = () => {
    setShowUpdateProjectModal(false);
    setEditData(null);
  };
  return (
    <div className="shadow-md w-[80vw] p-8 relative h-full ">
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center text-3xl font-semibold space-x-4">
          <MdSchool className="w-10 h-10" />
          <h1 className="">Projects</h1>{" "}
        </div>
        <div>
          <button
            className="border border-purple-300 px-8 py-2 text-base font-semibold bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white rounded-md"
            onClick={() => setShowAddProjectModal(true)}
          >
            Add Project
          </button>
        </div>
      </div>
      <div>
        <AddedProjects
          handleEditData={handleEditData}
          projectData={projectData}
          fetchProject={handleGetProjects}
        />
      </div>

      {/*         
        // <div className="innerProjectContainer">
        //   <form action="" className="formSkill">
        //     <h2 className="projectAdd">Project</h2>

        //     <label htmlFor="projectImage" className="projectLabel">
        //       Project Image
        //     </label>
        //     <br />
        //     <input type="file" className="projectInpText" />
        //     <br />

        //     <label htmlFor="projectName" className="projectLabel">
        //       Skill Name
        //     </label>
        //     <br />

        //     <input */}
      {/* //       type="text"
        //       className="projectInpText"
        //       placeholder="Project Name"
        //     />
        //     <br />

        //     <label htmlFor="projectDescription" className="projectLabel">
        //       Skill Description
        //     </label>
        //     <br />
        //     <textarea */}
      {/* //       name="projectDescription"
        //       id=""
        //       className="projectInpText"
        //       placeholder="Project Description"
        //     ></textarea>
        //     <br />

        //     <button className="projectSubmitBtn">Submit</button>
        //   </form>
        // </div> */}
      {showAddProjectModal && (
        <AddProjectModal
          onClose={() => setShowAddProjectModal(false)}
          onSuccess={handleGetProjects}
        />
      )}

      {showUpdateProjectModal && (
        <UpdateProjectModal
          onClose={handleCloseData}
          onSuccess={handleGetProjects}
          editData={editData}
        />
      )}
    </div>
  );
}

export function AddedProjects({ handleEditData, projectData, fetchProject }) {
  const formatDate = (dateString) => {
    if (!dateString) return null;

    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short", // short month (Jan, Feb, Mar...)
      day: "numeric",
    });
  };

  const handleDeleteProject = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/deleteProject/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response, "DELETE RESPONSE");
      fetchProject();
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
          <th className="titleSkill px-4 py-4 text-left  ">Description</th>{" "}
          <th className="titleSkill px-4 py-4 text-left  ">Link</th>
          <th className="titleSkill px-4 py-4 text-left  ">Date</th>
          <th className="titleSkill px-4 py-4 text-left">Action</th>
        </tr>
        <tbody>
          {projectData.map((data) => {
            return (
              <tr className="border border-x-0 border-t-0  border-b-slate-300 ">
                <td className=" px-4 py-4 text-left text-sm">{data.name}</td>
                <td className=" px-4 py-4 text-left truncate text-sm">
                  {data.description}
                </td>{" "}
                <td className=" px-4 py-4 text-left truncate text-sm">
                  {data.goTo}
                </td>
                <td className=" px-4 py-4 text-left text-sm">
                  {formatDate(data.Date)}
                </td>{" "}
                <td className=" px-4 py-4 text-left flex  space-x-4 ">
                  <button
                    className="bg-green-100 p-2 flex items-center justify-center rounded-md cursor-pointer hover:bg-green-200 hover:scale-95 "
                    onClick={() => handleEditData(data)}
                  >
                    <FaEdit className="w-4 h-4 text-green-600 hover:text-green-700" />
                  </button>
                  <button
                    className="bg-red-100 p-2 flex items-center justify-center rounded-md cursor-pointer hover:bg-red-200 hover:scale-95"
                    onClick={() => handleDeleteProject(data._id)}
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

export const AddProjectModal = ({ onClose, onSuccess }) => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [projectData, setProjectData] = useState({
    name: "",
    link: "",
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

  const handleProjectData = async () => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("name", projectData.name);

      formData.append("description", projectData.description);
      formData.append("link", projectData.link);
      const res = await fetch("http://localhost:5000/api/addProjects", {
        method: "POST",

        body: formData,
      });

      console.log(res, "response");
      setProjectData({
        name: "",

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
              Project Name
            </label>
            <br />

            <input
              type="text"
              className="border border-gray-400 p-2 w-[100%] mt-2 rounded-md"
              placeholder="Skill Name"
              onChange={(e) =>
                setProjectData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="text-left mt-4">
            <label htmlFor="skillDescription" className="">
              Project Description
            </label>
            <br />
            <textarea
              name="skillDescription"
              id=""
              className="border border-gray-400 p-2 w-[100%] mt-2 rounded-md"
              placeholder="Write a description"
              onChange={(e) =>
                setProjectData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            ></textarea>
          </div>
          <div className="text-left mt-4 w-full">
            <label htmlFor="projectName" className="">
              Project Link
            </label>
            <br />

            <input
              type="text"
              className="border border-gray-400 p-2 w-[100%] mt-2 rounded-md"
              placeholder="Link"
              onChange={(e) =>
                setProjectData((prev) => ({ ...prev, link: e.target.value }))
              }
            />
          </div>

          <div className="text-left mt-2">
            <label htmlFor="">Project Image</label>
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
            onClick={handleProjectData}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export const UpdateProjectModal = ({ onClose, onSuccess, editData }) => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [upDatedProjectData, setUpdatedProjectData] = useState({
    name: editData.name || "",
    goTo: editData.goTo || "",
    description: editData.description || "",
  });

  // console.log(editData, "EDIT DATA");
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
        `http://localhost:5000/api/updateProject/${editData._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(upDatedProjectData),
        }
      );

      console.log(res, "response update");
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
            <h2 className="text-2xl font-semibold">Update Project</h2>
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
              Project Name
            </label>
            <br />

            <input
              type="text"
              value={
                upDatedProjectData.name
                  ? upDatedProjectData.name
                  : editData.name
              }
              className="border border-gray-400 p-2 w-[100%] mt-2 rounded-md"
              placeholder="Skill Name"
              onChange={(e) =>
                setUpdatedProjectData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
          </div>
          <div className="text-left mt-4">
            <label htmlFor="skillDescription" className="">
              Project Description
            </label>
            <br />
            <textarea
              name="skillDescription"
              id=""
              value={
                upDatedProjectData.description
                  ? upDatedProjectData.description
                  : editData.description
              }
              className="border border-gray-400 p-2 w-[100%] mt-2 rounded-md"
              placeholder="Write a description"
              onChange={(e) =>
                setUpdatedProjectData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            ></textarea>
          </div>

          <div className="text-left mt-4 w-full">
            <label htmlFor="skillName" className="">
              Project Name
            </label>
            <br />

            <input
              type="text"
              value={
                upDatedProjectData.goTo
                  ? upDatedProjectData.goTo
                  : editData.goTo
              }
              className="border border-gray-400 p-2 w-[100%] mt-2 rounded-md"
              placeholder="Skill Name"
              onChange={(e) =>
                setUpdatedProjectData((prev) => ({
                  ...prev,
                  goTo: e.target.value,
                }))
              }
            />
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
