// import React, { useState } from 'react';
// import { Modal, Button, Form, Alert } from 'react-bootstrap';

// const RegisterModal = ({ show, handleClose, openLogin }) => {
//   const [success, setSuccess] = useState(false);

//   const handleRegister = () => {
//     // Simulate registration success
//     setSuccess(true);
//     setTimeout(() => {
//       setSuccess(false);
//       handleClose();
//       openLogin(); // open login modal after registration
//     }, 1500);
//   };

//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Register (Farmers Only)</Modal.Title>
//       </Modal.Header>

//       <Modal.Body>
//         <Form>
//           <Form.Group className="mb-3">
//             <Form.Label>Full Name</Form.Label>
//             <Form.Control type="text" placeholder="Enter your name" />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>NIC Number</Form.Label>
//             <Form.Control type="text" placeholder="National Identity Card" />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Farmer Registration Number</Form.Label>
//             <Form.Control type="text" placeholder="Ex: AG1234" />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Province</Form.Label>
//             <Form.Control type="text" placeholder="Ex: Western" />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>District</Form.Label>
//             <Form.Control type="text" placeholder="Ex: Gampaha" />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Email</Form.Label>
//             <Form.Control type="email" placeholder="Ex: example@gmail.com" />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Mobile Number</Form.Label>
//             <Form.Control type="tel" placeholder="Enter mobile number" />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Password</Form.Label>
//             <Form.Control type="password" placeholder="Password" />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Confirm Password</Form.Label>
//             <Form.Control type="password" placeholder="Confirm Password" />
//           </Form.Group>

//           {success && (
//             <Alert variant="success" className="fw-bold text-success">
//               🎉 Registration successful! Redirecting to login...
//             </Alert>
//           )}
//         </Form>

//         <p className="mt-3 text-center">
//           Already have an account?{" "}
//           <span
//             style={{ color: "#007bff", cursor: "pointer" }}
//             onClick={() => {
//               handleClose();
//               openLogin();
//             }}
//           >
//             Login
//           </span>
//         </p>
//       </Modal.Body>

//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>Cancel</Button>
//         <Button variant="primary" onClick={handleRegister}>Register</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default RegisterModal;


import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

const RegisterModal = ({ show, handleClose, openLogin }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    nic: "",
    farmerRegNo: "",
    province: "",
    district: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle register button
  // const handleRegister = async () => {
  //   setError("");
  //   setSuccess(false);

  

  //   // Simple validation
  //   const mandatoryFields = [
  //     "fullName",
  //     "nic",
  //     "farmerRegNo",
  //     "province",
  //     "district",
  //     "email",
  //     "mobile",
  //     "password",
  //     "confirmPassword",
  //   ];

  //   for (let field of mandatoryFields) {
  //     if (!formData[field]) {
  //       setError(`❌ ${field} is required`);
  //       return;
  //     }
  //   }

  //   if (formData.password !== formData.confirmPassword) {
  //     setError("❌ Passwords do not match");
  //     return;
  //   }

  //   try {
  //     const res = await axios.post(
  //       "http://localhost:5000/api/auth/register",
  //       formData
  //     );

  //     if (res.data.message) {
  //       setSuccess(true);
  //       setError("");
  //       setTimeout(() => {
  //         setSuccess(false);
  //         handleClose();
  //         openLogin(); // open login modal after successful registration
  //       }, 2000);
  //     }
  //   } catch (err) {
  //     setError(err.response?.data?.message || "❌ Registration failed");
  //   }
  // };

  // Handle register button
const handleRegister = () => {
  setError("");
  setSuccess(false);

  const mandatoryFields = [
    "fullName",
    "nic",
    "farmerRegNo",
    "province",
    "district",
    "email",
    "mobile",
    "password",
    "confirmPassword",
  ];

  for (let field of mandatoryFields) {
    if (!formData[field]) {
      setError(`❌ ${field} is required`);
      return;
    }
  }

  if (formData.password !== formData.confirmPassword) {
    setError("❌ Passwords do not match");
    return;
  }

  // ✅ Save farmer in localStorage
  const farmers = JSON.parse(localStorage.getItem("farmers")) || [];

  // Check if farmer already exists
  const exists = farmers.find(
    (f) => f.nic === formData.nic || f.farmerRegNo === formData.farmerRegNo
  );

  if (exists) {
    setError("❌ Farmer already registered");
    return;
  }

  // Add new farmer
  farmers.push(formData);
  localStorage.setItem("farmers", JSON.stringify(farmers));

  setSuccess(true);
  setError("");

  setTimeout(() => {
    setSuccess(false);
    handleClose();
    openLogin(); // go to login modal
  }, 2000);
};

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Register (Farmers Only)</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {[
            { label: "Full Name", name: "fullName" },
            { label: "NIC Number", name: "nic" },
            { label: "Farmer Registration Number", name: "farmerRegNo" },
            { label: "Province", name: "province" },
            { label: "District", name: "district" },
            { label: "Email", name: "email", type: "email" },
            { label: "Mobile Number", name: "mobile" },
            { label: "Password", name: "password", type: "password" },
            { label: "Confirm Password", name: "confirmPassword", type: "password" },
          ].map((field) => (
            <Form.Group className="mb-3" key={field.name}>
              <Form.Label>{field.label} *</Form.Label>
              <Form.Control
                type={field.type || "text"}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
              />
            </Form.Group>
          ))}

          {error && <Alert variant="danger">{error}</Alert>}
          {success && (
            <Alert variant="success">
              ✅ Registration successful! Redirecting to login...
            </Alert>
          )}
        </Form>

        <p className="mt-3 text-center">
          Already have an account?{" "}
          <span
            style={{ color: "#007bff", cursor: "pointer" }}
            onClick={() => {
              handleClose();
              openLogin();
            }}
          >
            Login
          </span>
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleRegister}>
          Register
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterModal;


