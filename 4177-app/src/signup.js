/**
 * Author: Al-Mahana Mahmood Al_jufaili
 * B00858788
 *
 * The SignUpPage component facilitates new user registration through a form interface where
 * users can input their username, email, password, and confirm their password. This component
 * includes client-side validation to ensure data integrity before submission, such as email format
 * validation, password length requirement, and password match verification.
 *
 * Upon form submission, the user's data is sent to a specified backend endpoint using axios for server-side
 * processing and registration. The response from the server is handled to provide feedback to the user or
 * navigate to the Dashboard upon successful registration. Error handling is also implemented to inform the
 * user of any issues during the signup process, such as network errors or validation failures from the server.
 *
 * Additionally, this component utilizes React's useState hook for state management of form data and error messages,
 * and the useNavigate hook from react-router-dom for redirecting the user post-registration.
 *
 **/


import React, { useState } from 'react';
import './css/SignUpPage.css';
import Navbar from './Components/NaviBar_Main';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 


const SignUpPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const validateForm = () => {
        let formIsValid = true;
        let errors = {};
        // Email validation
        if (!formData.email) {
            formIsValid = false;
            errors['email'] = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formIsValid = false;
            errors['email'] = 'Email is not valid';
        }

        // Password validation
        if (!formData.password) {
            formIsValid = false;
            errors['password'] = 'Password is required';
        } else if (formData.password.length < 8) {
            formIsValid = false;
            errors['password'] = 'Password must be at least 8 characters';
        } else if (!/[A-Z]/.test(formData.password)) {
            formIsValid = false;
            errors['password'] = 'Password must contain a capital letter';
        }

        // Confirm Password validation
        if (formData.password !== formData.confirmPassword) {
            formIsValid = false;
            errors['confirmPassword'] = 'Passwords do not match';
        }

        setErrors(errors);
        return formIsValid;
    };


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const userData = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            };
            console.log(userData);
            axios.post('https://group-project-csci4177.onrender.com/userSignup/signup', userData)
                .then(response => {
                    localStorage.setItem('token', response.data.token);
                    console.log(response.data);
                    navigate('/Dashboard');
                })
                .catch(error => {
                    const errorMessage = error.response ? error.response.data.message : 'Signup failed. Please try again.';
                    setErrors(prevErrors => ({ ...prevErrors, form: errorMessage }));
                    console.error('There was an error!', errorMessage);
                });
        } else {
            console.error('Validation errors', errors);
        }
    };


    return (
        <>
            <Navbar/>
            <div className="signUpContainer">
                <div className="signUpFormContainer">
                    <div className="signUpTitleContainer">
                        <h1 className="signUpTitle">Sign Up</h1>
                        <div className="titleSeparator"></div>
                    </div>
                    <form onSubmit={handleSubmit} className="signUpForm">
                        <input
                            type="text"
                            name="username"
                            placeholder="User name"
                            value={formData.username}
                            onChange={handleChange}
                            className={`signUpInput ${errors.username ? 'inputError' : ''}`}
                        />
                        {errors.username && <div className="errorMessage">{errors.username}</div>}

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`signUpInput ${errors.email ? 'inputError' : ''}`}
                        />
                        {errors.email && <div className="errorMessage">{errors.email}</div>}

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`signUpInput ${errors.password ? 'inputError' : ''}`}
                        />
                        {errors.password && <div className="errorMessage">{errors.password}</div>}

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`signUpInput ${errors.confirmPassword ? 'inputError' : ''}`}
                        />
                        {errors.confirmPassword && <div className="errorMessage">{errors.confirmPassword}</div>}

                        <button
                            type="submit"
                            className="signUpButton"
                        >
                            Sign Up
                        </button>
                    </form>
                    <p className="signInPrompt">
                        Already have an account? <a href="/login" className="loginLink">Login here</a>
                    </p>
                </div>
            </div>
        </>
    );
};

export default SignUpPage;

