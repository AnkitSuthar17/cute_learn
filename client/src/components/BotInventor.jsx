import React, { useState,useEffect } from 'react';
import Footer from './Footer';
import RoboticsCourseDetails from './robotics_course_details';
import BotEnroll from './BotEnroll';

import '../styles/BotInventor.css';

const BotInventor = () => {
    const [showForm, setShowForm] = useState(true);

    useEffect(() => {
        document.querySelector("body").scrollTo(0, 0); // Scroll to top on component mount
    }, []);
    
    const handleEnrollClick = () => {
        setShowForm(true);
    };

    return (
        <div className='bot-engineer-container'>
            <div className='bot-engineer-content'>
                <RoboticsCourseDetails />
                {showForm && <BotEnroll course="Bot Inventor" />} {/* Pass course as a prop */}
            </div>
            <Footer />
        </div>
    );
};

export default BotInventor;