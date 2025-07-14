import React, { useContext } from 'react'
import { Container, Nav, Navbar } from "react-bootstrap";
import "./index.css";
import { Outlet } from 'react-router-dom';
import { IoSunny } from "react-icons/io5";
import { FaCloud } from "react-icons/fa";
import { GoSun } from "react-icons/go";
import { FaRegMoon } from "react-icons/fa";
import { useLayoutContext } from '../Context/context';

function Navbarmenu() {
  const { theme, setLightTheme, setDarkTheme } = useLayoutContext()
  return (
    <div>
    <Navbar expand="lg" className="glass-navbar" fixed="top">
      <Container>
        <Navbar.Brand className="icon text-white d-flex align-items-center me-auto">
        <p className='fontnav'>Weather Now</p> 
          <div className='icon-stack me-2'>
          <IoSunny size={35} className="ms-2 sunicon" />
          <FaCloud size={32} className="ms-2 cloudicon" />
          </div>
        </Navbar.Brand>
        <div className='theme-toggle-center d-flex align-items-center mx-auto'>
          { theme === "light" ? (
            <IoSunny size={30} color='#ffd44b'className="mx-2 theme-toggle-icon"
            title="Day Mode" onClick={setLightTheme} />
           ) 
            : (
              <GoSun size={24} color='#ffd44b'className="mx-2 theme-toggle-icon"
              title="Day Mode" onClick={setLightTheme} />
            ) 
          }
        
        <FaRegMoon size={24} color='#ffffff'className="mx-2 theme-toggle-icon"
            title="Night Mode" onClick={setDarkTheme} />
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light ms-auto" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home" className="nav-link-custom">Home</Nav.Link>
            <Nav.Link href="#forecast" className="nav-link-custom"> Forecast</Nav.Link>
            <Nav.Link href="#about" className="nav-link-custom">About</Nav.Link>
            <Nav.Link href="#contact" className="nav-link-custom">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className="content">
    <Outlet/>
    </div>
    </div>
  )
}

export default Navbarmenu