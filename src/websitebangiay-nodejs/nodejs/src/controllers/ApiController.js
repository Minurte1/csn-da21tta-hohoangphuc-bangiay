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

const getProduct = async (req, res) => {
    try {
        console.log('body', req.body)
        const { data } = req.body;

        const { orderTime, size, ...customerInfo } = data;
        console.log(req.body.kichCo)

        console.log(req.body.orderTime)

        const { name, phoneNumber, address, note, province, districts, ward } = customerInfo;
        const getaddress = address + ", " + ward + ", " + districts + ", " + province;
        console.log(getaddress);
        const [results, fields] = await (await connection).query(
            'INSERT INTO KHACHHANG (TEN, SODIENTHOAI, DIACHI, GHICHU) VALUES (?, ?, ?, ?)',
            [name, phoneNumber, getaddress, note] // Thêm giá trị orderTime vào câu truy vấn
        );

        res.json({ message: 'Data received and inserted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = { getAllProduct, getProduct }; // Export as an object
