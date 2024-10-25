const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

// 사용자 라우터 설정
app.use("/user", require("./route/userRoute")); // 사용자 관련 요청

app.listen(3100, () => {
    console.log("server start!");
});
