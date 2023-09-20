const { User } = require('../models/User')

let auth = (req, res, next) => {

    // 인증 처리 하는 곳
    // 클라이언트 쿠키에서 토큰 가져온다.
    let token = req.cookies.x_auth;

    // 토큰을 복호화 한 후 유저를 찾는다
    User.findByToken(token, (err, user) => {
		if(err) throw err;
		if(!user) return res.json({ isAuth: false, error: true });
		
		req.token = token;
		req.user = user;  /*여기서 req에 넣음으로써 index.js에서
							req.user, req.token으로 사용가능*/
		next();  /*미들웨어 탈출할 수 있게*/
	});
}

module.exports = { auth };