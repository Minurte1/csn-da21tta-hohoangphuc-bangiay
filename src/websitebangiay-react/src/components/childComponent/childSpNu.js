import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./listShoe.css";
import "../childComponent/chillTatCaSP.css"

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

export const ChildSPNu = ({ shoes }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    if (!shoes || !shoes.data || !Array.isArray(shoes.data) || shoes.data.length === 0) {
        return <div>No shoes available</div>;
    }

    // Filter the list based on the search term
    const filteredShoes = shoes.data.filter(shoe =>
        shoe.TENSANPHAM.toLowerCase().includes(searchTerm.toLowerCase()) && shoe.MALOAI === 16
    );

    return (
        <div className="shoe-list">
            <h2 className='tieude' id='tieude_tatcasp'>Sản Phẩm Nữ</h2>
            <input
                className='input-timSP'
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <hr></hr>
            <ul>
                {filteredShoes.map((shoe) => renderShoeItem(shoe, navigate))}
            </ul>
            <hr></hr>
        </div>
    );
};
