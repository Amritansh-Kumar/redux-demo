import React from "react";
import styles from "./UserForm.module.css";
import cx from "classnames";
import { connect, useDispatch } from "react-redux";
import {
    submitUserForm,
    updateInputName,
    updateInputDOB,
    updateInputNumber,
    updateInputEmail,
    getValidationMessages,
} from "../../actions/userFormActions";

const INVALID_EMAIL_MESSAGE = "Enter a valid email address";
const INPUT_REQUIRED_MESSAGE = "This Field is required!";
const INVALID_DATE_MESSAGE = "Date should not exceed today's date";
const NUMBER_VALIDATION_MESSAGE = "Enter a Number ranging from 0 to 100";

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
    const dispatch = useDispatch();


    const fetchValidationMessages = (
        name, DOB, randomNum, email
    ) => {
        const validationMessages = {
            nameValidationMessage: "",
            DOBValidationMessage: "",
            numberValidationMessage: "",
            emailValidationMessage: "",
        };

        if (!email) {
            validationMessages.emailValidationMessage = INPUT_REQUIRED_MESSAGE;
        }

        if (!DOB) {
            validationMessages.DOBValidationMessage = INPUT_REQUIRED_MESSAGE;
        }

        if (!name) {
            validationMessages.nameValidationMessage = INPUT_REQUIRED_MESSAGE;
        }

        if (!randomNum) {
            validationMessages.numberValidationMessage = INPUT_REQUIRED_MESSAGE;
        }

        if (
            DOB &&
            new Date(DOB).setHours(0,0,0,0) >
            new Date().setHours(0,0,0,0)
        ) {
            validationMessages.DOBValidationMessage = INVALID_DATE_MESSAGE
        }

        if (email && !EMAIL_REGEX.test(email)
        ) {
            validationMessages.emailValidationMessage = INVALID_EMAIL_MESSAGE;
        }

        if (randomNum < 0 || randomNum > 100) {
            validationMessages.numberValidationMessage = NUMBER_VALIDATION_MESSAGE;
        }

        return validationMessages;
    };

    const validationMessages = fetchValidationMessages(
        inputName, inputDOB, inputNumber, inputEmail
    );

    const isValid = (
        !validationMessages.nameValidationMessage &&
        !validationMessages.DOBValidationMessage &&
        !validationMessages.numberValidationMessage &&
        !validationMessages.emailValidationMessage
    );

    const onFocusValidator = (validationMessageProperty) => {
        dispatch(getValidationMessages({
            [validationMessageProperty]: ""
        }));
    };

    const onBlurValidator = (fieldValue, validationMessageProperty) => {
        if (!fieldValue.trim()) {
            dispatch(getValidationMessages({
                [validationMessageProperty]: INPUT_REQUIRED_MESSAGE
            }));
        }
    };

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
                            if (
                                e.target.value &&
                                new Date(e.target.value).setHours(0,0,0,0) >
                                new Date().setHours(0,0,0,0)
                            ) {
                                dispatch(getValidationMessages(
                                    {
                                        DOBValidationMessage: INVALID_DATE_MESSAGE
                                    }
                                ));
                            } else {
                                onFocusValidator("DOBValidationMessage");
                            }
                        }}
                        onFocus={
                            (e) => {
                                if (
                                    e.target.value &&
                                    new Date(e.target.value).setHours(0,0,0,0) >
                                    new Date().setHours(0,0,0,0)
                                ) {
                                    dispatch(getValidationMessages(
                                        {
                                            DOBValidationMessage: INVALID_DATE_MESSAGE
                                        }
                                    ));
                                } else {
                                    onFocusValidator("DOBValidationMessage");
                                }
                            }
                        }
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
                    <label className={styles.inputLabel}>*Random Number</label>
                    <input
                        className={styles.input}
                        type="number"
                        id="randomNumber"
                        name="randomNumber"
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
                    className={cx(styles.submitButton, { [styles.submitButtonDisabled]: !isValid })}
                    type="button"
                    disabled={!isValid}
                    onClick={() => {
                        if (isValid) {
                            dispatch(submitUserForm({
                                name: inputName,
                                DOB: inputDOB,
                                randomNumber: inputNumber,
                                email: inputEmail,
                            }));
                        } else {
                            dispatch(getValidationMessages(validationMessages));
                        }
                    }}
                >
                    Submit
                </button>
            </form>
        </div>
    );
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
});

export default connect(mapStateToProps)(UserForm);