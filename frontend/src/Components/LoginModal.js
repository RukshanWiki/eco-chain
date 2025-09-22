// import React, { useState } from "react";
// import { Modal, Button, Form, Alert } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const LoginModal = ({ show, handleClose, setIsLoggedIn, setUserRole }) => {
//   const [isRegister, setIsRegister] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [role, setRole] = useState("farmer");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     if (role === "farmer" && isRegister) {
//       setSuccess(true); // show success message
//       setTimeout(() => {
//         setSuccess(false);
//         setIsRegister(false); // switch back to login form
//       }, 2000);
//       return;
//     }

//     if (role === "farmer") {
//       setUserRole("farmer");
//       setIsLoggedIn(true);
//       localStorage.setItem("isLoggedIn", "true");
//       localStorage.setItem("role", "farmer");
//       navigate("/dashboard");
//     } else if (role === "admin") {
//       if (username === "admin" && password === "admin123") {
//         setUserRole("admin");
//         setIsLoggedIn(true);
//         localStorage.setItem("isLoggedIn", "true");
//         localStorage.setItem("role", "admin");
//         navigate("/admin");
//       } else {
//         alert("Invalid admin credentials!");
//       }
//     }
//   };

//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>{isRegister ? "Farmer Register" : "Login"}</Modal.Title>
//       </Modal.Header>

//       <Modal.Body>
//         <Form>
//           {/* Role dropdown (only in login mode) */}
//           {!isRegister && (
//             <Form.Group className="mb-3">
//               <Form.Label>Select Role</Form.Label>
//               <Form.Select
//                 value={role}
//                 onChange={(e) => {
//                   setRole(e.target.value);
//                   setIsRegister(false);
//                 }}
//               >
//                 <option value="farmer">Farmer</option>
//                 <option value="admin">Admin</option>
//               </Form.Select>
//             </Form.Group>
//           )}

//           {/* Farmer Register */}
//           {role === "farmer" && isRegister ? (
//             <>
//               <Form.Group className="mb-3">
//                 <Form.Label>Full Name</Form.Label>
//                 <Form.Control type="text" placeholder="Enter your name" />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>NIC Number</Form.Label>
//                 <Form.Control type="text" placeholder="National Identity Card" />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Farmer Registration Number</Form.Label>
//                 <Form.Control type="text" placeholder="Ex: AG1234" />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control type="email" placeholder="Ex: example@gmail.com" />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control type="password" placeholder="Password" />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Confirm Password</Form.Label>
//                 <Form.Control type="password" placeholder="Confirm Password" />
//               </Form.Group>

//               {success && (
//                 <Alert variant="success" className="fw-bold text-success">
//                   🎉 Registered successfully!
//                 </Alert>
//               )}
//             </>
//           ) : role === "farmer" ? (
//             <>
//               {/* Farmer Login */}
//               <Form.Group className="mb-3">
//                 <Form.Label>Farmer Registration Number</Form.Label>
//                 <Form.Control type="text" placeholder="Ex: AG1234" />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control type="password" placeholder="Enter password" />
//               </Form.Group>

//               <p className="mt-3 text-center">
//                 Don’t have an account?{" "}
//                 <span
//                   style={{ color: "#007bff", cursor: "pointer" }}
//                   onClick={() => setIsRegister(true)}
//                 >
//                   Create one
//                 </span>
//               </p>
//             </>
//           ) : (
//             <>
//               {/* Admin Login */}
//               <Form.Group className="mb-3">
//                 <Form.Label>Admin Username</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Admin Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </Form.Group>
//             </>
//           )}
//         </Form>
//       </Modal.Body>

//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           Cancel
//         </Button>
//         <Button variant="primary" onClick={handleLogin}>
//           {isRegister ? "Register" : "Login"}
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default LoginModal;


// import React, { useState } from "react";
// import { Modal, Button, Form, Alert } from "react-bootstrap";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const LoginModal = ({ show, handleClose, setIsLoggedIn, setUserRole }) => {
//   const [isRegister, setIsRegister] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     nic: "",
//     farmerRegNo: "",
//     province: "",
//     district: "",
//     email: "",
//     mobile: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [username, setUsername] = useState(""); // admin username
//   const [password, setPassword] = useState(""); // admin password
//   const [role, setRole] = useState("farmer");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   const navigate = useNavigate();

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (role === "farmer" && isRegister) {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   // Handle login/register
//   const handleSubmit = async () => {
//     setError("");
//     if (role === "farmer") {
//       if (isRegister) {
//         // Registration validation
//         const requiredFields = [
//           "fullName",
//           "nic",
//           "farmerRegNo",
//           "province",
//           "district",
//           "email",
//           "mobile",
//           "password",
//           "confirmPassword",
//         ];
//         for (let field of requiredFields) {
//           if (!formData[field]) {
//             setError(`❌ ${field} is required`);
//             return;
//           }
//         }
//         if (formData.password !== formData.confirmPassword) {
//           setError("❌ Passwords do not match");
//           return;
//         }

//         try {
//           const res = await axios.post("http://localhost:5000/api/auth/register", formData);
//           if (res.data.success) {
//             setSuccess(true);
//             setTimeout(() => {
//               setSuccess(false);
//               setIsRegister(false);
//             }, 2000);
//           }
//         } catch (err) {
//           setError(err.response?.data?.message || "❌ Registration failed");
//         }
//       } else {
//         // Farmer login
//         if (!formData.farmerRegNo || !formData.password) {
//           setError("❌ All fields are required");
//           return;
//         }

//         try {
//           const res = await axios.post("http://localhost:5000/api/auth/login", {
//             farmerRegNo: formData.farmerRegNo,
//             password: formData.password,
//           });

//           if (res.data.success) {
//             setIsLoggedIn(true);
//             setUserRole("farmer");
//             localStorage.setItem("isLoggedIn", "true");
//             localStorage.setItem("role", "farmer");
//             navigate("/dashboard");
//           }
//         } catch (err) {
//           setError(err.response?.data?.message || "❌ Login failed");
//         }
//       }
//     } else if (role === "admin") {
//       // Admin login
//       if (username === "admin" && password === "admin123") {
//         setIsLoggedIn(true);
//         setUserRole("admin");
//         localStorage.setItem("isLoggedIn", "true");
//         localStorage.setItem("role", "admin");
//         navigate("/admin");
//       } else {
//         setError("❌ Invalid admin credentials");
//       }
//     }
//   };

//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>{isRegister ? "Farmer Register" : "Login"}</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           {!isRegister && (
//             <Form.Group className="mb-3">
//               <Form.Label>Select Role</Form.Label>
//               <Form.Select
//                 value={role}
//                 onChange={(e) => {
//                   setRole(e.target.value);
//                   setIsRegister(false);
//                   setError("");
//                 }}
//               >
//                 <option value="farmer">Farmer</option>
//                 <option value="admin">Admin</option>
//               </Form.Select>
//             </Form.Group>
//           )}

//           {role === "farmer" && isRegister ? (
//             <>
//               {["fullName","nic","farmerRegNo","province","district","email","mobile","password","confirmPassword"].map((field) => (
//                 <Form.Group key={field} className="mb-3">
//                   <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")} *</Form.Label>
//                   <Form.Control
//                     type={field.toLowerCase().includes("password") ? "password" : "text"}
//                     name={field}
//                     value={formData[field]}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               ))}
//             </>
//           ) : role === "farmer" ? (
//             <>
//               <Form.Group className="mb-3">
//                 <Form.Label>Farmer Registration Number</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="farmerRegNo"
//                   value={formData.farmerRegNo}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <p className="mt-3 text-center">
//                 Don’t have an account?{" "}
//                 <span style={{ color: "#007bff", cursor: "pointer" }} onClick={() => setIsRegister(true)}>
//                   Create one
//                 </span>
//               </p>
//             </>
//           ) : (
//             <>
//               <Form.Group className="mb-3">
//                 <Form.Label>Admin Username</Form.Label>
//                 <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Admin Password</Form.Label>
//                 <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//               </Form.Group>
//             </>
//           )}

//           {error && <Alert variant="danger">{error}</Alert>}
//           {success && <Alert variant="success">✅ Registration successful!</Alert>}
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>Cancel</Button>
//         <Button variant="primary" onClick={handleSubmit}>{isRegister ? "Register" : "Login"}</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default LoginModal;


import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import bcrypt from "bcryptjs"; // only needed if you plan to hash on frontend (usually backend hashes)

const LoginModal = ({ show, handleClose, setIsLoggedIn, setUserRole }) => {
  const [isRegister, setIsRegister] = useState(false);
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
  const [role, setRole] = useState("farmer");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Registration
  const handleRegister = async () => {
    setError("");
    setSuccess("");

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

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      if (res.data.success) {
        setSuccess("✅ Registration successful! Please login.");
        setTimeout(() => {
          setIsRegister(false);
          setSuccess("");
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "❌ Registration failed");
    }
  };

  // Login
  const handleLogin = async () => {
    setError("");
    setSuccess("");

    if (role === "admin") {
      if (formData.farmerRegNo === "admin" && formData.password === "admin123") {
        setUserRole("admin");
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", "admin");
        navigate("/admin");
      } else {
        setError("❌ Invalid admin credentials");
      }
      return;
    }

    if (role === "farmer") {
      if (!formData.farmerRegNo || !formData.password) {
        setError("❌ Farmer Reg. No and Password required");
        return;
      }

      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            farmerRegNo: formData.farmerRegNo,
            password: formData.password,
          }
        );

        if (res.data.success) {
          setUserRole("farmer");
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("role", "farmer");
          navigate("/dashboard");
        } else {
          setError(res.data.message || "❌ Login failed");
        }
      } catch (err) {
        setError(err.response?.data?.message || "❌ Login failed");
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isRegister ? "Farmer Register" : "Login"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {!isRegister && (
            <Form.Group className="mb-3">
              <Form.Label>Select Role</Form.Label>
              <Form.Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="farmer">Farmer</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
          )}

          {isRegister ? (
            <>
              {/* Farmer Registration Fields */}
              <Form.Group className="mb-3">
                <Form.Label>Full Name *</Form.Label>
                <Form.Control
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>NIC *</Form.Label>
                <Form.Control
                  name="nic"
                  value={formData.nic}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Farmer Reg. No *</Form.Label>
                <Form.Control
                  name="farmerRegNo"
                  value={formData.farmerRegNo}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Province *</Form.Label>
                <Form.Control
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>District *</Form.Label>
                <Form.Control
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mobile *</Form.Label>
                <Form.Control
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password *</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password *</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </Form.Group>
            </>
          ) : role === "farmer" ? (
            <>
              {/* Farmer Login */}
              <Form.Group className="mb-3">
                <Form.Label>Farmer Reg. No</Form.Label>
                <Form.Control
                  name="farmerRegNo"
                  value={formData.farmerRegNo}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>
              <p className="mt-3 text-center">
                Don’t have an account?{" "}
                <span
                  style={{ color: "#007bff", cursor: "pointer" }}
                  onClick={() => setIsRegister(true)}
                >
                  Register
                </span>
              </p>
            </>
          ) : (
            <>
              {/* Admin Login */}
              <Form.Group className="mb-3">
                <Form.Label>Admin Username</Form.Label>
                <Form.Control
                  name="farmerRegNo"
                  value={formData.farmerRegNo}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Admin Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>
            </>
          )}

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={isRegister ? handleRegister : handleLogin}
        >
          {isRegister ? "Register" : "Login"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;


// import React, { useState } from "react";
// import { Modal, Button, Form, Alert } from "react-bootstrap";
// import axios from "axios";

// const LoginModal = ({ show, handleClose, setIsLoggedIn, setUserRole }) => {
//   const [farmerRegNo, setFarmerRegNo] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", { farmerRegNo, password });

//       if (res.data.success) {
//         setUserRole(res.data.user.role);
//         setIsLoggedIn(true);
//         localStorage.setItem("isLoggedIn", "true");
//         localStorage.setItem("role", res.data.user.role);
//         handleClose();
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Farmer Login</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Form.Group className="mb-3">
//             <Form.Label>Farmer Registration Number</Form.Label>
//             <Form.Control
//               type="text"
//               value={farmerRegNo}
//               onChange={(e) => setFarmerRegNo(e.target.value)}
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </Form.Group>
//           {error && <Alert variant="danger">{error}</Alert>}
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>Cancel</Button>
//         <Button variant="primary" onClick={handleLogin}>Login</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default LoginModal;
