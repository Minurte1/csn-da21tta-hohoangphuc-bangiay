import { useNavigate } from 'react-router-dom';
import "./listShoeSeal.css"
export const handleItemClick = (shoe, navigate) => {
    // Chuyển hướng đến trang chi tiết của sản phẩm khi sản phẩm được nhấp vào
    console.log("=>>", shoe.id, shoe.name, shoe.image, shoe.price);
    navigate(`/thongtinchitietgiayseal/${shoe.id}`, { state: shoe });
};

export const renderShoeItem = (shoe, handleItemClick) => {
    return (
        <li key={shoe.id} onClick={() => handleItemClick(shoe)}>
            <div className='discount-banner'>Giảm {shoe.seal}%</div>
            <img src={shoe.image} alt={shoe.name} />
            <h3>{shoe.name}</h3>
            <p>Price: <span className="shoe-list_seal">${shoe.price}</span></p>
            <p className="discounted-price">${((shoe.price * ((100 - shoe.seal) / 100))).toFixed(2)}</p>
        </li>
    );
};


export const ShoeListSeal = ({ shoes }) => {
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


