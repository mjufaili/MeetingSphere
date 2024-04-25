/**
 * Author: Al-Mahana Mahmood Al_jufaili
 * B00858788
 *
 * Defines the LoginPage component for user login functionality. Users can log in by providing their
 * email and password. The component validates the input fields to ensure that they are not empty and
 * that the email format is correct. On form submission, the credentials are sent to a server endpoint
 * for authentication. The server's response is handled appropriately, either by navigating to the Dashboard
 * upon successful login or displaying error messages for various failure cases (e.g., invalid credentials,
 * server errors). This component integrates with the backend API to authenticate users and manage session state.
 *
 * Usage of React hooks such as useState for managing form data and errors, and useNavigate for redirection
 * after successful login, demonstrates React's functional component pattern for state and effect management.
 * Additionally, axios is used for making HTTP requests to the backend API, showcasing asynchronous JavaScript
 * operations and promise handling.
 **/


import React, { useState } from 'react';
import './css/LoginPage.css';
import Navbar from './Components/NaviBar_Main';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        let formIsValid = true;
        let errors = {};

        if (!formData.email) {
            formIsValid = false;
            errors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formIsValid = false;
            errors.email = 'Email is invalid.';
        }

        if (!formData.password) {
            formIsValid = false;
            errors.password = 'Password is required.';
        }

        setErrors(errors);
        return formIsValid;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); // Reset specific field error
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return; // Stop submission if validation fails

        const loginData = {
            email: formData.email,
            password: formData.password,
        };
    
        axios.post('https://group-project-csci4177.onrender.com/userSignup/signin', loginData,)
            .then(response => {
                console.log(response.data);
                localStorage.setItem('token', response.data.token);
                navigate('/Dashboard');
            })
            .catch(error => {
                let errorMessage = 'An error occurred during login.';
                if (error.response) {
                    if (error.response.status === 404) {
                        errorMessage = 'Invalid Credentials.';
                    } else if (error.response.status === 401) {
                        errorMessage = 'Username or password is wrong.';
                    } else {
                        errorMessage = error.response.data.message || errorMessage;
                    }
                } else if (error.request) {
                    errorMessage = 'No response from server.';
                } else {
                    errorMessage = error.message;
                }
                setErrors({ ...errors, form: errorMessage });
            });
    };

    return (
        <>
            <Navbar/>
            <div className="loginContainer">
                <div className="loginFormContainer">
                    <div className="loginTitleContainer">
                        <h1 className="loginTitle">Login</h1>
                        <div className="titleSeparator"></div>
                    </div>
                    <form onSubmit={handleSubmit} className="loginForm">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`loginInput ${errors.email ? 'errorInput' : ''}`}
                        />
                        {errors.email && <div className="error">{errors.email}</div>}
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`loginInput ${errors.password ? 'errorInput' : ''}`}
                        />
                        {errors.password && <div className="error">{errors.password}</div>}
                        {errors.form && <div className="error">{errors.form}</div>}
                        <button
                            type="submit"
                            className="loginButton"
                        >
                            Log in
                        </button>
                    </form>
                    <p className="signUpPrompt">
                        New user? <a href="/signup" className="signUpLink">sign up here</a>
                    </p>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
