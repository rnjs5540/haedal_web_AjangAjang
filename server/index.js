const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const config = require('./config/key');
const { auth } = require('./middleware/auth');
const { User } = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());
app.use(cookieParser())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!!!!')
})

app.get('/api/hello', (req, res) => {
    res.send("안녕하세요~~");
})


app.post('/api/users/register', async (req, res) => {
    // 회원가입할 때 필요한 정보들을 클라에서 가져오면
    // 그것들을 db에 넣어준다.

    const user = new User(req.body)

    const result = await user.save().then(() => {
        res.status(200).json({
            success: true
        })
    }).catch((err)=>{
        res.json({ successs: false, err })
    })
    console.log(user.userId)
})

app.post('/api/users/login', (req, res) => {
    
    // 요청된 이메일이 DB에 있는지 확인
    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        
        // 요청된 이메일이 DB에 있다면 비밀번호가 맞는지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })

            // 비밀번호까지 맞다면 토큰생성
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);

                // user안에 들어있는 토큰을 저장한다. 어디에? 쿠키, 로컬 스토리지, etc
                res.cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess: true, userId: user._id })
            })
        })
    })
    .catch((err) => {
        return res.status(400).send(err);
    })
})


// role 1 어드민    role 2 특정 부서 어드민
// role 0 일반유저  role 0 아니면 관리자
app.get('/api/users/auth', auth, (req, res) => {
    // 여기까지 미들웨어 통과해 왔다 == Authentication이 True이다.
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})


app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" })
    .then(() => {
        return res.status(200).send({ success: true });
    })
    .catch((err) => {
        return res.json({ success: false, err });
    });
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})