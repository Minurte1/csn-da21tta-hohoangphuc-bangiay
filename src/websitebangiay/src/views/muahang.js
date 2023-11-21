// MuaHang.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/muahang.css'; // Import tệp CSS
const host = "https://provinces.open-api.vn/api/";

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

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    };

    useEffect(() => {
        // Fetch provinces on component mount
        axios.get(`${host}?depth=1`)
            .then((response) => {
                setProvinces(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleProvinceChange = (provinceCode) => {
        // Fetch districts based on selected province
        axios.get(`${host}p/${provinceCode}?depth=2`)
            .then((response) => {
                setDistricts(response.data.districts);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleDistrictChange = (districtCode) => {
        // Fetch wards based on selected district
        axios.get(`${host}d/${districtCode}?depth=2`)
            .then((response) => {
                setWards(response.data.wards);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleOrder = () => {
        // Thực hiện xử lý đặt hàng
        // ...
    };

    return (

        <div className="muahang-container">
            <a className='logo-muahang'><p>PhucShop</p></a>
            <div className='container-setup'>
                <div className="muahang-giay-info">
                    <form className="muahang-form">
                        <p className='thongtinh-muahang'>Thông tin giao hàng</p>
                        <label className="muahang-label">

                            <input
                                type="text"
                                name="name"
                                value={customerInfo.name}
                                onChange={handleInputChange}
                                className="muahang-input"
                                placeholder='Họ và tên'
                            />
                        </label> <br />
                        <label className="muahang-label">

                            <input
                                type="text"
                                name="name"
                                value={customerInfo.name}
                                onChange={handleInputChange}
                                className="muahang-input"
                                placeholder='Số điện thoại'
                            />
                        </label>
                        <div className="container-tinhthanhvietnam">

                            <select className='tinhthanh'
                                name="province"
                                onChange={(e) => handleProvinceChange(e.target.value)}
                                value={customerInfo.province}
                            >
                                <option value="">Chọn</option>
                                {provinces.map((province) => (
                                    <option key={province.code} value={province.code}>
                                        {province.name}
                                    </option>
                                ))}
                            </select>  <br />
                            <select
                                name="district" className='tinhthanh'
                                onChange={(e) => handleDistrictChange(e.target.value)}
                                value={customerInfo.district}
                            >
                                <option value="">Chọn quận</option>
                                {districts.map((district) => (
                                    <option key={district.code} value={district.code}>
                                        {district.name}
                                    </option>
                                ))}
                            </select> <br />
                            <select className='tinhthanh'
                                name="ward"
                                onChange={(e) => setCustomerInfo({ ...customerInfo, ward: e.target.value })}
                                value={customerInfo.ward}
                            >
                                <option value="">Chọn phường</option>
                                {wards.map((ward) => (
                                    <option key={ward.code} value={ward.code}>
                                        {ward.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <label className="muahang-label">

                            <input
                                type="text"
                                name="name"
                                value={customerInfo.name}
                                onChange={handleInputChange}
                                className="muahang-input" placeholder='Số nhà và tên đường'
                            />
                        </label> <br />
                        <label className="muahang-label">

                            <input
                                type="text"
                                name="name"
                                value={customerInfo.name}
                                onChange={handleInputChange}
                                className="muahang-input" placeholder='Ghi chú'
                            />
                        </label>
                        <p>Hình thức thanh toán tại nhà</p>
                    </form>
                </div>
                <div className="muahang-customer-info">
                    <button type="button" onClick={handleOrder} className="muahang-button">
                        Đặt Hàng
                    </button>
                </div>
            </div>
        </div >
    );
};

export default MuaHang;
