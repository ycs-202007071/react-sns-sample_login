import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Avatar, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MyPage() {
  const { id } = useParams(); // URL에서 ID 가져오기
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("Received user ID:", id); // ID 로그 추가
    const fetchUserData = async () => {
      try {
          const response = await axios.get(`http://localhost:3100/myPage/${id}`);   
        if (response.data.success) {
          setUser(response.data.user);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error('사용자 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchUserData();
  }, [id]);

  if (!user) {
    return <Typography>로딩 중...</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        minHeight="100vh"
        sx={{ padding: '20px' }}
      >
        <Paper elevation={3} sx={{ padding: '20px', borderRadius: '15px', width: '100%' }}>
          <Box display="flex" flexDirection="column" alignItems="center" sx={{ marginBottom: 3 }}>
            <Avatar
              alt="프로필 이미지"
              src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e" // 프로필 이미지 경로
              sx={{ width: 100, height: 100, marginBottom: 2 }}
            />
            <Typography variant="h5">{user.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              @{user.id}
            </Typography>
          </Box>
          <Box sx={{ marginTop: 3 }}>
            <Typography variant="h6">내 소개</Typography>
            <Typography variant="body1">{user.introduction || "소개가 없습니다."}</Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default MyPage;
