const connection = require('../config/database');
const { get } = require('../routers/web');
const { getDonHang, getInfoUser, getAllSanPham, getAllHang, getUpdateSanPhamID, getAllLoaiSP } = require('../services/CRUDServices');
const { format } = require('date-fns');


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
    const [results, fields] = await (await connection).query('SELECT * FROM SANPHAM WHERE MASP = ?', [idSanpham]);
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
        const [results, fields] = await (await connection).execute(`INSERT INTO SANPHAM (TENSANPHAM,TENHANG,GIA,description,MALOAI,GIATRI,SOLUONG,THONGTINSANPHAM) VALUES (?,?,?,?,?,?,?,?);`, [tenSanpham, Tenhang, Gia, req.file.filename, Loaisanpham, Size, Soluong, thongtinsanpham],

        );

        console.log(">>results ", results);
        let getHang = await getAllHang();
        let AllLoaiSPP = await getAllLoaiSP()
        res.render('create.ejs', { AllHangSP: getHang, AllLoaiSP: AllLoaiSPP });
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
    let results = await getAllHang();
    let AllLoaiSPP = await getAllLoaiSP()
    res.render('create.ejs', { AllHangSP: results, AllLoaiSP: AllLoaiSPP });
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
    getAllChiTietDonHang

}