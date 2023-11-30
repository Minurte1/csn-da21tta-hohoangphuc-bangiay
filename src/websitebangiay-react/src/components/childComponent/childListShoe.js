import { useNavigate } from 'react-router-dom';
import "./listShoe.css";

export const handleItemClick = (shoe, navigate) => {
    console.log("Item clicked:", shoe);
    // Chuyển hướng đến trang chi tiết của sản phẩm khi sản phẩm được nhấp vào
    // console.log("=>>", shoe.MASP, shoe.TENSANPHAM, shoe.scription, shoe.GIA);
    navigate(`/thongtinchitietgiay/${shoe.id}`, { state: shoe });
};

export const renderShoeItem = (shoe, navigate) => {
    console.log("Rendering shoe item:", shoe);

    return (
        <li key={shoe.MASP} onClick={() => handleItemClick(shoe, navigate)}>
            <h3>{shoe.TENSANPHAM}</h3>
            <p>Tên Hãng: {shoe.TENHANG}</p>
            <p>Price: {shoe.GIA}</p>
            <p>Loại: {shoe.MALOAI}</p>

            <img src={`/src/public/images/${shoe.description}`} alt={shoe.TENSANPHAM} />

        </li>
    );
};

export const ShoeList = ({ shoes }) => {
    console.log('check=>>>>', shoes);
    const navigate = useNavigate();
    return (
        <div className="shoe-list">
            <h2>Shoe Collection</h2>

            <ul>
                {Array.isArray(shoes) && shoes.length > 0 ? (
                    shoes.map((shoe) => renderShoeItem(shoe, navigate))
                ) : (
                    <li>No shoes available</li>
                )}
            </ul>
        </div>
    );
};
