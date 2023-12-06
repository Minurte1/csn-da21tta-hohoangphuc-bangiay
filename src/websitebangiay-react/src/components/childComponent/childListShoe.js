import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./listShoe.css";

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
            <p id='CLS-tensp'>{shoe.TENSANPHAM}</p>
            <p>{price}đ</p>
        </li>
    );
};

export const ShoeList = ({ shoes }) => {
    console.log('check=>>>>', shoes);
    console.log(typeof shoes);
    const navigate = useNavigate();

    if (!shoes || !shoes.data || !Array.isArray(shoes.data) || shoes.data.length === 0) {
        return <div>No shoes available</div>;
    }

    return (
        <div className="shoe-list">
            <h2>Shoe Collection</h2>
            <ul>
                {shoes.data.map((shoe) => renderShoeItem(shoe, navigate))}
            </ul>
        </div>
    );
};
