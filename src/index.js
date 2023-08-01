
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, NavLink, useLocation, useNavigate } from "react-router-dom";

import EditEmployee from "./components/EditEmployee/EditEmployee";
import "bootstrap/dist/css/bootstrap.css";
import HomePage from "./components/HomePage/HomePage";
import "./index.css";

function App() {
  const [activeLink, setActiveLink] = useState("");



  const handleEditEmployeeClick = () => {
    console.log("Inside handleEditEmployeeClick  ")

    setActiveLink("/edit-employee");
  };

  const handleHomePageClick = () => {
    console.log("Inside handleHomePageClick  ")
    setActiveLink("/homepage");
  };

  // Function to determine if the "Edit Employee" link should be active
  const activeEditEmployeeLink = () => {
    return activeLink === "/edit-employee";
  };

  return (
    <BrowserRouter>
      <div className="button-row">
        <h1
          style={{ flex: "2", textAlign: "center", marginLeft: "290px" }}
          className="header-title"
        >
          Employee Management
        </h1>
        <NavLink
          
          to="/homepage"
          activeclassname="active" // Use "active" class for styling when the link is active
          className={`button${activeLink === "/homepage" ? " active" : ""}`}
          style={{
            marginRight: "10px",
            textDecoration: "none",
            color: "black",
      
          }}
          onClick={handleHomePageClick}
        >
          Homepage
        </NavLink>

        <NavLink
          to="/edit-employee"
          activeclassname="active" // Use "active" class for styling when the link is active
          className={`button${
            activeLink === "/edit-employee" ? " active" : ""
          }`}
          style={{
            marginRight: "70px",
            textDecoration: "none",
            color: "black",
          
          }}
          onClick={handleEditEmployeeClick}
        >
          Edit Employee
        </NavLink>
      </div>

      <br></br>

      <Routes>
     
        {/* <Route
          path="/"
          element={
            <HomePage handleEditEmployeeClick={handleEditEmployeeClick} />
          }
        /> */}
        <Route
          path="/homepage"
          element={
            <HomePage handleEditEmployeeClick={handleEditEmployeeClick} />
          }
        />
        <Route
          path="/edit-employee"
          element={<EditEmployee handleHomePageClick={handleHomePageClick} />}
        />
         <Route
          path="*" // This route will match any unknown paths
          element={<HomePage handleEditEmployeeClick={handleEditEmployeeClick} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<App />);
