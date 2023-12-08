import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './views/homePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
// import MyNavbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ThongTinChiTietGiay from './views/thongtinchitietgiay';
import Footer from './components/foolterHomepage';
import MyNavbar from './components/NavbarhomePage';
import MuaHang from './views/muahang';
import ThongTinChiTietGiaySeal from './views/thongtinchitietgiayseal';
import MuaHangSeal from './views/muahangseal';
import AdminLogin from './views/loginAdmin';
import ListShoe from './components/listShoe';
import TuyenDungPage from './views/TuyenDung';
import AllSP from '../src/views/TatCaSanPham'
import SPNu from './views/SpNu';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>


    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <HomePage></HomePage>
            </>
          }
        />
        <Route path="/thongtinchitietgiay/:shoes" element={<><MyNavbar /><ThongTinChiTietGiay /> < ListShoe></ListShoe>   <Footer /></>} />
        <Route path="/thongtinchitietgiayseal/:shoes" element={<><MyNavbar /><ThongTinChiTietGiaySeal />    <Footer /></>} />
        <Route path="/muahang/:id" element={<><MyNavbar></MyNavbar><MuaHang></MuaHang> <Footer></Footer></>} />
        <Route path="/muahangseal/:id" element={<MuaHangSeal></MuaHangSeal>} />
        <Route path="/admin" element={<AdminLogin></AdminLogin>} />
        <Route path="/tuyendung" element={<> <TuyenDungPage></TuyenDungPage></>} />
        <Route path="/tatca-sanpham" element={<><AllSP></AllSP></>} />
        <Route path="/nu-sanpham" element={<><SPNu></SPNu></>} />
      </Routes>
    </Router>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
