import React from 'react';
import '../styles/robotics_course_details.css'; // Import the new CSS file

const RoboticsCourseDetails = () => {
    return (
        <div className="robotics-course-details">
            {/* First Section */}
            <div className="course-section">
                <h2>Course Details:</h2>
                <ul className="firstList">
                    <li>
                        <p><b>Available: </b>Online / Offline</p>
                    </li>
                    <li>
                        <p><b>Online Platform: </b>Via “Google Meet”</p>
                    </li>                   
                    <li>
                        <p>
                            <b>Offline Location: <br /></b>
                            &emsp;Codru Education,<br />
                            &emsp;Shop no.: 1,2 R. K. Puram, Sector A,<br />
                            &emsp;near Ahinsa Circle, Kota. (Rajasthan) - 324010<br />
                            &emsp;<a href="https://g.co/kgs/BiEbPDW" target="_blank" rel="noopener noreferrer">
                                View on Google Maps
                            </a>
                        </p>
                    </li>
                    <li>
                        <p><b>Course is available in durations:</b></p>
                    </li>                        
                </ul>
                <div className="secondList">
                    <div className='secondListItem'>
                        <div className='secondListItemDuration'>
                            30 Days
                        </div>
                        
                        <div className='secondListItemPrice'>
                            &#8377;3,500
                        </div>
                        <div className='secondListItemLecture'>
                            No. of Classes: <b>08</b>
                        </div>
                    </div>
                    <div className='secondListItem'>
                        <div className='secondListItemDuration'>
                            45 Days
                        </div>
                        
                        <div className='secondListItemPrice'>
                            &#8377;5,000
                        </div>
                        <div className='secondListItemLecture'>
                            No. of Classes: <b>12</b>
                        </div>
                    </div>
                    <div className='secondListItem'>
                        <div className='secondListItemDuration'>
                            90 Days
                        </div>
                        
                        <div className='secondListItemPrice'>
                            &#8377;10,000
                        </div>
                        <div className='secondListItemLecture'>
                            No. of Classes: <b>24</b>
                        </div>
                        
                    </div>
                </div>
            </div>

            {/* Second Section */}
            <div className="course-section">
                <h2>What do we offer?</h2>
                <ul>
                    <li>Robotics Kits will be provided as per requirement of course.<b>*</b></li>
                    <li>Membership to Codru Community for future help in career.</li>
                    <li>
                        You can present your own project idea and will be mentored through the building process
                        of your personal project for learning throughout the course, if feasible.<b>*</b>
                    </li>
                </ul>
                <p className="note">
                    <br /><br /><br />
                    <b>*</b>Services will only be offered if the requirements of student fall under duration and cost
                    of the selected course. If you still wish to continue as per your requirements, it can be
                    considered at additional cost and time availability.
                </p>
            </div>
        </div>
    );
};

export default RoboticsCourseDetails;