import {
    LOGIN_USER
} from '../_actions/types';

export default function (state={}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload }
            /*...(Spread Operator): 똑같이 가져오기*/
        default:
            return state;
    }
}