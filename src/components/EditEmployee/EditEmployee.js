///* eslint-disable no-restricted-globals */
import { useLocation } from "react-router-dom"; // Import the useLocation hook
import React, { useState, useEffect } from "react";
import "./EditEmployee.css";

function EditEmployee(props) {
  // const [employee, setEmployee] = useState(props.employee);
  const [employee, setEmployee] = useState({}); // Initialize with an empty object

  const location = useLocation(); // Add this line to get the location object

  useEffect(() => {
    const employeeData = location.state?.employee;

    console.log("hello", JSON.stringify(employeeData, null, 2));
    if (employeeData) {
      setEmployee(employeeData);
      console.log(employeeData);
    }
  }, [location.state?.employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setEmployee({
      employeeId: "",
      firstName: "",
      lastName: "",
      department: "",
      mobileNo: "",
      emailId: "",
      address: "",
    });
  };

  const handleUpdate = () => {
    fetch(`http://localhost:8000/user/get/${employee.employeeId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          const confirmation = window.confirm(
            `Do you want to update the employee with ID ${employee.employeeId}?`
          );

          if (confirmation) {
            fetch(`http://localhost:8000/user/update/${employee.employeeId}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(employee),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.status) {
                  window.alert(
                    `Details of employee with ID ${employee.employeeId} updated successfully.`
                  );
                  window.location = "/homepage";

                  // Add your logic for handling the successful update here
                } else {
                  window.alert(
                    `Error updating employee with ID ${employee.employeeId}`
                  );
                }
              })
              .catch((error) => console.log("Error updating user:", error));
          }
        } else {
          window.alert(`Employee with ID ${employee.employeeId} not found.`);
        }
      })
      .catch((error) => console.log("Error searching employee:", error));
  };

  const handleDelete = () => {
    fetch(`http://localhost:8000/user/get/${employee.employeeId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          const confirmation = window.confirm(
            `Are you sure you want to delete the user with ID ${employee.employeeId}?`
          );
          if (confirmation) {
            fetch(`http://localhost:8000/user/delete/${employee.employeeId}`, {
              method: "DELETE",
            })
              .then((response) => response.json())
              .then((data) => {
                console.log("Employee deleted successfully:", data);
                window.location = "/homepage";
                // Add your logic for handling the delete response here
              })
              .catch((error) => console.log("Error deleting employee:", error));
          }
        } else {
          window.alert(`User with ID ${employee.employeeId} not found.`);
        }
      })
      .catch((error) => console.log("Error searching employee:", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Form submitted successfully:", data);
        // Add your logic for handling the API response here

        // Reset the form fields to blank
        setEmployee({
          employeeId: "",
          firstName: "",
          lastName: "",
          department: "",
          mobileNo: "",
          emailId: "",
          address: "",
        });

        // Show success message and navigate to homepage
        window.location = "/homepage";
        window.alert(`Employee ID ${employee.employeeId} saved successfully.`);
      })
      .catch((error) => console.log("Error submitting form:", error));
  };

  const handleSearch = () => {
    fetch("http://localhost:8000/user/get/" + employee.employeeId)
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          const {
            employeeId,
            firstName,
            department,
            mobileNo,
            emailId,
            address,
          } = data.data;
          setEmployee({
            ...employee,
            employeeId,
            firstName,
            department,
            mobileNo,
            emailId,
            address,
          });
        } else {
          window.alert("Employee not found");
        }
      })
      .catch((error) => console.log("Error searching employee:", error));
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Edit Employee</h1>
      <div
        style={{
          backgroundColor: "black",
          padding: "0", // responsible for UI issue
          borderRadius: "10px",
          marginLeft: "25%",
          marginRight: "25%",
          width: "50%", // Adjust the width value as needed
          //display: "flex"
        }}
      >
        <div
          style={{
            //display: "flex",
            padding: "20px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <style>
            {`
        button {
          margin-right: 115px;
        }
        `}
          </style>

          <form onSubmit={handleSubmit}>
            <div className="mb-3 custom-input-space">
             
              <label
                htmlFor="employeeId"
                className="form-label"
                style={{ color: "white" }}
              >
                Employee ID :
              </label>
              <input
                type="text"
                id="employeeId"
                name="employeeId"
                value={employee.employeeId}
                onChange={handleChange}
                className="form-control"
                //style={{ color: "white" }}
              />
            </div>
            <div className="mb-3 custom-input-space">
              <label
                htmlFor="firstName"
                className="form-label"
                style={{ color: "white" }}
              >
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={employee.firstName}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3 custom-input-space">
              <label
                htmlFor="lastName"
                className="form-label"
                style={{ color: "white" }}
              >
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={employee.lastName}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3 custom-input-space">
              <label
                htmlFor="department"
                className="form-label"
                style={{ color: "white" }}
              >
                Department:
              </label>
              <select
                id="department"
                name="department"
                value={employee.department}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select Department</option>
                <option value="computer">Computer</option>
                <option value="electronics">Electronics</option>
                <option value="electrical">Electrical</option>
                <option value="civil">Civil</option>
                <option value="mechanical">Mechanical</option>
              </select>
            </div>

            <div className="mb-3 custom-input-space">
              <label
                htmlFor="mobileNo"
                className="form-label"
                style={{ color: "white" }}
              >
                Mobile No:
              </label>
              <input
                type="text"
                id="mobileNo"
                name="mobileNo"
                value={employee.mobileNo}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3 custom-input-space">
              <label
                htmlFor="emailId"
                className="form-label"
                style={{ color: "white" }}
              >
                Email ID:
              </label>
              <input
                type="text"
                id="emailId"
                name="emailId"
                value={employee.emailId}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3 custom-input-space">
              <label
                htmlFor="address"
                className="form-label"
                style={{ color: "white" }}
              >
                Address:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={employee.address}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div style={{ display: "flex"}}>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ color: "black", backgroundColor: "rgb(152, 200, 216)", marginLeft: "0px"  }}
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="btn btn-primary"
              style={{ backgroundColor: "rgb(152, 200, 216)", color: "black" ,marginLeft: "-35px" }}
            >
              Clear
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="btn btn-primary"
              style={{ backgroundColor: "rgb(152, 200, 216)", color: "black",marginLeft: "-35px" }}
            >
              Delete
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              className="btn btn-primary"
              style={{ backgroundColor: "rgb(152, 200, 216)", color: "black",marginLeft: "-35px" }}
            >
              Update
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSearch}
              style={{ backgroundColor: "rgb(152, 200, 216)", color: "black",marginLeft: "-35px" }}
            >
              Search
            </button>
            </div>
          </form>
        </div>
      </div>
      <br></br>
    </div>
  );
}

export default EditEmployee;
