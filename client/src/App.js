import React from 'react';
import { Route, Routes, useLocation, BrowserRouter as Router } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Login from './components/Login';
import Join from './components/Join'; 
import Feed from './components/Feed';
import Register from './components/Register';
import MyPage from './components/MyPage';
import Menu from './components/Menu'; 

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/join' || location.pathname === '/';
  
  const userId = localStorage.getItem("userId"); // localStorage에서 userId 가져오기

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {!isAuthPage && <Menu userId={userId} />} {/* userId 전달 */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mypage/:id" element={<MyPage />} /> {/* ID를 포함한 경로 */}
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
