const connection = require('../config/database');
const { get } = require('../routers/web');
const { getAllSanPham, getAllHang, getUpdateSanPhamID, getAllLoaiSP } = require('../services/CRUDServices');


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
    res.render('edit', { SanphamEdit: Sanpham, AllSanpham: allSanpham })
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
        res.redirect("/");
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
    var MOTA = req.body.MOTA;
    var MALOAI = req.body.MALOAI;
    var SIZE = req.body.SIZE;
    var SOLUONG = req.body.SOLUONG;



    await getUpdateSanPhamID(MASP, tenSanpham, TENHANG, GIA, MOTA, MALOAI, SIZE, SOLUONG);



    res.redirect('/');


};
const postDeleteUser = async (req, res) => {

    const usersID = req.params.id;
    const [results, fields] = await (await connection).query('SELECT * FROM User WHERE id = ?', [usersID]);
    console.log('=>>> ', results)
    let user = results && results.length > 0 ? results[0] : {};
    res.render('delete.ejs', { userEdit: user })

}
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


module.exports = {
    // getAllProduct,
    getABC,
    getHoangphucdethuong,
    getSameple,
    postCreateSanpham,
    getCreatePage,
    getUpdatePage,
    getUpdateSanpham,
    postDeleteUser,
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
}