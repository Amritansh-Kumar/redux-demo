import {combineReducers} from 'redux'
import userInputReducer from "./userInputReducer";

const rootReducer = combineReducers({
    userInput: userInputReducer,
})

export default rootReducer