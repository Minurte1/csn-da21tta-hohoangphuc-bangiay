// const { Query } = require('mysql2/typings/mysql/lib/protocol/sequences/Query');
const connection = require('../config/database');
const mysql = require('mysql2/promise');
const pool = require('../config/old');
const { get } = require('../routers/web');
const { getDonHang, getInfoUser, getAllSanPham, getAllHang, getUpdateSanPhamID, getAllLoaiSP } = require('../services/CRUDServices');
const { format } = require('date-fns');
const { query } = require('express');


const getUpdatePage = async (req, res) => {

    const idSanpham = req.params.id;
    const [results, fields] = await (await connection).query('SELECT * FROM SANPHAM WHERE MASP = ?', [idSanpham]);
    console.log('=>>> ', results)
    let user = results && results.length > 0 ? results[0] : {};
    // { userEdit: user }
    res.render('edit.ejs')
}
const getChonSanPham = async (req, res) => {
    const idSanpham = req.params.id;
    const [results, fields] = await (await connection).query('SELECT * FROM SANPHAM WHERE MASP = ? ', [idSanpham]);
    console.log('=>>> ', results)
    let Sanpham = results && results.length > 0 ? results[0] : {};

    let allSanpham = await getAllSanPham();
    res.render('edit.ejs', { SanphamEdit: Sanpham, AllSanpham: allSanpham })
}
// Đảm bảo route được đăng ký trước middleware `getAllProduct`


// Middleware `getAllProduct`

const getHomepagee = async (req, res) => {

    let results = await getAllSanPham();
    let AllLoaiSPP = await getAllLoaiSP()
    console.log('>> check rows', results);
    return res.render('home.ejs', { listSanpham: results, AllHangSP: AllLoaiSPP })
    // res.json(JSON.stringify(results))


}





//----------------LOAI SAN PHAM ---------------
const getCreateLoaiSP = async (req, res) => {
    const AllLSPP = await getAllLoaiSP();
    ;
    res.render('createLoaiSP.ejs', { AllLoaiSP: AllLSPP })
}
const getAppcetLoaiSP = async (req, res) => {
    var tenLSP = req.body.tenLoaiSP;

    console.log('check idLSP => ', tenLSP);

    // try {
    const [results, fields] = await (await connection).execute(`INSERT INTO LOAI (name) VALUES (?);`, [tenLSP]);


    const AllLSPP = await getAllLoaiSP();
    res.render('createLoaiSP.ejs', { AllLoaiSP: AllLSPP })
    // } catch (error) {
    //     console.error('Error executing MySQL query:', error);
    //     res.status(500).send('Internal Server Error');
    // }
}
const getDeleteLoaiSP = async (req, res) => {
    var productID = req.params.id;
    console.log('>> productID = ', productID);

    const [results, fields] = await (await connection).query('DELETE FROM LOAI WHERE MALOAI = ?', [productID]);
    const AllLSPP = await getAllLoaiSP();
    res.render('createLoaiSP.ejs', { AllLoaiSP: AllLSPP })
}




const getABC = (req, res) => {
    res.send('Hello Controller i am ABC');
}

const getHoangphucdethuong = (req, res) => {
    res.send('Em phuc ssssssssssss ');
}
const getSameple = (req, res) => {
    res.render('sample.ejs')
}
const postCreateSanpham = async (req, res) => {
    var thongtinsanpham = req.body.thongtinsanpham;
    var Gia = req.body.Gia;
    var tenSanpham = req.body.tenSanpham;
    // var Mota = req.file.filename;
    var Soluong = req.body.Soluong;
    var Loaisanpham = req.body.MALOAI
    var Size = req.body.Size;
    var Tenhang = req.body.Tenhang // Lọc giá trị
    console.log('hang', Tenhang)
    console.log('LOAISP', Loaisanpham)
    // connection.execute(
    //     `INSERT INTO User (email,name,city) VALUES (?,?,?);`,
    //     [email, name, city],
    //     function (err, results) {
    //         console.log(results);
    //         res.send('create a new users suseud');

    //     });
    // await getLoaisanpham(Loaisanpham);
    // await getHang(Tenhang);
    // await getSize((Size))
    // let AllHangSP = await getAllHang()
    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    } else if (!req.file) {
        return res.status(400).json({ error: "Please select an image to upload" });
    }
    try {
        const [countResults, countFields] = await (await connection).execute('SELECT COUNT(*) AS TotalProducts FROM SANPHAM');
        const [results, fields] = await (await connection).execute(`INSERT INTO SANPHAM (TENSANPHAM,TENHANG,GIA,description,MALOAI,GIATRI,SOLUONG,THONGTINSANPHAM) VALUES (?,?,?,?,?,?,?,?);`, [tenSanpham, Tenhang, Gia, req.file.filename, Loaisanpham, Size, Soluong, thongtinsanpham],

        );
        const [countMWCResults, countMWCFields] = await (await connection).execute('SELECT COUNT(*) AS TotalMWCProducts FROM SANPHAM WHERE TENHANG = ?', ['MWC']);

        // Lấy giá trị số lượng sản phẩm có HANG là 'MWC' từ kết quả truy vấn
        const totalMWCProductss = countMWCResults[0].TotalMWCProducts;
        const totalProductss = countResults[0].TotalProducts;

        const [mostHangResults, mostHangFields] = await (await connection).execute(`
        SELECT TENHANG, COUNT(*) AS TotalProducts
        FROM SANPHAM
        GROUP BY TENHANG
        ORDER BY TotalProducts DESC
        LIMIT 1;
    `);

        // Lấy giá trị HANG có số lượng sản phẩm nhiều nhất từ kết quả truy vấn
        const mostHang = mostHangResults[0];

        // Thực hiện truy vấn để thống kê số lượng sản phẩm theo LOAI nhiều nhất
        const [mostLoaiResults, mostLoaiFields] = await (await connection).execute(`
        SELECT MALOAI, COUNT(*) AS TotalProducts
        FROM SANPHAM
        GROUP BY MALOAI
        ORDER BY TotalProducts DESC
        LIMIT 1;
    `);

        // Lấy giá trị LOAI có số lượng sản phẩm nhiều nhất từ kết quả truy vấn
        const mostLoai = mostLoaiResults[0];

        // Thực hiện truy vấn để thống kê số lượng sản phẩm theo SIZE nhiều nhất
        const [mostSizeResults, mostSizeFields] = await (await connection).execute(`
        SELECT GIATRI, COUNT(*) AS TotalProducts
        FROM SANPHAM
        GROUP BY GIATRI
        ORDER BY TotalProducts DESC
        LIMIT 1;
    `);

        // Lấy giá trị SIZE có số lượng sản phẩm nhiều nhất từ kết quả truy vấn
        const mostSize = mostSizeResults[0];
        const [totalPriceResults, totalPriceFields] = await (await connection).execute(`
        SELECT SUM(GIA) AS TotalPrice
        FROM SANPHAM;
    `);

        // Lấy giá trị tổng giá tiền từ kết quả truy vấn
        const totalPrice = totalPriceResults[0].TotalPrice;
        const Tien = parseFloat(totalPrice).toFixed(0);
        var so1 = parseFloat(Tien);
        const price1 = so1.toLocaleString();
        console.log(">>results ", results);
        let getHang = await getAllHang();
        let AllLoaiSPP = await getAllLoaiSP()
        let AllSP = await getAllSanPham();
        res.render('create.ejs', { totalPrice: price1, mostHang, mostLoai, mostSize, AllHangSP: getHang, AllLoaiSP: AllLoaiSPP, listSanpham: AllSP, totalProducts: totalProductss, totalMWCProducts: totalMWCProductss });
        // res.redirect("/");
    }

    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};




//.....................HANG SP...............................................
const getCreateHangSP = async (req, res) => {
    var tenHangSP = req.body.tenHangSP;
    if (tenHangSP === "") {
        const AllHangSPP = await getAllHang()
        res.render('createHangSP.ejs', { AllHangSP: AllHangSPP })
    }
    let results = await getAllHang()

    return res.render('createHangSP', { AllHangSP: results })

}
const getAppcetHangSP = async (req, res) => {
    var tenHangSP = req.body.tenHangSP;
    if (tenHangSP === undefined) {
        const AllHangSPP = await getAllHang()
        res.render('createHangSP.ejs', { AllHangSP: AllHangSPP })
    }
    try {


        const [results, fields] = await (await connection).execute(
            `INSERT INTO HANG (TENHANG) VALUES (?);`,
            [tenHangSP]
        );

        const AllHangSPP = await getAllHang();
        res.render('createHangSP.ejs', { AllHangSP: AllHangSPP });
    } catch (error) {


        // You can customize the error message or rendering behavior based on the error type.
        const AllHangSPP = await getAllHang()
        res.render('createHangSP.ejs', { AllHangSP: AllHangSPP })

    }
};

const getDeleteHangSP = async (req, res) => {
    var productID = req.params.id;
    console.log('>> productID = ', productID);

    const [results, fields] = await (await connection).query('DELETE FROM HANG WHERE TENHANG = ?', [productID]);
    const AllHangSPP = await getAllHang()
    // res.render('createHangSP.ejs', { AllHangSP: AllHangSPP })
    res.redirect('/')
}



const getUpdateSanpham = async (req, res) => {
    var MASP = req.body.MASP
    var tenSanpham = req.body.TENSANPHAM;
    var TENHANG = req.body.TENHANG;
    var GIA = req.body.GIA;
    var MOTA = req.body.thongtinsanpham;
    var MALOAI = req.body.MALOAI;
    var SIZE = req.body.SIZE;
    var SOLUONG = req.body.SOLUONG;

    var image = req.file.filename
    console.log('check MOTA', MOTA)
    console.log('hinh ne', image)
    await getUpdateSanPhamID(MASP, tenSanpham, TENHANG, GIA, MOTA, MALOAI, SIZE, SOLUONG, image);



    res.redirect('/');


};
// const postDeleteUser = async (req, res) => {

//     const usersID = req.params.id;
//     const [results, fields] = await (await connection).query('SELECT * FROM User WHERE id = ?', [usersID]);
//     console.log('=>>> ', results)
//     let user = results && results.length > 0 ? results[0] : {};
//     res.render('delete.ejs', { userEdit: user })

// }
const getCreatePage = async (req, res) => {
    try {
        const [countResults, countFields] = await (await connection).execute('SELECT COUNT(*) AS TotalProducts FROM SANPHAM');

        const [countMWCResults, countMWCFields] = await (await connection).execute('SELECT COUNT(*) AS TotalMWCProducts FROM SANPHAM WHERE TENHANG = ?', ['MWC']);

        // Lấy giá trị số lượng sản phẩm có HANG là 'MWC' từ kết quả truy vấn
        const totalMWCProductss = countMWCResults[0].TotalMWCProducts;
        const totalProductss = countResults[0].TotalProducts;

        const [mostHangResults, mostHangFields] = await (await connection).execute(`
        SELECT TENHANG, COUNT(*) AS TotalProducts
        FROM SANPHAM
        GROUP BY TENHANG
        ORDER BY TotalProducts DESC
        LIMIT 1;
    `);

        // Lấy giá trị HANG có số lượng sản phẩm nhiều nhất từ kết quả truy vấn
        const mostHang = mostHangResults[0];

        // Thực hiện truy vấn để thống kê số lượng sản phẩm theo LOAI nhiều nhất
        const [mostLoaiResults, mostLoaiFields] = await (await connection).execute(`
        SELECT MALOAI, COUNT(*) AS TotalProducts
        FROM SANPHAM
        GROUP BY MALOAI
        ORDER BY TotalProducts DESC
        LIMIT 1;
    `);

        // Lấy giá trị LOAI có số lượng sản phẩm nhiều nhất từ kết quả truy vấn
        const mostLoai = mostLoaiResults[0];

        // Thực hiện truy vấn để thống kê số lượng sản phẩm theo SIZE nhiều nhất
        const [mostSizeResults, mostSizeFields] = await (await connection).execute(`
        SELECT GIATRI, COUNT(*) AS TotalProducts
        FROM SANPHAM
        GROUP BY GIATRI
        ORDER BY TotalProducts DESC
        LIMIT 1;
    `);
        const [totalPriceResults, totalPriceFields] = await (await connection).execute(`
        SELECT SUM(GIA) AS TotalPrice
        FROM SANPHAM;
    `);

        // Lấy giá trị tổng giá tiền từ kết quả truy vấn
        const totalPricee = totalPriceResults[0].TotalPrice;
        const Tien = parseFloat(totalPricee).toFixed(0);
        var so1 = parseFloat(Tien);
        const price1 = so1.toLocaleString();
        // Lấy giá trị SIZE có số lượng sản phẩm nhiều nhất từ kết quả truy vấn
        const mostSize = mostSizeResults[0];
        let results = await getAllHang();
        let AllLoaiSPP = await getAllLoaiSP()
        let AllSP = await getAllSanPham();

        res.render('create.ejs', { totalPrice: price1, AllHangSP: results, AllLoaiSP: AllLoaiSPP, listSanpham: AllSP, totalProducts: totalProductss, mostHang, mostLoai, mostSize, totalMWCProducts: totalMWCProductss });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const postHandleRemoveSanpham = async (req, res) => {
    try {
        var productID = req.params.id;
        console.log('>> productID = ', productID);

        const [results, fields] = await (await connection).query('DELETE FROM SANPHAM WHERE MASP = ?', [productID]);
        console.log('>> results', results);

        // Nếu xóa thành công, chuyển hướng đến trang /edit
        res.redirect('/');
    } catch (error) {
        console.error('Error deleting product:', error.message);
        res.status(500).send('Internal Server Error');
    }
}
//  ----------------------- USER ---------------------------------
const InfoUser = async (req, res) => {
    let getUser = await getInfoUser();
    res.render('InfoUser.ejs', { User: getUser })
}
const getItemUser = async (req, res) => {
    const maKhachHang = req.params.id; // Sử dụng phương thức này nếu mã khách hàng được truyền qua URL
    console.log(maKhachHang)
    try {
        // Lấy mã khách hàng từ request hoặc từ nơi khác

        // Truy vấn MADONHANG từ bảng DONHANG dựa trên MAKHACHHANG
        const [donHangResults, donHangFields] = await (await connection).query(
            'SELECT MADONHANG FROM DONHANG WHERE MAKHACHHANG = ?',
            [maKhachHang]
        );
        console.log(donHangResults)
        // Kiểm tra xem có đơn hàng nào hay không
        if (donHangResults.length === 0) {
            res.status(404).json({ error: 'Không tìm thấy đơn hàng cho mã khách hàng này' });
            return;
        }

        // Lấy MADONHANG từ kết quả đầu tiên (đơn hàng đầu tiên, có thể có nhiều hơn một đơn hàng)
        const madonhang = donHangResults[0].MADONHANG;
        console.log(madonhang)
        // Truy vấn thông tin chi tiết đơn hàng từ bảng CHITIETDONHANG
        const [chitietDonHangResults, chitietDonHangFields] = await (await connection).query(
            'SELECT * FROM CHITIETDONHANG WHERE MADONHANG = ?',
            [madonhang]
        );

        // Kiểm tra xem có chi tiết đơn hàng nào hay không
        if (chitietDonHangResults.length === 0) {
            res.status(404).json({ error: 'Không tìm thấy chi tiết đơn hàng cho mã đơn hàng này' });
            return;
        }

        // Render trang với thông tin chi tiết đơn hàng
        res.render('Chitietdonhang.ejs', { CTDonHang: chitietDonHangResults });
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const getAllDonHang = async (req, res) => {

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
const getAllChiTietDonHang = async (req, res) => {
    const idDon = req.params.id;
    const [results, fields] = await (await connection).query('SELECT * FROM CHITIETDONHANG WHERE MADONHANG = ?', [idDon]);
    console.log(results)


    try {
        // Lấy mã khách hàng từ request hoặc từ nơi khác

        // Truy vấn MADONHANG từ bảng DONHANG dựa trên MAKHACHHANG
        const [donHangResults, donHangFields] = await (await connection).query(
            'SELECT MADONHANG FROM DONHANG WHERE MADONHANG = ?',
            [idDon]
        );
        console.log('=>CHECHDONHANG', donHangResults)
        // Kiểm tra xem có đơn hàng nào hay không
        if (donHangResults.length === 0) {
            res.status(404).json({ error: 'Không tìm thấy đơn hàng cho mã khách hàng này' });
            return;
        }

        // Lấy MADONHANG từ kết quả đầu tiên (đơn hàng đầu tiên, có thể có nhiều hơn một đơn hàng)
        const maDonHang = donHangResults[0].MADONHANG;
        console.log(maDonHang)

        const [chitietDonHangResults, chitietDonHangFields] = await (await connection).query(
            'SELECT * FROM DONHANG WHERE MADONHANG = ?',
            [maDonHang]
        );
        console.log(chitietDonHangResults)
        if (chitietDonHangResults.length === 0) {
            res.status(404).json({ error: 'Không tìm thấy chi tiết đơn hàng cho mã đơn hàng này' });
            return;
        }
        const maKhachHang = chitietDonHangResults[0].MAKHACHHANG;
        console.log(maKhachHang)
        const [Khachhang, KhachhangFields] = await (await connection).query(
            'SELECT * FROM KHACHHANG WHERE MAKHACHHANG = ?',
            [maKhachHang]
        );

        res.render('Chitietdonhang.ejs', { CTDonHang: results, User: Khachhang })
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }


}



const postHomePage = async (req, res) => {
    let { TenSP, Tenhang, MaLoai, Size } = req.body;

    let sqlQuery = `
        SELECT sp.MASP, sp.TENSANPHAM, sp.TENHANG, sp.GIA,sp.description,sp.MALOAI, sp.GIATRI, sp.SOLUONG, sp.THONGTINSANPHAM
        FROM SANPHAM as sp
        WHERE 1=1`;

    if (TenSP) {
        sqlQuery += ` AND sp.TENSANPHAM LIKE '%${TenSP}%'`;
    }

    if (Tenhang) {
        sqlQuery += ` AND sp.TENHANG = '${Tenhang}'`;
    }

    if (MaLoai) {
        sqlQuery += ` AND sp.MALOAI = ${MaLoai}`;
    }

    if (Size) {
        sqlQuery += ` AND sp.GIATRI = ${Size}`;
    }

    try {
        const [rows, fields] = await pool.query(sqlQuery);
        return res.render('Tim.ejs', { listSanpham: rows });
    } catch (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Internal Server Error');
    }
}



// Đừng quên đóng kết nối sau khi sử dụng
// connection.end();


module.exports = {
    // getAllProduct,
    getABC,
    getHoangphucdethuong,
    getSameple,
    postCreateSanpham,
    getCreatePage,
    getUpdatePage,
    getUpdateSanpham,
    // postDeleteUser,
    postHandleRemoveSanpham,
    getHomepagee,
    getChonSanPham,
    //----------LOAI SP---------------
    getCreateLoaiSP,
    getAppcetLoaiSP,
    getDeleteLoaiSP,

    //  --------- HANG SP ------------
    getCreateHangSP,
    getAppcetHangSP,
    getDeleteHangSP,
    //  --------- USER ------------
    InfoUser,
    getItemUser,


    //  --------- DonHang ------------
    getAllDonHang,
    getAllChiTietDonHang,
    postHomePage,

}