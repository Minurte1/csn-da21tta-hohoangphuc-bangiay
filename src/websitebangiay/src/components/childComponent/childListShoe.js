import { useNavigate } from 'react-router-dom';
import "./listShoe.css"
export const handleItemClick = (shoe, navigate) => {
    // Chuyển hướng đến trang chi tiết của sản phẩm khi sản phẩm được nhấp vào
    console.log("=>>", shoe.id, shoe.name, shoe.image, shoe.price);
    navigate(`/thongtinchitietgiay/${shoe.id}`, { state: shoe });
};

export const renderShoeItem = (shoe, handleItemClick) => {
    return (
        <li key={shoe.id} onClick={() => handleItemClick(shoe)}>
            <img src={shoe.image} alt={shoe.name} />
            <h3>{shoe.name}</h3>
            <p>Price: ${shoe.price}</p>
        </li>
    );
};

export const ShoeList = ({ shoes }) => {
    const navigate = useNavigate();

    return (
        <div className="shoe-list">
            <h2>Shoe Collection</h2>
            <ul>
                {shoes.map((shoe) => renderShoeItem(shoe, () => handleItemClick(shoe, navigate)))}
            </ul>
        </div>
    );
};
