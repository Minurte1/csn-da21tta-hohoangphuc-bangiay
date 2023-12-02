import React, { useState, useEffect } from 'react';
import axios from 'axios';

const YourComponentName = () => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                // Thay đổi đường dẫn API tùy thuộc vào cách backend triển khai
                const response = await axios.get('/api/images/ten_anh.jpg');

                // Xử lý dữ liệu trả về từ backend
                const fetchedImageUrl = response.data.imageUrl || response.data;

                // Cập nhật state với URL ảnh
                setImageUrl(fetchedImageUrl);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        // Gọi hàm fetchImage khi component được mount
        fetchImage();
    }, []);

    return (
        <div>
            {/* Hiển thị ảnh nếu có URL */}
            {imageUrl && <img src={imageUrl} alt="Image" />}
        </div>
    );
};

export default YourComponentName;
