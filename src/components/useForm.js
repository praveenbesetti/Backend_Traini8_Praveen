// useForm.js
import { useState, useEffect } from 'react';

const useForm = (initialValues, validate) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            // Perform submit action (e.g., submit to server, alert, etc.)
            alert(
                `Form Submitted Successfully!\n\n` +
                `Name: ${values.name}\n` +
                `Email: ${values.email}\n` +
                `Age: ${values.age}\n` +
                (values.attendingWithGuest === 'yes' ? `Guest Name: ${values.guestName}\n` : '')
            );
            setIsSubmitting(false); // Reset isSubmitting after successful submission
            setValues(initialValues); // Reset form values to initial state
            setErrors({}); // Clear any existing errors
        }
    }, [errors]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;
        setValues({
            ...values,
            [name]: val,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setErrors(validate(values));
        setIsSubmitting(true);
    };

    return {
        handleChange,
        handleSubmit,
        values,
        errors,
    };
};

export default useForm;
