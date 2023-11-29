import { useNavigate } from 'react-router-dom';
import "./listShoe.css"

export const handleItemClick = (shoe, navigate) => {
    // Chuyển hướng đến trang chi tiết của sản phẩm khi sản phẩm được nhấp vào
    // console.log("=>>", shoe.MASP, shoe.TENSANPHAM, shoe.scription, shoe.GIA);
    // navigate(`/thongtinchitietgiay/${shoe.id}`, { state: shoe });

};

export const renderShoeItem = (shoe, handleItemClick) => {

    return (
        <>
            <p>âsdasd</p>
            <li key={shoe.MASP} onClick={() => handleItemClick(shoe)}>
                <h3>{shoe.TENSANPHAM}</h3>
                <p>Tên Hãng {shoe.TENHANG}</p>
                <p>Price: {shoe.GIA}</p>
                <p>Loại {shoe.MALOAI}</p>
                <img src={shoe.scription} alt='' />
            </li>
        </>
    );
};


export const ShoeList = ({ shoesData }) => {
    const navigate = useNavigate();

    return (
        <div className="shoe-list">
            <h2>Shoe Collection</h2>

            <ul>

                {shoesData && shoesData.map((shoe) => renderShoeItem(shoe, handleItemClick(navigate)))}

            </ul>
        </div>
    );
};

