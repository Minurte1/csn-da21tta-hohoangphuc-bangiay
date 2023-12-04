
const connection = require('../config/database');

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

        const productsWithImageUrls = results.map((product) => ({
            ...product,
            imageUrl: `http://localhost:3003/images/${product.description}`,
        }));

        return res.status(200).json({
            message: "ok",
            data: productsWithImageUrls,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
const getDonHang = async (Time, id) => {
    let idKhachHang = id;
    console.log('time=>', Time)
    try {
        // Kiểm tra xem giá trị thời gian có tồn tại không
        if (!Time) {
            throw new Error('Giá trị thời gian không hợp lệ');
        }

        const [results, fields] = await (await connection).query(
            'INSERT INTO DONHANG (MAKHACHHANG, NGAYDONHANG) VALUES (?, ?)',
            [idKhachHang, Time]
        );

        // Thêm phần xử lý phản hồi ở đây nếu cần
        console.log('Dữ liệu đã nhận và chèn thành công');
    } catch (error) {
        console.error('Lỗi:', error);
        // Thêm phần xử lý lỗi ở đây nếu cần
        // Nếu bạn muốn trả lỗi về client, bạn có thể sử dụng res.status(500).json({ error: '...' });
    }
};

const getProduct = async (req, res) => {
    try {
        console.log('body', req.body)
        const { data } = req.body;

        const { orderTime, size, ...customerInfo } = data;
        console.log(req.body.kichCo)

        console.log(req.body.orderTime)
        console.log(req.body.customerID)
        let id = req.body.customerID
        let Time = req.body.orderTime
        const { name, phoneNumber, address, note, province, districts, ward } = customerInfo;
        const getaddress = address + ", " + ward + ", " + districts + ", " + province;
        console.log(getaddress);
        const [results, fields] = await (await connection).query(
            'INSERT INTO KHACHHANG (MAKHACHHANG,TEN, SODIENTHOAI, DIACHI, GHICHU) VALUES (?,?, ?, ?, ?)',
            [id, name, phoneNumber, getaddress, note] // Thêm giá trị orderTime vào câu truy vấn
        );


        await getDonHang(Time, id)



        res.json({ message: 'Data received and inserted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = { getAllProduct, getProduct }; // Export as an object
