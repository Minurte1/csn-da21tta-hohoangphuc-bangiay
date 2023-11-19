// ThongTinChiTietGiay.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import '../assets/styles/thongtinchitietgiay.css'; // Import tệp CSS

const ThongTinChiTietGiay = () => {
    const { state } = useLocation();

    const handleClickMuaHang = (event) => {
        event.preventDefault();
        alert('Chúc mừng bạn đã mua hàng thành công');
        // Thêm mã xử lý mua hàng của bạn ở đây nếu cần
    };

    return (
        <div className="container">

            <div className="product-info">
                <form>
                    <p>Product ID: {state.id}</p>
                    <p>Name: {state.name}</p>
                    <p>Image: <img className="product-image" src={state.image} alt={state.name} /></p>
                    <p>Price: ${state.price}</p>

                    <button className="purchase-button" onClick={handleClickMuaHang}>Mua Hàng</button>
                </form>
            </div>
        </div>
    );
};

export default ThongTinChiTietGiay;
