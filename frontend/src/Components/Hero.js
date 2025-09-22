import React, { useState } from 'react';
import background from '../Images/HeroBackground.jpg';
import { FaArrowRight } from 'react-icons/fa';
//import { Modal, Button, Form, Alert } from 'react-bootstrap';
//import { useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const Hero = ({setIsLoggedIn, setUserRole}) => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh',
        position: 'relative',
        color: 'white'
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      ></div>

      {/* Hero content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          float: 'left',
          marginLeft: '50px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          height: '100%',
          textAlign: 'left',
          padding: '100px 20px 0 50px'
        }}
      >
        <h1 style={{ fontFamily: 'HeadlandOne', fontSize: '4rem' }}>
          Empowering Agriculture
          for a Sustainable <br /> Future
        </h1>
        <p style={{ fontSize: '1.25rem', maxWidth: '850px' }}>
          EcoChain is a smart platform which helps farmers to grow the right crops at the right time using data and forecasts, reducing waste and boosting market balance.
        </p>
        <div>
          <button
            style={{
              background: '#cbcb0aff',
              color: '#000',
              fontWeight: 'bold',
              padding: '15px 20px',
              marginRight: '15px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
            onClick={() => setShowRegister(true)} // open modal
          >
            Get Started <FaArrowRight />
          </button>

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
        </div>
      </div>
    </div>
  );
}; 
export default Hero;
