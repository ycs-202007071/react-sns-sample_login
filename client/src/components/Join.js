import React, { useRef } from 'react';
import { TextField, Button, Container, Typography, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Join() {
  const nameRef = useRef();
  const idRef = useRef();
  const pwdRef = useRef();
  const genderRef = useRef();
  const navigate = useNavigate(); // useNavigate 훅 사용

  async function handleJoin() {
    try {
      const res = await axios.post("http://localhost:3100/user/join", {
        name: nameRef.current.value,
        id: idRef.current.value,
        password: pwdRef.current.value,
        gender: genderRef.current.value,
      });
      if (res.data.success) {
        alert("회원가입 성공!");
        navigate("/login"); // 로그인 페이지로 이동
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log("오류 발생", err);
    }
  }

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h4" gutterBottom>
          회원가입
        </Typography>
        <TextField inputRef={nameRef} label="Name" variant="outlined" margin="normal" fullWidth />
        <TextField inputRef={idRef} label="ID" variant="outlined" margin="normal" fullWidth />
        <TextField
          inputRef={pwdRef}
          label="Password"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Gender</InputLabel>
          <Select inputRef={genderRef} label="Gender">
            <MenuItem value="M">Male</MenuItem>
            <MenuItem value="F">Female</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={handleJoin} variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
          회원가입
        </Button>
        <Typography variant="body2" style={{ marginTop: '10px' }}>
          이미 회원이라면? <Link to="/login">로그인</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Join;
