/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useHistory,
  NavLink,
  useNavigate,
} from "react-router-dom";
import EditEmployee from "./components/EditEmployee/EditEmployee";
import "bootstrap/dist/css/bootstrap.css";
import HomePage from "./components/HomePage/HomePage";
import "./index.css";

function App() {
  const [activeLink, setActiveLink] = useState("");

  //console.log(location.pathname);

  const handleEditEmployeeClick = () => {
    console.log("The value of handleEditEmployee " + location.pathname);
    setActiveLink("/edit-employee");
  };

  const handleHomePageClick = () => {
    console.log("The value of handleHomePage " + location.pathname);
    setActiveLink("/home");
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
          to="/"
          className={`button${location.pathname === "/" ? " active" : ""}`}
          style={{
            marginRight: "10px",
            textDecoration: "none",
            color: "black",
            fontWeight:
              location.pathname === "/" &&
              location.pathname !== "/edit-employee"
                ? "bold"
                : "normal",
          }}
          onClick={handleHomePageClick}
        >
          Homepage
        </NavLink>
        <NavLink
          to="/edit-employee"
          className={`button${
            location.pathname === "/edit-employee" ? " active" : ""
          }`}
          style={{
            marginRight: "70px",
            textDecoration: "none",
            color: "black",
            fontWeight:
              location.pathname === "/edit-employee" ? "bold" : "normal",
          }}
          onClick={handleEditEmployeeClick}
        >
          Edit Employee
        </NavLink>
      </div>

      <br></br>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
        <Route path="/" element={<HomePage handleEditEmployeeClick={handleEditEmployeeClick} />} />
        <Route path="/edit-employee" element={<EditEmployee />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<App />);
