// AdminLogin.js
import React, { useState } from 'react';

const AdminLogin = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Thực hiện xác thực đăng nhập ở đây (có thể sử dụng API, local storage, etc.)
        // Nếu xác thực thành công, gọi hàm onLogin
        onLogin();
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <form>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="button" onClick={handleLogin}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
