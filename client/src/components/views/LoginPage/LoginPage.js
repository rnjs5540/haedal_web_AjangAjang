import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth'

function LoginPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("") /*최초 상태 */
  const [Password, setPassword] = useState("")
  
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }  
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }
  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: Email,
      password: Password
    }

    dispatch(loginUser(body))
    .then(response => {
      if (response.payload.loginSuccess) {
        navigate('/') /*리액트에선 페이지 이동 이렇게함 */
      } else {
        alert('Error')
      }
    })
  }


  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center'
      , width: '100%', height: '100vh'
    }}>
      <form style={{display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmitHandler}  /*onSubmitHandler를 아래 button에 적으면 안되나?? */
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <br />
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default Auth(LoginPage, false);