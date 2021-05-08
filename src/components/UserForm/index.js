import React from "react";
import styles from "./UserForm.module.css"
import { connect, useDispatch } from "react-redux";
import {
    submitUserForm,
    updateInputName,
    updateInputDOB,
    updateInputNumber,
    updateInputEmail,
    getValidationMessages,
} from "../../actions/userFormActions"

const INPUT_REQUIRED_MESSAGE = "This Field is required!";
const NUMBER_VALIDATION_MESSAGE = "Enter a Number ranging from 0 to 100";
const INVALID_EMAIL_MESSAGE = "Enter a valid email address";

const EMAIL_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]+$/;

const UserForm = ({
                      inputName,
                      inputDOB,
                      inputNumber,
                      inputEmail,
                      nameValidationMessage,
                      DOBValidationMessage,
                      numberValidationMessage,
                      emailValidationMessage
    }) => {
    const dispatch = useDispatch()


    const fetchValidationMessages = (
        name, dob, favNum, email
    ) => {
        const validationMessages = {
            nameValidationMessage: "",
            DOBValidationMessage: "",
            numberValidationMessage: "",
            emailValidationMessage: "",
        }

        if (!name) {
            validationMessages.nameValidationMessage = INPUT_REQUIRED_MESSAGE;
        }
        if (!dob) {
            validationMessages.DOBValidationMessage = INPUT_REQUIRED_MESSAGE;
        }
        if (!favNum) {
            validationMessages.numberValidationMessage = INPUT_REQUIRED_MESSAGE;
        }
        if (!email) {
            validationMessages.emailValidationMessage = INPUT_REQUIRED_MESSAGE;
        }

        if (favNum < 0 || favNum > 100) {
            validationMessages.numberValidationMessage = NUMBER_VALIDATION_MESSAGE;
        }

        if (email && !EMAIL_REGEX.test(email)
        ) {
            validationMessages.emailValidationMessage = INVALID_EMAIL_MESSAGE;
        }

        return validationMessages;
    }

    const validationMessages = fetchValidationMessages(
        inputName, inputDOB, inputNumber, inputEmail
    )

    const onFocusValidator = (validationMessageProperty) => {
        dispatch(getValidationMessages({
            [validationMessageProperty]: ""
        }));
    }

    const onBlurValidator = (fieldValue, validationMessageProperty) => {
        if (!fieldValue.trim()) {
            dispatch(getValidationMessages({
                [validationMessageProperty]: INPUT_REQUIRED_MESSAGE
            }));
        }
    }

    return (
        <div className={styles.formContainer}>
            <form className={styles.form} >
                <div className={styles.inputContainer}>
                    <label className={styles.inputLabel}>*Name</label>
                    <input
                        className={styles.input}
                        type="text"
                        id="name"
                        name="name"
                        value={inputName}
                        required
                        onChange={(e) => {
                            dispatch(updateInputName(e.target.value))
                        }}
                        onFocus={() => onFocusValidator("nameValidationMessage")}
                        onBlur={(e) => onBlurValidator(e.target.value,"nameValidationMessage")}
                    />
                    {nameValidationMessage && (
                        <span
                            className={styles.validationMessage}
                        >
                            {nameValidationMessage}
                        </span>
                    )}
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.inputLabel}>*Date of birth</label>
                    <input
                        className={styles.input}
                        type="date"
                        id="DOB"
                        name="DOB"
                        value={inputDOB}
                        required
                        onChange={(e) => {
                            dispatch(updateInputDOB(e.target.value))
                        }}
                        onFocus={() => onFocusValidator("DOBValidationMessage")}
                        onBlur={(e) => onBlurValidator(e.target.value,"DOBValidationMessage")}
                    />
                    {DOBValidationMessage && (
                        <span
                            className={styles.validationMessage}
                        >
                            {DOBValidationMessage}
                        </span>
                    )}
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.inputLabel}>*Favourite Number</label>
                    <input
                        className={styles.input}
                        type="number"
                        id="favNumber"
                        name="favNumber"
                        value={inputNumber}
                        required
                        onChange={(e) => {
                            dispatch(updateInputNumber(e.target.value))
                            if (e.target.value < 0 || e.target.value > 100) {
                                dispatch(getValidationMessages(
                                    {
                                        numberValidationMessage: NUMBER_VALIDATION_MESSAGE
                                    }
                                ));
                            } else {
                                onFocusValidator("numberValidationMessage");
                            }
                        }}
                        onFocus={
                            (e) => {
                                if (e.target.value < 0 || e.target.value > 100) {
                                    dispatch(getValidationMessages(
                                        {
                                            numberValidationMessage: NUMBER_VALIDATION_MESSAGE
                                        }
                                    ));
                                } else {
                                    onFocusValidator("numberValidationMessage");
                                }
                            }
                        }
                        onBlur={(e) => onBlurValidator(e.target.value,"numberValidationMessage")}
                    />
                    {numberValidationMessage && (
                        <span
                            className={styles.validationMessage}
                        >
                            {numberValidationMessage}
                        </span>
                    )}
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.inputLabel}>*Email</label>
                    <input
                        className={styles.input}
                        type="email"
                        id="email"
                        name="email"
                        value={inputEmail}
                        required
                        onChange={(e) => {
                            dispatch(updateInputEmail(e.target.value))
                            if (
                                e.target.value && !EMAIL_REGEX.test(e.target.value)
                            ) {
                                dispatch(getValidationMessages(
                                    {
                                        emailValidationMessage: INVALID_EMAIL_MESSAGE
                                    }
                                ));
                            } else {
                                onFocusValidator("emailValidationMessage");
                            }
                        }}
                        onFocus={
                            (e) => {
                                if (
                                    e.target.value && !EMAIL_REGEX.test(e.target.value)
                                ) {
                                    dispatch(getValidationMessages(
                                        {
                                            emailValidationMessage: INVALID_EMAIL_MESSAGE
                                        }
                                    ));
                                } else {
                                    onFocusValidator("emailValidationMessage");
                                }
                            }
                        }
                        onBlur={(e) => onBlurValidator(e.target.value,"emailValidationMessage")}
                    />
                    {emailValidationMessage && (
                        <span
                            className={styles.validationMessage}
                        >
                            {emailValidationMessage}
                        </span>
                    )}
                </div>
                <button
                    className={styles.submitButton}
                    type="button"
                    onClick={() => {
                        if (
                            !validationMessages.nameValidationMessage &&
                            !validationMessages.DOBValidationMessage &&
                            !validationMessages.numberValidationMessage &&
                            !validationMessages.emailValidationMessage
                        ) {
                            dispatch(submitUserForm({
                                name: inputName,
                                DOB: inputDOB,
                                favNumber: inputNumber,
                                email: inputEmail,
                            }))
                        } else {
                            dispatch(getValidationMessages(validationMessages));
                        }
                    }}
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => ({
    inputName: state.inputName,
    inputDOB: state.inputDOB,
    inputNumber: state.inputNumber,
    inputEmail: state.inputEmail,
    nameValidationMessage: state.nameValidationMessage,
    DOBValidationMessage: state.DOBValidationMessage,
    numberValidationMessage: state.numberValidationMessage,
    emailValidationMessage: state.emailValidationMessage,
})

export default connect(mapStateToProps)(UserForm);