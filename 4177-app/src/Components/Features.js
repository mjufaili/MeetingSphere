import React from 'react';
import './css/Features.css';
import Fast_icon from '../img/fast-icon.svg';
import Support_icon from '../img/support-icon.svg';
import Shield_icon from '../img/shield-icon.svg';
import Group_icon from '../img/users-people-team-svgrepo-com.svg';
const featuresData = [
    {
        icon: Fast_icon,
        title: 'Time Manage',
        description: 'Improve efficiency and save time',
    },
    {
        icon: Support_icon,
        title: 'Activity Manage',
        description: 'Teamwork and efficient communication.',
    },
    {
        icon: Group_icon,
        title: 'Collaborate',
        description: 'Stay synced with groups.',
    },
    {
        icon: Shield_icon,
        title: 'Quick response',
        description: 'Double-ended design, one-click management.',
    },
];

const Features = () => {
    return (
        <div className="features">
            {featuresData.map((feature, index) => (
                <div key={index} className="feature-card">
                    <img src={feature.icon} alt={feature.title} className="feature-icon" />
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                </div>
            ))}
        </div>
    );
}

export default Features;
