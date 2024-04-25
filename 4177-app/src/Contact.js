import React, { useState } from 'react';
import Navbar from './Components/NaviBar_Main';
import './css/Contact.css';
import Footer from './Components/Footer';

function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        topic:'',
        message: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        let formIsValid = true;
        let errors = {};

        if (!formData.name) {
            formIsValid = false;
            errors['name'] = 'Name is required.';
        }

        if (!formData.email) {
            formIsValid = false;
            errors['email'] = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formIsValid = false;
            errors['email'] = 'Email is not valid.';
        }

        if (!formData.topic) {
            formIsValid = false;
            errors['topic'] = 'Choose your topic.';
        }

        if (!formData.message) {
            formIsValid = false;
            errors['message'] = 'Message is required.';
        }

        setErrors(errors);
        return formIsValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            alert('Thank you for your submission! We will be in touch soon.');
            console.log('Form is valid. Data submitted:', formData);
            window.location.reload();
        }
    };

    return (
        <>
            <Navbar />
            <div className="contact-background">
                <h1 className="contact-title">Contact Us</h1>
            </div>
            <div className="contact-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                        {errors.name && <div className="error">{errors.name}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                        {errors.email && <div className="error">{errors.email}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="topic">Topic:</label>
                        <select id="topic" name="topic" value={formData.topic} onChange={handleChange}>
                            <option value="">Please select a topic</option>
                            <option value="feedback">Feedback</option>
                            <option value="support">Support</option>
                            <option value="general">General Inquiry</option>
                        </select>
                        {errors.topic && <div className="error">{errors.topic}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" name="message" value={formData.message} onChange={handleChange}>Message</textarea>
                        {errors.message && <div className="error">{errors.message}</div>}
                    </div>
                    <button className="button" type="submit">Submit</button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default ContactPage;

