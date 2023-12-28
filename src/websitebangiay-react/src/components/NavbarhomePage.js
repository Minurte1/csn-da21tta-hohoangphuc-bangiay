// // divbar.js
// import '../assets/styles/NavBar.css'
// import React, { useState } from 'react';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

// const MyNavbar = () => {
//     // const [isOpen, setIsOpen] = useState(false);

//     // const toggle = () => {
//     //     setIsOpen(!isOpen);
//     // };

//     return (
//         <div className='navbar' id='navbar'>
//             <div color="light" light expand="md" className='nav'>
//                 <div className='isOpen'>
//                     {/* <img src={LogoNavbar} alt="Logo" className='image-navbar' /> */}
//                     <a className='image-navbar' href='/'>
//                         PhucShoe
//                     </a>
//                     <div className="ml-auto" >
//                         <a href="/" className='nav-item nav-item1'>Giới Thiệu</a>
//                         <a href="/nu-sanpham" className='nav-item nav-item1'>Nữ</a>
//                         <a href="/nam-sanpham" className='nav-item nav-item2'>Nam</a>
//                         {/* <a href="/contact" className='nav-item'>Trẻ em</a> */}
//                         <a href="/tatca-sanpham" className='nav-item nav-item4'>Tất Cả</a>

//                     </div>
//                     <div className='cart-div'>  <a href="/cart"><FontAwesomeIcon icon={faCartShopping} className='font-awe' /></a></div>

//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MyNavbar;

// divbar.js
import '../assets/styles/NavBar.css';
import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

class MyNavbar extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         isOpen: false,
    //     };
    // }

    // toggle = () => {
    //     this.setState(prevState => ({
    //         isOpen: !prevState.isOpen,
    //     }));
    // };

    render() {
        return (
            <div className='navbar' id='navbar'>
                <div color="light" light expand="md" className='nav'>
                    <div className='isOpen'>
                        {/* <img src={LogoNavbar} alt="Logo" className='image-navbar' /> */}
                        <a className='image-navbar' href='/'>
                            PhucShoe
                        </a>
                        <div className="ml-auto">
                            <a href="/" className='nav-item nav-item1'>Giới Thiệu</a>
                            <a href="/nu-sanpham" className='nav-item nav-item1'>Nữ</a>
                            <a href="/nam-sanpham" className='nav-item nav-item2'>Nam</a>
                            {/* <a href="/contact" className='nav-item'>Trẻ em</a> */}
                            <a href="/tatca-sanpham" className='nav-item nav-item4'>Tất Cả</a>
                        </div>
                        <div className='cart-div'>
                            <a href="/">
                                <FontAwesomeIcon icon={faCartShopping} className='font-awe' />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyNavbar;

