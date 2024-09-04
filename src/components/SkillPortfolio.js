import React from "react";
import "../styles/SkillPort.css";

export default function SkillPortfolio() {
  return (
    <div style={{ width: "100%" }}>
      <div className="outerMostContainerSkill">
        <div className="skillCardOuterContainer">
          <div className="skillCardInnerContainer">
            <h2>jdeaj</h2>
          </div>
        </div>
        <div className="innerSkillContainer">
          <form action="" className="formSkill">
            <div>
              <h2 className="skillAdd">Skill</h2>
            </div>
            <div>
              <label htmlFor="skillImage">Skill Image</label>
              <br />
              <input type="file" />
            </div>
            <div>
              <label htmlFor="skillName">Skill Name</label>
              <br />

              <input type="text" />
            </div>
            <div>
              <label htmlFor="skillDescription">Skill Description</label>
              <br />
              <textarea name="skillDescription" id=""></textarea>
            </div>
            <button>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
