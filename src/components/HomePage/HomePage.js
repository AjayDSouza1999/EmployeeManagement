import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import EditEmployee from "../EditEmployee/EditEmployee";

function HomePage() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate(); // Move the useNavigate hook outside of the HandleUpdateEmployee function
  const location = useLocation(); // Add this line
  const [activeLink, setActiveLink] = useState(""); // Add this line to declare the activeLink state

  const handleDeleteEmployee = (employeeId) => {
    const confirmation = window.confirm(
      `Are you sure you want to delete the user with ID ${employeeId}?`
    );

    if (confirmation) {
      fetch(`http://localhost:8000/user/delete/${employeeId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Employee deleted successfully:", data);
          window.location.reload();
          setActiveLink(""); // Clear the active link after deleting an employee

          // Add your logic for handling the delete response here
        })
        .catch((error) => console.log("Error deleting employee:", error));
    }
  };

  const HandleUpdateEmployee = (employee) => {
    console.log(employee);
    navigate("/edit-employee", { state: { employee } });
    setActiveLink("/edit-employee"); // Add this line to set "Edit Employee" as the active link
  };

  // Pass the selected employee as a prop to the EditEmployee component
  {
    /* <EditEmployee employee={employees} /> */
  }

  useEffect(() => {
    // Fetch employee data from the API
    fetch("http://localhost:8000/user/getAll")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setEmployees(data.data); // Set the employees state as an array
        } else {
          console.log("Invalid data format:", data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    // console.log("The value of employees is ", employees);
  }, [employees]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Employee Details</h1>
      <br />

      <table
        className="table table-striped"
        style={{
          borderCollapse: "collapse",
          border: "1px solid rgba(0, 0, 0, 0.2)",
          width: "70%",
          margin: "auto",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>FIRST NAME</th>
            <th>LAST NAME</th>
            <th>DEPARTMENT</th>
            <th>PHONE</th>
            <th>EMAIL</th>
            <th>ADDRESS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.employeeId}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.department}</td>
              <td>{employee.mobileNo}</td>
              <td>{employee.emailId}</td>
              <td>{employee.address}</td>
              <td>
                <button
                  onClick={() => handleDeleteEmployee(employee.employeeId)}
                  style={{
                    marginRight: "5px",
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "10px",
                  }} // Add margin to the right
                >
                  DELETE
                </button>
                <button
                  onClick={() => HandleUpdateEmployee(employee)}
                  style={{
                    marginLeft: "0px",
                    backgroundColor: "black",
                    color: "white",
                    borderRadius: "10px",
                  }} // Add margin to the left
                >
                  UPDATE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pass the activeLink state to the NavLink components */}
      
    </div>
  );
}

export default HomePage;
