import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./listShoeSeal.css";

export const handleItemClick = (shoe, navigate) => {
    console.log("Item clicked:", shoe);
    navigate(`/thongtinchitietgiay/${shoe.MASP}`, { state: shoe });
};

export const renderShoeItem = (shoe, navigate) => {
    console.log("Rendering shoe item:", shoe);

    // Làm tròn giá đến hai chữ số sau dấu thập phân
    const roundedPrice = parseFloat(shoe.GIA).toFixed(0);
    var so = parseFloat(roundedPrice);

    const price = so.toLocaleString();

    return (
        <li key={shoe.MASP} onClick={() => handleItemClick(shoe, navigate)}>
            <img src={`http://localhost:3003/images/${shoe.description}`} alt={shoe.TENSANPHAM} />
            <h3 id='tenSP'>{shoe.TENSANPHAM}</h3>
            <p>{price}đ</p>
        </li>
    );
};

export const ShoeListSeal = ({ shoes }) => {
    const navigate = useNavigate();

    if (!shoes || !shoes.data || !Array.isArray(shoes.data) || shoes.data.length === 0) {
        return <div>No shoes available</div>;
    }

    // Slice the array to get only the first 10 items
    const firstTenShoes = shoes.data.slice(0, 10);

    return (
        <div className="shoe-list">
            <h2 className='tieude'>Sản Phẩm Bán Chạy Nhất</h2>
            <hr></hr>
            <ul>
                {firstTenShoes.map((shoe) => renderShoeItem(shoe, navigate))}
            </ul>
            <hr></hr>
        </div>
    );
};