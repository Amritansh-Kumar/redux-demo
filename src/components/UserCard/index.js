import React from "react";
import { connect } from "react-redux";
import styles from "./UserCard.module.css"

const UserCard = ({ name, DOB, randomNumber, email }) => {
    return (
        <div className={styles.userCardContainer}>
            {
                name ? (
                        <div className={styles.userCard}>
                            <b className={styles.cardHeading}>User Details</b>
                            <table>
                                <tr className={styles.userDetailRow}>
                                    <td><b>Name:</b></td>
                                    <td>{name}</td>
                                </tr>
                                <tr className={styles.userDetailRow}>
                                    <td><b>DOB:</b></td>
                                    <td>{DOB}</td>
                                </tr>
                                <tr className={styles.userDetailRow}>
                                    <td><b>Random Number:</b></td>
                                    <td>{randomNumber}</td>
                                </tr>
                                <tr className={styles.userDetailRow}>
                                    <td><b>Email:</b></td>
                                    <td>{email}</td>
                                </tr>
                            </table>
                        </div>
                    )
                    :
                    (
                        <a className={styles.fillFormButton} href={"/"}>Fill Form</a>
                    )
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    name: state.name,
    DOB: state.DOB,
    randomNumber: state.randomNumber,
    email: state.email
})


export default connect(mapStateToProps)(UserCard);