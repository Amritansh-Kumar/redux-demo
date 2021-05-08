import * as actions from "../actions/userFormActions"

export const initialState = {
    name: "",
    DOB: "",
    randomNumber: "",
    email: "",
    inputName: "",
    inputDOB: "",
    inputNumber: "",
    inputEmail: "",
    nameValidationMessage: "",
    DOBValidationMessage: "",
    numberValidationMessage: "",
    emailValidationMessage: "",
}

export default function userInputReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SUBMIT_USER_FORM:
            return {
                ...state,
                ...action.payload,
                inputName: "",
                inputDOB: "",
                inputNumber: "",
                inputEmail: ""
            }
        case actions.UPDATE_INPUT_NAME:
            return {...state, inputName: action.payload}
        case actions.UPDATE_INPUT_DOB:
            return {...state, inputDOB: action.payload}
        case actions.UPDATE_INPUT_NUMBER:
            return {...state, inputNumber: action.payload}
        case actions.UPDATE_INPUT_EMAIL:
            return {...state, inputEmail: action.payload}
        case actions.GET_VALIDATION_MESSAGES:
            return {...state, ...action.payload}
        default:
            return state
    }
}