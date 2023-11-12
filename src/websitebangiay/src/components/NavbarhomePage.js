// Navbar.js
import '../assets/styles/NavBar.css'
import React, { useState } from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import logoNavbar from '../assets/image/logoNavbar.png' // Thay đổi phần mở rộng tệp dựa trên loại tệp thực tế

const MyNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className='navbar'>  <Navbar color="light" light expand="md" >
            <NavbarBrand href="logoNavBar"> <img src={logoNavbar} /></NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/about">About</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/contact">Contact</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar> </div>

    );
};

export default MyNavbar;
