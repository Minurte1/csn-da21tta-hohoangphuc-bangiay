const connection = require('../config/database')
const getAllSanPham = async () => {

    let [results, fields] = await (await connection).execute('select * from SANPHAM ')
    return results;
}
const getAllHang = async () => {

    let [results, fields] = await (await connection).execute('select * from HANG ')
    return results;
}
const getUpdateSanPhamID = async (MASP, tenSanpham, TENHANG, GIA, MOTA, MALOAI, SIZE, SOLUONG) => {

    console.log('teensp', tenSanpham)
    let [results, fields] = await (await connection).query(
        `UPDATE SANPHAM 
         SET TENSANPHAM = ?, TENHANG = ?, GIA = ?, description = ?, MALOAI = ?, GIATRI = ?, SOLUONG = ? 
         WHERE MASP = ?;`,
        [tenSanpham, TENHANG, GIA, MOTA, MALOAI, SIZE, SOLUONG, MASP]
    );
    return results;
}

const getHang = async (Tenhang) => {
    const [results, fields] = await (await connection).execute(`INSERT INTO HANG (TENHANG) VALUES (?);`, [Tenhang],)

    return results;
}
const getSize = async (Size) => {
    const [results, fields] = await (await connection).execute(`INSERT INTO KICHCO (GIATRI) VALUES (?);`, [Size],)

    return results;
}

// ---------LOAI SAN SPHAM----------------
const getLoaisanpham = async (idLoaiSP, tenLoaiSP) => {
    const [results, fields] = await (await connection).execute(`INSERT INTO LOAI (MALOAI,name) VALUES (?,?);`, [idLoaiSP, tenLoaiSP],)

    return results;
}

const getAllLoaiSP = async () => {

    let [results, fields] = await (await connection).execute('select * from LOAI ')
    return results;
}
// ---------------------------






const getUserById = async (userID) => {


    const [results, fields] = await (await connection).query('SELECT * FROM User WHERE id = ?', [userID]);

    return results;
}
module.exports = {
    getAllSanPham,
    getUpdateSanPhamID,
    getUserById,
    getHang,
    getSize,
    getLoaisanpham,
    getAllLoaiSP,
    getAllHang
};