import React, { useState } from 'react';

function LoginForm() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  const handleAccountChange = (event) => {
    setAccount(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Đăng nhập:', { account, password });
    // Gửi dữ liệu đăng nhập lên backend (sẽ xử lý sau)
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login-account">Tài khoản/Email:</label>
          <input type="text" id="login-account" value={account} onChange={handleAccountChange} required />
        </div>
        <div>
          <label htmlFor="login-password">Mật khẩu:</label>
          <input type="password" id="login-password" value={password} onChange={handlePasswordChange} required />
        </div>
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
}

export default LoginForm;