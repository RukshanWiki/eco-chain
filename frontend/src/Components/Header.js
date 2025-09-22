import React from 'react'
import logo from '../Images/LOGO.png'
import { Navbar, Nav, Container} from 'react-bootstrap'
//import RegisterModal from './RegisterModal'
//import LoginModal from './LoginModal'
import NavbarButtons from './NavbarButtons'

const Header = ({setIsLoggedIn, setUserRole}) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand href="#home" className="ms-3">
          <div>   
            <img src={logo} alt="ecoChain Logo" width="200" height="50" style={{ objectFit: 'contain' }} />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <div className='d-flex' style={{marginRight:'50px'}}>
                <Nav.Link href="#home" className='px-4'>Home</Nav.Link>
                <Nav.Link href="#about" className='px-4'>About Us</Nav.Link>
                <Nav.Link href="#calendar" className='px-4'>Calendar</Nav.Link>
                <Nav.Link href="#contact" className='px-4'>Contact</Nav.Link>
              </div>
            
          <div className="d-flex me-4">
            <NavbarButtons setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
          </div>  

            </Nav>
        </Navbar.Collapse>
      </Container>
      <br></br>
    </Navbar>
  )
}

export default Header


