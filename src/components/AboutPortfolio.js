import React, { useEffect, useState } from "react";
import "../styles/AboutPort.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdClose, MdSchool } from "react-icons/md";

export default function AboutPortfolio() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [aboutData, setAboutData] = useState({});
  const fetchAboutData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/aboutGet", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await response.json();
      console.log(jsonData.aboutData, "Data about");
      if (jsonData) {
        setAboutData(jsonData.aboutData[0]);
        console.log(aboutData, "json data");
      } else {
        console.log("Unable to fetch");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, []);
  return (
    <div style={{ width: "100%" }}>
      <div className="relative border border-gray-200 h-80 bg-gradient-to-r from-pink-100 to-pink-700 flex items-center justify-center">
        <div className="absolute border shadow-lg bg-white translate-y-48 p-4 rounded-lg  flex justify-center w-1/2">
          <div className="absolute">
            <img
              src={`http://localhost:5000/aboutImages/${aboutData?.image}`}
              alt=""
              className="h-32 w-32 border rounded-full -translate-y-20"
            />
          </div>
          <div className="mt-16 w-full">
            <div>
              <h1 className="text-2xl font-semibold">{aboutData?.name}</h1>
              <p className="text-base  font-semibold">{aboutData?.email}</p>
              <p className="text-base mt-1 font-semibold">
                {aboutData?.profession}
              </p>
            </div>
            <div className=" line-clamp-4 mt-4">
              <p className="text-base">{aboutData?.about}</p>
            </div>
            <div className="mt-4">
              <div className="flex flex-row justify-evenly">
                <div className="">
                  <p>Skills</p>
                  <p>5</p>
                </div>
                <div>
                  <p>Projects</p>
                  <p>6</p>
                </div>
              </div>
              {/* <div className="flex flex-row justify-evenly">
                <p>5</p>
                <p>6</p>
              </div> */}
            </div>
            <div className="mt-4">
              <button
                className="border border-purple-300 px-8 py-2 text-base font-semibold bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white rounded-md "
                onClick={() => setShowEditModal(true)}
              >
                Edit About
              </button>
            </div>
          </div>
        </div>
      </div>
      {showEditModal && (
        <AboutUpdateModal
          onClose={() => setShowEditModal(false)}
          onSuccess={() => fetchAboutData}
          aboutData={aboutData}
        />
      )}
    </div>
  );
}

export const AboutUpdateModal = ({ onClose, onSuccess, aboutData }) => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [upDatedAboutData, setUpdatedAboutData] = useState({
    name: aboutData?.name || "",
    email: aboutData?.email || "",
    profession: aboutData?.profession || "",
    about: aboutData?.description || "",
  });

  console.log(aboutData);

  // console.log(aboutData, "EDIT DATA");
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
    // if (aboutData.technologyName !== upDatedkillData.name) {
    //   formData.append("technologyName", upDatedkillData.name);
    // }
    // if (aboutData.description !== upDatedkillData.description) {
    //   formData.append("description", upDatedkillData.description);
    // }
    // if (aboutData.level !== upDatedkillData.level) {
    //   formData.append("level", upDatedkillData.level);
    // }
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("name", upDatedAboutData.name);

      formData.append("about", upDatedAboutData.about);
      formData.append("link", upDatedAboutData.profession);
      const res = await fetch(
        `http://localhost:5000/api/about/${aboutData._id}`,
        {
          method: "PUT",

          body: formData,
        },
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
            <h2 className="text-2xl font-semibold">Update About</h2>
          </div>

          <button className="" onClick={onClose}>
            <MdClose className="w-8 h-8" />
          </button>
        </div>
        <form action="" className="px-6 py-2 max-h-[60vh] overflow-y-scroll ">
          <div className="text-left mt-4 w-full">
            <label htmlFor="skillName" className="">
              Admin Name
            </label>
            <br />

            <input
              type="text"
              value={
                upDatedAboutData.name ? upDatedAboutData.name : aboutData.name
              }
              className="border border-gray-400 p-2 w-[100%] mt-2 rounded-md"
              placeholder="Name"
              onChange={(e) =>
                setUpdatedAboutData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
          </div>

          <div className="text-left mt-4 w-full">
            <label htmlFor="skillName" className="">
              Admin Email
            </label>
            <br />

            <input
              type="text"
              value={
                upDatedAboutData?.email
                  ? upDatedAboutData?.email
                  : aboutData?.email
              }
              className="border border-gray-400 p-2 w-[100%] mt-2 rounded-md"
              placeholder="Name"
              onChange={(e) =>
                setUpdatedAboutData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
          </div>

          <div className="text-left mt-4 w-full">
            <label htmlFor="skillName" className="">
              Profession
            </label>
            <br />

            <input
              type="text"
              value={
                upDatedAboutData?.profession
                  ? upDatedAboutData?.profession
                  : aboutData?.profession
              }
              className="border border-gray-400 p-2 w-[100%] mt-2 rounded-md"
              placeholder="Profession"
              onChange={(e) =>
                setUpdatedAboutData((prev) => ({
                  ...prev,
                  profession: e.target.value,
                }))
              }
            />
          </div>

          <div className="text-left mt-4">
            <label htmlFor="skillDescription" className="">
              About Description
            </label>
            <br />
            <textarea
              name="skillDescription"
              id=""
              value={
                upDatedAboutData?.about
                  ? upDatedAboutData?.about
                  : aboutData?.about
              }
              className="border border-gray-400 p-2 w-[100%] mt-2 rounded-md"
              placeholder="Write a description"
              onChange={(e) =>
                setUpdatedAboutData((prev) => ({
                  ...prev,
                  about: e.target.value,
                }))
              }
            ></textarea>
          </div>

          <div className="text-left mt-2">
            <label htmlFor="">Image</label>
            <div
              className={`border border-gray-500 border-dotted  p-8 mt-2 text-center  flex items-center justify-center rounded-md ${
                preview || aboutData ? "flex-col h-48" : "h-40"
              }`}
            >
              {preview ||
                (aboutData && (
                  <div className="mb-3 relative">
                    <img
                      src={
                        preview !== null
                          ? preview
                          : `http://localhost:5000/aboutImages/${aboutData.image}`
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
                Upload Image
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
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
