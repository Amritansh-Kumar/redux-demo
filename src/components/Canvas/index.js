import React, { useState } from "react";
import { connect } from "react-redux";
import Box from "./Box";
import styles from "./Canvas.module.css"

// Helper function to return a random number from 0 to 255.
const rgbValue = () => {
    return Math.floor(Math.random() * 256)
}

// Helper function to generate an array of rgb colors.
const generateColors = (num) => {
    let colors = []

    for(let i=0; i<num; i++){
        const red = rgbValue()
        const blue = rgbValue()
        const green = rgbValue()
        colors.push(`rgb(${red},${blue},${green})`)
    }
    return colors
}

const Canvas = ({ favNumber }) => {
    const [colors, setColors] = useState(generateColors(favNumber * favNumber));

    return (
        <div className={styles.boxContainer}>
            {
                favNumber ? (
                        <>
                            {
                                colors.map(color => (
                                    <Box color={color}/>
                                ))
                            }
                        </>
                    )
                    :
                    (
                        <div className={styles.fillFormContainer}>
                            <span>
                                Fill the form and choose a number other than 0 to render boxes
                            </span>
                            <a className={styles.fillFormButton} href={"/"}>Fill Form</a>
                        </div>
                    )
            }
        </div>
    )

}

const mapStateToProps = (state) => ({
    favNumber: state.favNumber


})


export default connect(mapStateToProps)(Canvas);