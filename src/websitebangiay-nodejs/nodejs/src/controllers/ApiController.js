
const connection = require('../config/database');
const { format } = require('date-fns');
const { get } = require('../routers/web');
const { getAllDonHang } = require('../controllers/homeControllers')
const { getDonHang, getInfoUser, getAllHang } = require('../services/CRUDServices')

const getAllProduct = async (req, res) => {
    try {
        const getAllSanPham = async () => {
            try {
                const [results, fields] = await (await connection).execute('SELECT * FROM SANPHAM');
                return results;
            } catch (error) {
                console.error('Error in getAllSanPham:', error.message);
                throw error; // Re-throw the error to handle it at a higher level if needed
            }
        };

        let results = await getAllSanPham();
        const hangList = await getAllHang();
        const productsWithImageUrls = results.map((product) => ({
            ...product,
            imageUrl: `http://localhost:3003/images/${product.description}`,
        }));

        return res.status(200).json({
            message: "ok",
            data: productsWithImageUrls,
            hang: hangList,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
const getDonHangg = async (Time, id, MaSP, SoluongDaMua, Tongtien) => {
    let idKhachHang = id;
    console.log('time=>', Time)
    let IdDonHang;
    let isIdUnique = false;
    try {
        // Kiểm tra xem giá trị thời gian có tồn tại không
        if (!Time) {
            throw new Error('Giá trị thời gian không hợp lệ');
        }

        do {
            IdDonHang = generateRandomCustomerID();
            try {
                console.log(IdDonHang)
                const [results, fields] = await (await connection).query(
                    'INSERT INTO DONHANG (MADONHANG, MAKHACHHANG, NGAYDONHANG) VALUES (?,?,?)',
                    [IdDonHang, idKhachHang, Time]);

                isIdUnique = true; // Nếu không có lỗi thì thoát khỏi vòng lặp
                if (isIdUnique = true) {
                    await getChiTietDonHang(IdDonHang, MaSP, SoluongDaMua, Tongtien);
                }
            } catch (insertError) {
                // Nếu lỗi không phải Duplicate entry thì throw lỗi
                if (insertError.code !== 'ER_DUP_ENTRY') {
                    throw insertError;
                }
                // Nếu là Duplicate entry thì làm lại vòng lặp với id mới

            }
        } while (!isIdUnique);


        console.log('Dữ liệu đã nhận và chèn thành công');

    } catch (error) {
        console.error('Lỗi:', error);
        // Thêm phần xử lý lỗi ở đây nếu cần
        // Nếu bạn muốn trả lỗi về client, bạn có thể sử dụng res.status(500).json({ error: '...' });
    }


};


const DeleteDonHang = async (req, res) => {
    var productID = req.params.id;
    console.log('>> productID = ', productID);
    await (await connection).query('DELETE FROM CHITIETDONHANG WHERE MADONHANG = ?', [productID]);
    const [results, fields] = await (await connection).query('DELETE FROM DONHANG WHERE MADONHANG = ?', [productID]);

    const DonHangne = await getDonHang();
    const formatOrderTime = (order) => {
        try {
            const dateObject = new Date(order.NGAYDONHANG);
            if (!isNaN(dateObject)) {
                return format(dateObject, 'yyyy-MM-dd HH:mm:ss');
            } else {
                console.error(`Giá trị thời gian không hợp lệ cho đơn hàng ${order.MADONHANG}`);
                return 'Không hợp lệ';
            }
        } catch (error) {
            console.error(`Lỗi khi chuyển đổi thời gian cho đơn hàng ${order.MADONHANG}:`, error.message);
            return 'Không hợp lệ';
        }
    };

    // Sử dụng hàm formatOrderTime trong quá trình chuyển đổi mảng đơn hàng
    const formattedOrders = DonHangne.map((order) => ({
        ...order,
        formattedTime: formatOrderTime(order),
    }));

    // console.log(formattedOrders);


    res.render('DonHang.ejs', { DonHang: formattedOrders })

}


const getChiTietDonHang = async (IdDonHang, MaSP, SoluongDaMua, Tongtien) => {
    const [results, fields] = await (await connection).query(
        'INSERT INTO CHITIETDONHANG (MADONHANG,MASP,SOLUONG,THANHTIEN) VALUES (?,?,?,?)',
        [IdDonHang, MaSP, SoluongDaMua, Tongtien]);

}
const generateRandomCustomerID = () => {
    return Math.floor(Math.random() * 1000) + 1;
};
const getDeleteUser = async (req, res) => {
    try {
        var productID = req.params.id;
        console.log('>> productID = ', productID);

        const [results, fields] = await (await connection).query('DELETE FROM KHACHHANG WHERE MAKHACHHANG = ?', [productID]);

        let getUser = await getInfoUser();
        res.render('InfoUser.ejs', { User: getUser });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Vui Lòng Xóa Dữ Liệu Ở Đơn Hàng Trước !');
    }
}

const getProduct = async (req, res) => {
    try {

        const currentTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
        console.log('body', req.body)
        const { data } = req.body;

        const { orderTime, size, ...customerInfo } = data;
        console.log(req.body.kichCo)

        console.log(currentTime)
        console.log(req.body.customerID)
        let id = req.body.customerID;
        let Time = currentTime;
        let MaSP = req.body.IdSP
        let SoluongDaMua = req.body.SoluongDaMua;
        let Tongtien = req.body.Tongtien
        const { name, phoneNumber, address, note, province, districts, ward } = customerInfo;
        const getaddress = address + ", " + ward + ", " + districts + ", " + province;

        let isIdUnique = false;
        let newId;

        // Thử insert dữ liệu và kiểm tra xem có lỗi Duplicate entry hay không
        do {
            newId = generateRandomCustomerID();
            try {
                const [insertResults, insertFields] = await (await connection).query(
                    'INSERT INTO KHACHHANG (MAKHACHHANG,TEN, SODIENTHOAI, DIACHI, GHICHU) VALUES (?,?, ?, ?, ?)',
                    [newId, name, phoneNumber, getaddress, note]
                );
                isIdUnique = true; // Nếu không có lỗi thì thoát khỏi vòng lặp
            } catch (insertError) {
                // Nếu lỗi không phải Duplicate entry thì throw lỗi
                if (insertError.code !== 'ER_DUP_ENTRY') {
                    throw insertError;
                }
                // Nếu là Duplicate entry thì làm lại vòng lặp với id mới
            }
        } while (!isIdUnique);

        await getDonHangg(Time, newId, MaSP, SoluongDaMua, Tongtien);

        res.json({ message: 'Data received and inserted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = { getAllProduct, getProduct, DeleteDonHang, getDeleteUser }; // Export as an object
