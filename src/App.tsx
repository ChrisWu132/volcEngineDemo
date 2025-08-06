/**
 * Copyright 2025 Beijing Volcano Engine Technology Co., Ltd. All Rights Reserved.
 * SPDX-license-identifier: BSD-3-Clause
 */

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import '@arco-design/web-react/dist/css/arco.css';
import PasswordProtect from './components/PasswordProtect';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check session storage on initial load
    const authStatus = sessionStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  console.warn('运行问题可参考 README 内容进行排查');

  if (!isAuthenticated) {
    return <PasswordProtect onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <BrowserRouter>
      <Helmet>
        <link rel="icon" href="/favicon.png" />
      </Helmet>
      <Routes>
        <Route path="/">
          <Route index element={<MainPage />} />
          <Route path="/*" element={<MainPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
