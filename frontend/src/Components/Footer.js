import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../Images/LOGO.png'; 

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#1b1919',
        color: '#fff',
        padding: '40px 0',
        marginTop: '40px'
      }}
    >
      <Container>
        <Row className="align-items-start" style={{ minHeight: '200px' }}>
            {/* Logo Column */}
            <Col md={3} className="d-flex flex-column align-items-center justify-content-center text-center mb-4 mb-md-0">
                <img src={logo} alt="ecoChain Logo" width="250" style={{ marginBottom: '15px' }}/>
            </Col>

            {/* Contact Column */}
            <Col md={3} className="text-center text-md-start mb-4 mb-md-0">
                <h5 className="fw-bold mb-3" style={{color:'#788504ff'}}>Contact Us</h5>
                <p>Email: support@ecochain.com</p>
                <p>Phone: +94 70 197 9380</p>
                <p>Address: Colombo, Sri Lanka</p>
            </Col>

            {/* Useful Links Column */}
            <Col md={3} className="text-center text-md-start mb-4 mb-md-0">
                <h5 className="fw-bold mb-3" style={{color:'#788504ff'}}>Useful Links</h5>
                <ul className="list-unstyled">
                    <li>
                        <a href="http://www.doa.gov.lk/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>
                          Department of Agriculture
                        </a>
                    </li>
                    <li>
                        <a href="http://www.agriinfo.gov.lk/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>
                          Agriculture Information Portal
                        </a>
                    </li>
                    <li>
                        <a href="http://www.fao.org/sri-lanka/en/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>
                          FAO Sri Lanka
                        </a>
                    </li>
                </ul>
            </Col>

            {/* Map Column */}
            <Col md={3} className="text-center text-md-start">
                <h5 className="fw-bold mb-3" style={{color:'#788504ff'}}>Department of Agriculture</h5>
                <iframe
                  title="Department of Agriculture Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.876524093652!2d80.5983783156792!3d7.271005394690162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae250ad118fc3c7%3A0x29d40e4f0937f22a!2sDepartment%20of%20Agriculture%2C%20Peradeniya%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1695369630000!5m2!1sen!2sus"
                  width="100%"
                  height="150"
                  style={{ border: 0, borderRadius: '8px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </Col>
        </Row>

        <hr style={{ borderColor: '#555' }} />

        {/* Bottom Text */}
        <Row>
          <Col className="text-center">
            <p className="mb-0">© {new Date().getFullYear()} ecoChain. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
