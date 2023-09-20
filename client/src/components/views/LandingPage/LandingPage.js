import React, {useEffect} from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth'
import { auth } from '../../../_actions/user_action'

function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios.get('/api/hello')
  //   .then(response => console.log(response));
  // })

  const onLogoutHandler = () => {
    axios.get('/api/users/logout')
    .then(response => {
      if(response.data.success) {
        navigate('/login')
      } else {
        alert('로그아웃 실패했습니다')
      }
    })
  }

  // const onLoginHandler = () => {
  //   navigate('/login')
  // }

  function Component(props) {
    let isAuth;
    dispatch(auth()).then(response => {
      isAuth = response.payload.isAuth
      console.log(isAuth)
    })
    console.log(isAuth)

    if (isAuth)
      return (
        <button onClick={onLogoutHandler}>
          로그아웃
        </button>
      )
    else
      return (
        <button onClick={onLogoutHandler}>
          로그인
        </button>
      )
  }

  
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center'
      , width: '100%', height: '100vh'
    }}>
      <h2>시작 페이지</h2>
      <Component />
    </div>
  )

}

export default Auth(LandingPage, null);