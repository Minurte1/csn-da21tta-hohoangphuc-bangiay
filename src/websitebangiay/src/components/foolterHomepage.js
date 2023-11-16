import React from "react";
import "../assets/styles/FooterHomepage.css"

function Footer() {
    return (
        <>
            <hr></hr>
            <div className="container-footer">

                <p className="logo">phuc_magin2px</p>
                <div className="foolter">
                    <div className="footer-thongtinlienhe">Thông Tin Liên Hệ
                        <p>Địa chỉ:   Tỉnh Trà Vinh</p>
                        <p>Email: hohoangphucjob@gmail.com</p>
                        <p>Hotline: 037248322</p>
                    </div>
                    <div className="footer-chinhsach">Chính Sách
                        <p>Bảo hành 12 tháng</p>
                        <p>Đổi trả sau 3 ngày </p>
                        <p>Miễn ship cho lần đầu mua hàng</p>
                    </div>
                    <div className="footer-hotro">Hỗ Trợ <p><a href="/">Tuyển dụng</a></p> </div>
                    <div className="footer-mangxahoi">Mạng xã hội<p><a href="/">Facebook</a></p>
                        <p><a href="/">Instagram</a></p>
                        <p><a href="/">Tiktok</a></p></div>
                </div></div>
        </>

    );
}
export default Footer;