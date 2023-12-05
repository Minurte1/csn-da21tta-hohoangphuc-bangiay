
const connection = require('../config/database');
const { format } = require('date-fns');

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

const generateRandomCustomerID = () => {
    return Math.floor(Math.random() * 1000) + 1;
};

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

        await getDonHang(Time, newId);

        res.json({ message: 'Data received and inserted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = { getAllProduct, getProduct }; // Export as an object
