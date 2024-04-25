import React from 'react';
import Navbar from './Components/NaviBar_Main';
import Footer from './Components/Footer';
//import Features from './Components/Features';
import './css/FAQs.css';
import Faq from 'react-faq-component';


function FAQsPage() {
    // referenced https://binodswain.github.io/react-faq-component/
    const faqs = {
        title: "Frequently Asked Questions",
        rows: [
            {
                title: 'How does MeetingSphere help me manage my activities?',
                content: 'MeetingSphere allows you to create, schedule, and keep track of all your activities in one place, optimizing your time and increasing your productivity.'
            },
            {
                title: 'Is MeetingSphere free to use?',
                content: 'Yes, MeetingSphere offers essential meeting management features at no cost to the users, perfect for students and small teams.'
            },
            {
                title: 'How do I sign up for MeetingSphere?',
                content: 'Simply click the "Signup" button on the top right corner of the page and follow the instructions to create a new account.'
            },
            {
                title: 'Is there a limit to the number of activities I can create?',
                content: 'No, you can create as many activities as you need to help manage your time effectively.'
            }]   
    }
    

    return (
        <>
            <Navbar />
            <div className="faq-background">
                <h1 className="faq-title">FAQs</h1>
            </div>
            <div className="faqs faq-section">
                <div className="content">
                    <div>
                        <Faq data ={faqs}/>
                    </div>
                </div>
            </div>
            {/* <Features /> */}
            <Footer />
        </>
    );
}


export default FAQsPage;
