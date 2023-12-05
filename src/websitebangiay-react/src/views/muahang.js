// MuaHang.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios';
import '../assets/styles/muahang.css'; // Import tệp CSS
const host = "https://provinces.open-api.vn/api/";

const MuaHang = () => {
    const { state } = useLocation();
    const giay = state?.giay;
    const soLuong = state?.soLuong;
    const size = state?.size;
    const image = state?.image;
    // console.log(giay.image)
    // console.log(state);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        phoneNumber: '',
        address: '',
        note: '',


    });
    const [orderTime, setOrderTime] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    // console.log('trist=>', district)
    // console.log('ward=>', ward)


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (["name", "phoneNumber", "address", "note", "province", "district", "ward"].includes(name)) {
            setCustomerInfo((prevInfo) => ({
                ...prevInfo,
                [name]: value,
            }));
        }
    };




    const generateRandomCustomerID = () => {
        // Lấy thời gian Unix (milliseconds)
        const randomPart = Math.floor(Math.random() * 100000);
        // Số ngẫu nhiên từ 0 đến 999
        return randomPart
    };


    const [customerID, setCustomerID] = useState(generateRandomCustomerID());



    // Fetch provinces on component mount
    useEffect(() => {
        axios.get(`${host}?depth=1`)
            .then((response) => {
                setProvinces(response.data);
                const data = response.data.name


            })
            .catch((error) => {
                console.error(error);
            });
    }, [host]);
    // Add host to the dependency array

    const handleProvinceChange = (provinceName, e) => {
        // Fetch districts based on selected province
        axios.get(`${host}p/${provinceName}?depth=2`)
            .then((response) => {
                console.log('tinh =>>', response.data.name)
                const province1 = response.data.name;
                setDistricts(response.data.districts);
                setCustomerInfo((prevInfo) => ({ ...prevInfo, province: province1 }));
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const handleDistrictChange = (provinceName, e) => {
        // Fetch districts based on selected province
        axios.get(`${host}d/${provinceName}?depth=2`)
            .then((response) => {
                console.log('huyen =>>', response.data.name)
                const dis = response.data.name;
                setWards(response.data.wards);
                setCustomerInfo((prevInfo) => ({ ...prevInfo, districts: dis }));
            })
            .catch((error) => {
                console.error(error);
            });
    };


    // const handleDistrictChange = (districtCode) => {
    //     // Fetch wards based on selected district
    //     axios.get(`${host}d/${districtCode}?depth=2`)
    //         .then((response) => {
    //             console.log('huyen =>>', response.data.name);
    //             const districtName = response.data.name;
    //             const fetchedDistricts = response.data.districts || []; // Ensure an array, even if it's empty
    //             const fetchedWards = response.data.wards || []; // Ensure an array, even if it's empty

    //             setDistricts(fetchedDistricts);
    //             setWards(fetchedWards);
    //             setCustomerInfo((prevInfo) => ({
    //                 ...prevInfo,
    //                 district: districtName,
    //                 ward: '', // Reset ward when district changes
    //             }));
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // };


    const sendDataToBackend = async () => {

        try {
            const response = await axios.post('http://localhost:3003/api/v1/product', {
                data: customerInfo,

                kichCo: size,
                customerID: customerID,
            });
            console.log('Success:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };







    const handleOrder = () => {
        const currentTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
        console.log("Thông tin người dùng:", customerInfo);
        console.log("Thông tin người dùng:", customerInfo.districts);

        setOrderTime(currentTime);
        // Call the printSelectedValues function to log the selected values
        console.log("currentTime after setOrderTime:", currentTime);
        // Additional logic to send customerInfo to the server or perform other actions
        alert('Cảm ơn bạn đã ủng hộ shop chúng mình')
        // Thông báo đặt hàng thành công
        // alert('Cảm ơn bạn đã đặt hàng!' + customerInfo.name + "  " + customerInfo.phoneNumber + "  " + customerInfo.province + "  " + customerInfo.district + "  " + customerInfo.ward + "  " + customerInfo.note);
    };

    const GIA = parseFloat(giay.GIA).toFixed(0);

    return (

        <div className="muahang-container">
            <a href="/some-valid-link" className='logo-muahang'><p>PhucShop</p></a>

            <div className='container-setup'>
                <div className="muahang-giay-info">
                    <form className="muahang-form">
                        <h5 className='thongtinh-muahang'>Thông tin giao hàng</h5>
                        <label className="muahang-label">

                            <input
                                type="text"
                                name="name"
                                value={customerInfo.name}
                                onChange={handleInputChange}

                                className="muahang-input hoten"
                                placeholder='Họ và tên'
                            />
                        </label> <br />
                        <label className="muahang-label">

                            <input
                                type="text"
                                name="phoneNumber"
                                value={customerInfo.phoneNumber}
                                onChange={handleInputChange}

                                className="muahang-input muahang-sdt"
                                placeholder='Số điện thoại '
                            />
                        </label>
                        <div className="container-tinhthanhvietnam">

                            <select className='tinhthanh'
                                name="province"
                                onChange={(e) => handleProvinceChange(e.target.value)}

                                value={customerInfo.provinces}
                            >
                                <option value="">Chọn</option>
                                {provinces && provinces.map((province) => (
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
                            <select
                                className='tinhthanh'
                                name="ward"
                                value={customerInfo.ward}
                                onChange={(e) => setCustomerInfo({ ...customerInfo, ward: e.target.value })}
                            >
                                <option value="">Chọn phường</option>
                                {wards.map((ward) => (
                                    <option key={ward.code} value={ward.name}>
                                        {ward.name}
                                    </option>
                                ))}
                            </select>

                        </div>
                        <label className="muahang-label">

                            <input
                                type="text"
                                name="address"
                                value={customerInfo.address}
                                onChange={handleInputChange}
                                className="muahang-input muahang-sonha" placeholder='Số nhà và tên đường'
                            />
                        </label> <br />
                        <label className="muahang-label">

                            <input
                                type="text"
                                name="note"
                                value={customerInfo.note}
                                onChange={handleInputChange}
                                className="muahang-input" placeholder='Ghi chú'
                            />
                        </label>
                        <p className='thanhtoan'>Hình thức thanh toán tại nhà</p>
                    </form>
                </div>
                <div className="muahang-customer-info">
                    <div className='hr-xoaydoc'></div>
                    <div className='thongtin-sanpham'>
                        <div className='thongtin-sanpham_2'>
                            <span className='discount-bannerr' >{soLuong}</span>
                            <img src={`http://localhost:3003/images/${giay.description}`} className='sanpham-img'></img>

                            <span className='sanpham-name'>Giày Thời Trang {giay.TENSANPHAM}  </span>
                            <span className='sanpham-price'>${GIA}</span>
                        </div>

                        <hr></hr>
                        <label className="muahang-magiamgia1">

                            <input
                                type="text"
                                name="name"


                                className="muahang-magiamhgia" placeholder='Mã giảm giá (nếu có)'
                            />
                            <button className='muahang-xacnhan'>Sử Dụng</button>
                        </label>
                        <hr></hr>
                        <div className='muahang-tamtinh'>  <span className='muahang-tamtinh1'>Tạm tính</span>

                            <span className='muahang-tamtinh3'>{GIA * soLuong} đ</span>  </div>
                        <div className='muahang-phivanchuyen'>
                            <span>Phí vận chuyển</span>
                            <span className='muahang-phivanchuyen1'>30,000đ</span>
                        </div>
                        <hr></hr>
                        <div className='muahang-tongcong'>
                            <span>Tổng cộng</span>
                            <span className='muahang-tongcong1'>{GIA * soLuong + 30000} đ</span>
                        </div>
                        <button type="button" onClick={() => { handleOrder(); sendDataToBackend(); generateRandomCustomerID() }} className="muahang-button">
                            Đặt Hàng
                        </button>

                    </div>





                </div>
            </div>
        </div >
    );
};

export default MuaHang;
