import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types';

export default function (state={}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload }
            /*...(Spread Operator): 똑같이 가져오기*/
        case REGISTER_USER:
            return { ...state, register: action.payload}
        case AUTH_USER:
            return { ...state, userData: action.payload}
        default:
            return state;
    }
}