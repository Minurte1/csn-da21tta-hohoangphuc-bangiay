import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./listShoe.css";
import "../childComponent/chillTatCaSP.css";

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

export const AllShoeList = ({ shoes, hang }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
    const [selectedBrand, setSelectedBrand] = useState('');

    if (!shoes || !shoes.data || !Array.isArray(shoes.data) || shoes.data.length === 0 || !hang) {
        return <div>No shoes available</div>;
    }

    // Convert the object 'hang' to an array of objects
    const hangArray = Object.keys(hang).map(key => ({ TENHANG: key, ...hang[key] }));

    // Filter the list based on the search term and selected brand
    const filteredShoes = shoes.data.filter(shoe =>
        shoe.TENSANPHAM.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedBrand === '' || selectedBrand === 'Tất cả' || shoe.TENHANG === selectedBrand)
    );

    // Sort the list based on the current sortOrder
    const sortedShoes = [...filteredShoes].sort((a, b) => {
        const priceA = parseFloat(a.GIA);
        const priceB = parseFloat(b.GIA);

        if (sortOrder === 'asc') {
            return priceA - priceB;
        } else {
            return priceB - priceA;
        }
    });

    // Get unique brands from the data
    const uniqueBrands = ['Tất cả', ...new Set(shoes.data.map(hang => hang.TENHANG))];
    console.log(uniqueBrands)
    console.log('check hang', selectedBrand)
    return (
        <div className="shoe-list">
            <h2 className='tieude' id='tieude_tatcasp'>Tất Cả Sản Phẩm</h2>
            <div>
                <input
                    className='input-timSP'
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    className={`button-sort ${sortOrder === 'asc' ? 'asc' : 'desc'}`}
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                >
                    Sắp xếp theo giá {sortOrder === 'asc' ? 'tăng dần' : 'giảm dần'}
                </button>
            </div>
            <div className="dropdown-container">
                <label className="label-brand" htmlFor="brandFilter">Chọn hãng:</label>
                <select
                    id="brandFilter"
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="select-brand"
                >
                    {uniqueBrands.map((brand, index) => (
                        <option key={index} value={brand}>{brand}</option>
                    ))}
                </select>
            </div>

            <hr></hr>
            <ul>
                {sortedShoes.map((shoe) => renderShoeItem(shoe, navigate))}
            </ul>
            <hr></hr>
        </div>
    );
};
