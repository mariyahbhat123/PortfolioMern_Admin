import React from "react";
import "../styles/AboutPort.css";

export default function AboutPortfolio() {
  return (
    <div style={{ width: "100%" }}>
      <div className="formAboutContainer">
        <form action="" className="formAbout">
          <div>
            <h2 className="editAbout">Edit About</h2>
          </div>
          <div>
            <label htmlFor="name" className="labelForm">
              Name
            </label>{" "}
            <br />
            <input type="text" className="inputForm" placeholder="Name" />
          </div>
          <div>
            <label htmlFor="profession" className="labelForm">
              Profession
            </label>{" "}
            <br />
            <input type="text" className="inputForm" placeholder="Profession" />
          </div>
          <button className="btnSubmit">Submit</button>
        </form>
      </div>
    </div>
  );
}
