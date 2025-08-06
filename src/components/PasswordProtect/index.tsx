import React, { useState } from 'react';
import { Button, Input, Message } from '@arco-design/web-react';
import styles from './index.module.less';

// For simplicity, the password is read from environment variables.
// In a real-world scenario, this should be handled more securely.
const CORRECT_PASSWORD = process.env.REACT_APP_ACCESS_PASSWORD;

interface PasswordProtectProps {
  onSuccess: () => void;
}

function PasswordProtect({ onSuccess }: PasswordProtectProps) {
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === CORRECT_PASSWORD) {
      Message.success('验证成功');
      sessionStorage.setItem('isAuthenticated', 'true');
      onSuccess();
    } else {
      Message.error('密码错误，请重试');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>请输入访问密码</h2>
        <Input.Password
          value={password}
          onChange={setPassword}
          onKeyPress={handleKeyPress}
          placeholder="请输入密码"
          size="large"
        />
        <Button
          type="primary"
          long
          size="large"
          className={styles.loginButton}
          onClick={handleLogin}
        >
          进 入
        </Button>
      </div>
    </div>
  );
}

export default PasswordProtect; 