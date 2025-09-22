import React, { useState } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { Button } from "react-bootstrap";

const NavbarButtons = ({ setIsLoggedIn, setUserRole }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <Button variant="light" onClick={() => setShowLogin(true)}>Login</Button>
      <Button variant="light" className="ms-2" onClick={() => setShowRegister(true)}>Register</Button>

      <LoginModal
        setIsLoggedIn={setIsLoggedIn}
        setUserRole={setUserRole}
        show={showLogin}
        handleClose={() => setShowLogin(false)}
      />

      <RegisterModal
        show={showRegister}
        handleClose={() => setShowRegister(false)}
        openLogin={() => setShowLogin(true)}
      />
    </>
  );
};

export default NavbarButtons;
