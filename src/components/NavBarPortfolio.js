import React from "react";

export default function NavBarPortfolio() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <p>Admin Portfolio</p>
        </div>
        <div>
          <button>Logout</button>
        </div>
      </div>
    </div>
  );
}
