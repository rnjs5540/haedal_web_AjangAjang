import { combineReducers } from "redux";
import user from './user_reducer';
//import comment from './comment_reducer';

/*여러가지 Reducer를 CombineReducer를 이용해 하나의 Root Reducer로 합쳐주기*/
const rootReducer = combineReducers({
    user
	//comment
})

export default rootReducer;