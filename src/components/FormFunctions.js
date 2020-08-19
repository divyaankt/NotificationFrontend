import React, { useState, useEffect } from 'react'

//This file contains common form functions that can be used by other forms
const FormFunctions = (initialFieldValues, validate, setCurrentId) => {
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})


    const handleInputChange = e => {
        const { name, value } = e.target
        const fieldValue = { [name]: value }

        setValues({
            ...values,
            ...fieldValue
        })
        validate(fieldValue)
    }

    //This is a buggy function, is important for Edit functionality
    const resetForm = () => {
        setValues({
            ...initialFieldValues
        })
        setErrors({})
        setCurrentId(0)
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    }
}

export default FormFunctions;
