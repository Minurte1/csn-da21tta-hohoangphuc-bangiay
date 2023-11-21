import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import "../assets/styles/muahang.css"
const MuaHang = () => {
    const { state } = useLocation();
    const giay = state?.giay;
    const soLuong = state?.soLuong;
    const size = state?.size;

    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        phoneNumber: '',
        address: '',
        note: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    };

    const handleOrder = () => {
        // Thực hiện xử lý đặt hàng, có thể gửi thông tin đơn hàng và thông tin khách hàng lên server

        // Ví dụ: Hiển thị thông tin đơn hàng và thông tin khách hàng trong console
        console.log('Thông tin đơn hàng:', {
            giay,
            soLuong,
            size,
            customerInfo
        });

        // Thêm logic xử lý đặt hàng ở đây

        // Chuyển hướng hoặc hiển thị thông báo thành công nếu cần
    };

    return (
        <div>
            <h2>Trang Mua Hàng</h2>
            <p>Thông tin giày: {giay?.name}</p>
            <p>Số lượng: {soLuong}</p>
            <p>Size: {size}</p>

            <h3>Thông tin khách hàng</h3>
            <form>
                <label>
                    Tên:
                    <input
                        type="text"
                        name="name"
                        value={customerInfo.name}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Số điện thoại:
                    <input
                        type="text"
                        name="phoneNumber"
                        value={customerInfo.phoneNumber}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Địa chỉ:
                    <input
                        type="text"
                        name="address"
                        value={customerInfo.address}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Ghi chú:
                    <textarea
                        name="note"
                        value={customerInfo.note}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="button" onClick={handleOrder}>
                    Đặt Hàng
                </button>
            </form>
        </div>
    );
};

export default MuaHang;
