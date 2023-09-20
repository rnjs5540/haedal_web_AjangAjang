import axios from 'axios';
/*타입.js에서 타입 가져오는 식으로 */
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types';

export function loginUser(dataToSubmit) {

    /*서버에서 받은 데이터(loginSuccess, userId)를 request에 저장 */
    const request = axios.post('/api/users/login', dataToSubmit)
    .then(response => response.data)

    /*Reducer로 보내야 함 (reducer: 전상태+action=>다음상태)
													(action 역할) */
    /*action은 {type: 어쩌고, response: 저쩌고} 형태 */
    return {
        type: LOGIN_USER,
        payload: request
        /*payload == response라고 함 */
    }
}

export function registerUser(dataToSubmit) {

    const request = axios.post('/api/users/register', dataToSubmit)
    .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function auth() {

    const request = axios.get('/api/users/auth')
    .then(response => response.data)

    return {
        type: AUTH_USER,
        payload: request
    }
}

