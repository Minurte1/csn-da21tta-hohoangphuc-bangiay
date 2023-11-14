// Navbar.js
import '../assets/styles/NavBar.css'
import React, { useState } from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import logoNavbar from '../assets/image-logo/logoNavbar.png';

const MyNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='navbar' id='navbar'>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="logoNavBar"> <img src={logoNavbar} alt="Logo" className='image-navbar' /></NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/" id='nav-item'>Nam</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/about" id='nav-item'>Nữ</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/contact" id='nav-item'>Trẻ em</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/contact" id='nav-item'>Tất Cả</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div >
    );
};

export default MyNavbar;
