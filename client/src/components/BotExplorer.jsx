import React, { useState,useEffect } from 'react';
import Footer from './Footer';
import RoboticsCourseDetails from './robotics_course_details';
import BotEnroll from './BotEnroll';

import '../styles/BotExplorer.css';

const BotExplorer = () => {
    const [showForm, setShowForm] = useState(true);

    useEffect(() => {
        document.querySelector("body").scrollTo(0, 0); // Scroll to top on component mount
    }, []);

    const handleEnrollClick = () => {
        setShowForm(true);
    };

    return (
        <div className='bot-explorer-container'>
            <div className='bot-explorer-content'>
                <RoboticsCourseDetails />
                {showForm && <BotEnroll course="Bot Explorer" />} {/* Pass course as a prop */}
            </div>
            <Footer />
        </div>
    );
};

export default BotExplorer;