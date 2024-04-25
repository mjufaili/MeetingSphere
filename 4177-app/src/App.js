import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Landing';
import FAQsPage from './FAQs';
import ContactPage from "./Contact";
import ProfilePage from './ProfilePage';
import CreateActivity from './CreateActivity';
import SignupPage from './signup';
import LoginPage from './login';
import Invite from './Invite';
import ActivitiesPage from "./ActivitiesPage";
import Dashboard from "./Dashboard";
import GroupsPage from './GroupsPage';
import CreateGroup from './CreateGroup';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/faqs" element={<FAQsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/createActivity" element={<CreateActivity />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/invite" element={<Invite />} />
                <Route path="/ActivitiesPage" element={<ActivitiesPage />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/GroupsPage" element={<GroupsPage />} />
                <Route path="/CreateGroup" element={<CreateGroup />} />
            </Routes>
        </Router>
    );
}

export default App;


