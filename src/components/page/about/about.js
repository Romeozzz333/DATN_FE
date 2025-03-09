import React from 'react';
import './about.scss';

const About = () => {
    return (
        <div className="about-container">
            {/* Section 1: Title and Introduction */}
            <h1>MUA RAU CỦ QUẢ TƯƠI SẠCH TẠI HÀ NỘI - BEEGREEN GIỚI THIỆU</h1>
            <p>
                Không còn lo lắng về rau bẩn, thực phẩm không rõ nguồn gốc, vì đã có{' '}
                <span className="highlight">#BEEGREEN.VN</span>: Rau củ quả sạch, đạt tiêu chuẩn hữu cơ, thu hoạch trong ngày, giao tận nhà.
            </p>
            <ul className="list-items">
                <li>
                    🌱 <strong>BEEGREEN.VN</strong>: Đổi trả trong 24h / Giao hàng miễn phí / Thanh toán khi nhận hàng / Cam kết 100% thực phẩm sạch!
                </li>
            </ul>
            <p>
                Đến với <span className="highlight">"BEEGREEN.VN"</span>, quý khách hàng sẽ nhận được sản phẩm tươi ngon nhất, dịch vụ tận tâm nhất và giá thành hợp lý nhất, cùng với
                <strong> “Chương Trình Khuyến Mãi Đặc Biệt”.</strong>
            </p>

            {/* Section 2: Image Showcase */}
            <div className="image-container">
                <img src="/imageAbout1.png" alt="Sản phẩm BeeGreen" />
            </div>

            <p>
                ⚡ <strong>BEEGREEN.VN</strong>: Rau củ tươi mới mỗi ngày / Giao hàng nhanh / Đảm bảo nguồn gốc xuất xứ rõ ràng!
            </p>
            <div className="image-container">
                <img src="/imageAbout2.png" alt="Nông trại BeeGreen" />
            </div>
            <p>
                🌿✨ <span className="highlight">BEEGREEN.VN "Tươi Ngon - Sạch - An Toàn"</span>!!! 🌱🌿🌼
            </p>
            <p>
                Đến với "BEEGREEN.VN" quý khách hàng sẽ luôn an tâm với thực phẩm sạch, phục vụ tận tình và các <strong>Chương Trình Khuyến Mãi Đặc Biệt.</strong>
            </p>
            <div className="image-container">
                <img src="/imageAbout3.png" alt="Nông trại BeeGreen" />
            </div>
        </div>
    );
};

export default About;
