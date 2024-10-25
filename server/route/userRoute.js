const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router();
const connection = require('../db');
const JWT_KEY = "secret_key";

router.route("/")
    .post((req, res)=>{
      const { email, password } = req.body;
      const query = 'SELECT * FROM TBL_USER WHERE id = ? AND pwd = ?';    
      connection.query(query, [email, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
          // 로그인 성공한 경우
          const user = results[0];
          // 토큰 생성 
          // 첫번째 파라미터(페이로드) : 담고싶은 정보(비밀번호와 같은 중요한 데이터는 넣지 말 것)
          // 두번째 파라미터(키) : 위에서 선언한 서버의 비밀 키
          // 세번째 파라미터 : 만료 시간
          const token = jwt.sign({userId : user.id, name : user.name}, JWT_KEY, {expiresIn : '1h'});
          console.log(token);
          // 토큰 담아서 리턴
          res.json({ success: true, message: "로그인 성공!", token, userId: user.id });
        } else {
          // 로그인 실패
          res.json({ success: false, message: '실패!' });
        }
      });
    });

    router.route("/join")
    .post((req, res) => {
        const { name, id, password, gender } = req.body; // gender 추가

        // 중복 ID 체크
        const checkQuery = 'SELECT * FROM TBL_USER WHERE id = ?';
        connection.query(checkQuery, [id], (err, results) => {
            if (err) throw err;
            if (results.length > 0) {
                return res.json({ success: false, message: '이미 존재하는 ID입니다.' });
            }

            // 새로운 사용자 등록
            const insertQuery = 'INSERT INTO TBL_USER (name, id, pwd, gender) VALUES (?, ?, ?, ?)'; // gender 추가
            connection.query(insertQuery, [name, id, password, gender], (err, results) => {
                if (err) throw err;
                res.json({ success: true, message: '회원가입 성공!' });
            });
        });
    });

    // userRoute.js
    router.route("/myPage/:id")
    .get((req, res) => {
        const userId = req.params.id;
        console.log("Received user ID:", userId); // userId 출력
        
        const query = 'SELECT name, id, introduction FROM TBL_USER WHERE id = ?';
        connection.query(query, [userId], (err, results) => {
            if (err) {
                console.error("Database query error:", err);
                return res.status(500).json({ success: false, message: 'Internal Server Error' });
            }
            console.log("Query results:", results); // 쿼리 결과 출력
            if (results.length > 0) {
                res.json({ success: true, user: results[0] });
            } else {
                res.json({ success: false, message: '사용자를 찾을 수 없습니다.' });
            }
        });
    });


module.exports = router;