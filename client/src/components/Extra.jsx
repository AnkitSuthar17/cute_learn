
import React from 'react';
import "../styles/Extra.css";

const Extra = () => {
  return (
    <div className="course-table-container">
      <div className="header">
        <h1>Codru Education</h1>
        <h2>Learn, how to learn.</h2>
      </div>
      <table className="course-table">
        <thead>
          <tr>
            <th>Course Perks</th>
            <th>30 Days</th>
            <th>45 Days</th>
            <th>90 Days</th>
          </tr>
        </thead>
        <tbody>
          {[
            "Doubt & Self-Study Sessions",
            "One:One Interactive Sessions",
            "Subjects of Choice",
            "Mini Workshops",
            "Performance Report",
            "Collaborative Learning",
            "Access to Workshops & Events",
            "Access to Book Bank & Library",
            "Mentorship & Career Guidance",
            "Internship & Training (B.Tech Students)"
    
    ].map((perk, index) => (
        <tr key={index}>
          <td>{perk}</td>
          {[ "30 Days", "45 Days", "90 Days"].map((duration, idx) => (
            <td key={idx}>{index < 2 ||  (duration == "30 Days" && index < 5) ? "✔️" : "" || (duration == "45 Days" && index < 6) ? "✔️" : "" || (duration == "90 Days" && index < 7) ? "✔️" : "" || (duration == "30 Days" && index == 9) ? "✔️" : "" || (duration == "45 Days" && index == 9) ? "✔️" : "" || (duration == "90 Days" && index == 9) ? "✔️" : ""}</td>
           
          ))}
        </tr>
      ))}
          <tr>
            <td>Total Fee</td>
            {["₹ 3,500.00", "₹ 5,000.00", "₹ 10,000.00"].map((fee, idx) => (
              <td key={idx}>
                <div className="fee-cell">
                  <span>{fee}</span>
                  <button className="extra-buy-now-button">Buy Now</button>
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <div className="particulars">
        <ul>
          <li>We follow 5 - days work week.</li>
          <li>1 and 3 month courses will have an Admission Test.</li>
          <li>1 month course only offers 1 subject for crash course.</li>
          <li>3 month course offers 3 core subjects only for crash course.</li>
          <li>Duration of each class is 45 minutes except for 1 Day (Max: 1.5 Hours).</li>
          <li>Demo is only available for courses of duration 1, 3, 6 months and yearly.</li>
          <li>Our Mini Workshop Includes Movies, Games, Magic Maths & Self- Development Sessions on weekly basis.</li>
          <li>6 month & 1 year courses will not have daily 1:1 self study sessions. There will be weekly or monthly 1:1 sessions.</li>
        </ul>
      </div>
      <div className="footer">
        <p>📞 7300-199-100, 8949-775-255</p>
        <p>📍 Shop No.: 1 & 2 near Ahinsa Circle, R.K. Puram, Kota (Rajasthan)</p>
      </div>
    </div>
  );
};

export default Extra;
