// divbar.js
import '../assets/styles/NavBar.css'
import React, { useState } from 'react';
import LogoNavbar from '../assets/image-logo/logoNavbar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const MyNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='navbar' id='navbar'>
            <div color="light" light expand="md" className='nav'>
                <div isOpen={isOpen} className='isOpen'>
                    {/* <img src={LogoNavbar} alt="Logo" className='image-navbar' /> */}
                    <a className='image-navbar'>
                        Phuc_Magin2px
                    </a>
                    <div className="ml-auto" >
                        <a href="/" className='nav-item nav-item1'>Nữ</a>
                        <a href="/about" className='nav-item nav-item2'>Nam</a>
                        <a href="/contact" className='nav-item'>Trẻ em</a>
                        <a href="/contact" className='nav-item nav-item4'>Tất Cả</a>

                    </div>
                    <div className='cart-div'>  <a href="/cart"><FontAwesomeIcon icon={faCartShopping} className='font-awe' /></a></div>

                </div>
            </div>
        </div>
    );
};

export default MyNavbar;
