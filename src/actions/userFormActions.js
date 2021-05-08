export const SUBMIT_USER_FORM = "SUBMIT_USER_FORM";
export const UPDATE_INPUT_NAME = "UPDATE_INPUT_NAME";
export const UPDATE_INPUT_DOB = "UPDATE_INPUT_DOB";
export const UPDATE_INPUT_NUMBER = "UPDATE_INPUT_NUMBER";
export const UPDATE_INPUT_EMAIL = "UPDATE_INPUT_EMAIL";
export const GET_VALIDATION_MESSAGES = "GET_VALIDATION_MESSAGES";


export const submitUserForm = (userForm) => ({
    type: SUBMIT_USER_FORM,
    payload: userForm,
})

export const updateInputName = (name) => ({
    type: UPDATE_INPUT_NAME,
    payload: name,
});

export const updateInputDOB = (dob) => ({
    type: UPDATE_INPUT_DOB,
    payload: dob,
});

export const updateInputNumber = (inputNumber) => ({
    type: UPDATE_INPUT_NUMBER,
    payload: inputNumber,
});

export const updateInputEmail = (email) => ({
    type: UPDATE_INPUT_EMAIL,
    payload: email,
});

export const getValidationMessages = (validationMessages) => ({
    type: GET_VALIDATION_MESSAGES,
    payload: validationMessages,
});
