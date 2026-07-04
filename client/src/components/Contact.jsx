import { useState } from "react";
import "../styles/Contact.css";
import Muialert from "./Muialert";
import Footer from '../components/Footer'
import Navbar from "./Navbar";

const Contact = ({ userData, setUserData }) => {
  const [value, setValue] = useState({
    name: "",
    email: "",
    countryCode: "+91", // Default country code
    phone: "",
    city: "",
    message: "",
  });

  const [alert, setAlert] = useState({
    show: false,
    severity: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, countryCode, phone, city, message } = value;

    const res = await fetch("https://codru-server.vercel.app/contactus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        countryCode,
        phone,
        city,
        message,
      }),
    });

    if (res.ok) {
      setAlert({
        show: true,
        severity: "success",
        message: "Message sent successfully!",
      });
      setValue({ name: "", email: "", countryCode: "+91", phone: "", city: "", message: "" });
    } else {
      setAlert({
        show: true,
        severity: "error",
        message: "Failed to send message",
      });
    }
  };

  return (
    <div>
      <Navbar userData={userData} setUserData={setUserData} />
      <div className="contact-us-page">
        <div className="cont_page">
          {/* <h1>
            Contact &nbsp;<span>us</span>
          </h1> */}
          <div className="cont_main">
            <div className="cont_main_div1">
              
              <div className="cont_form">
                <div className="cont_form-container">
                  <form onSubmit={PostData}>
                    <div className="cont_form-group">
                      <label htmlFor="Name">
                        <input
                          placeholder="Name"
                          type="text"
                          id="Name"
                          name="name"
                          value={value.name}
                          onChange={handleChange}
                          required
                        />
                      </label>
                    </div>
                    <div className="cont_form-group">
                      <label htmlFor="City">
                        <input
                          placeholder="City"
                          type="text"
                          id="City"
                          name="city"
                          value={value.city}
                          onChange={handleChange}
                          required
                        />
                      </label>
                    </div>
                    <div className="cont_form-group">
                      <label htmlFor="phn">
                        <div className="phone-container">
                          <select
                            className="contact-country-code"
                            name="countryCode"
                            value={value.countryCode}
                            onChange={handleChange}
                            required
                          >
                            <option value="+91">+91 (India)</option>
                            <option value="+1">+1 (USA)</option>
                            <option value="+44">+44 (UK)</option>
                            <option value="+61">+61 (Australia)</option>
                            <option value="+81">+81 (Japan)</option>
                          </select>
                          <input
                            placeholder="Phone Number"
                            type="tel"
                            id="phn"
                            name="phone"
                            value={value.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </label>
                    </div>
                    <div className="cont_form-group">
                      <label htmlFor="Email">
                        <input
                          placeholder="Email"
                          type="email"
                          id="Email"
                          name="email"
                          value={value.email}
                          onChange={handleChange}
                          required
                        />
                      </label>
                    </div>
                    <div className="cont_form-group">
                      <label htmlFor="message">
                        <textarea
                          maxLength={500}
                          placeholder="Message Query"
                          id="message"
                          name="message"
                          value={value.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </label>
                    </div>
                    <div className="cont_form-group">
                      <button className="send-message-btn">
                        <div className="send-message-text">Send Message</div>
                        <div className="send-message-icon">
                          <i className="fas fa-paper-plane"></i>
                        </div>
                      </button>
                    </div>
                  </form>
                  {alert.show && (
                    <Muialert
                      severity={alert.severity}
                      onClose={() => setAlert({ ...alert, show: false })}
                    >
                      {alert.message}
                    </Muialert>
                  )}
                </div>
              </div>
            </div>
            <div className="cont_main_div2">
              <div className="cont_all">
                <div className="cont_all_detail">
                  <h2>How to reach us ?</h2>
                  <div className="cont_all_detail_office">
                    
                    {/* Divider line before cont_all_phone */}
                    <div className="section-divider"></div>
                    <div className="cont_all_phone">
                      <div className="phone-icon">
                        <a href="tel:7300199100" target="_blank" rel="noopener noreferrer">
                          <i className="fas fa-phone"></i>
                        </a>
                      </div>
                      <div className="phone-text">
                        <a href="tel:7300199100" target="_blank" rel="noopener noreferrer">
                          7300-199-100
                        </a>
                      </div>
                    </div>
                    <div className="cont_all_email">
                      <div className="email-icon">
                        <a href="mailto:admin@codrueducation.in" target="_blank" rel="noopener noreferrer">
                          <i className="fas fa-envelope"></i>
                        </a>
                      </div>
                      <div className="email-text">
                        <a href="mailto:admin@codrueducation.in" target="_blank" rel="noopener noreferrer">
                          admin@codrueducation.in
                        </a>
                      </div>
                    </div>
                    <div className="cont_all_address">
                      <div className="address-icon">
                        <a
                          href="https://maps.app.goo.gl/nNrKAi29qsDHWboVA"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fas fa-map-marker-alt"></i>
                        </a>
                      </div>
                      <div className="address-text">
                        <a
                          href="https://maps.app.goo.gl/nNrKAi29qsDHWboVA"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Shop No.: 1 & 2, First Floor, near Ahinsa Circle, R.K. Puram, Sector - A,
                          Kota (Raj.), 324010
                        </a>
                      </div>
                    </div>
                    <div className="cont_all_hours">
                      <div className="hours-icon">
                        <a
                          href="https://g.co/kgs/BiEbPDW"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg
                            className="clk"
                            id="Layer_2"
                            data-name="Layer 2"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 313.64 313.64"
                          >
                            <g id="Layer_1-2" data-name="Layer 1">
                              <path d="m156.82,0C70.21,0,0,70.21,0,156.82s70.21,156.82,156.82,156.82,156.82-70.21,156.82-156.82S243.43,0,156.82,0Zm11.19,156.56c0,6.29-4.08,11.44-9.06,11.44h-81.27c-4.71,0-8.83-4.46-9.16-10.39-.19-3.39.84-6.5,2.58-8.7,1.6-2.02,3.82-3.28,6.26-3.28h68.27V56.24c0-6.15,5.04-11.19,11.19-11.19,3.08,0,5.87,1.26,7.9,3.29s3.29,4.83,3.29,7.9v100.32Z" />
                            </g>
                          </svg>
                        </a>
                      </div>
                      <div className="hours-text">
                        <a
                          href="https://g.co/kgs/BiEbPDW"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Monday - Friday <br />
                          9:00 AM - 7:00 PM
                        </a>
                      </div>
                    </div>
                    {/* Divider line before cont_all_phone */}
                    <div className="section-divider"></div>
                    <div className="cont_all_text">
                      <p>Feel free to give us your suggestion.<br></br>Also, you can drop your message.</p>
                    </div>

                    {/* Social Media Icons Section */}
                    <div className="cont_all_socials">
                      <div className="social-icon insta-icon">
                        <a href="https://www.instagram.com/codrueducation/" target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </div>
                      <div className="social-icon facebook-icon">
                        <a href="https://www.facebook.com/codrueducation/" target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-facebook"></i>
                        </a>
                      </div>
                      <div className="social-icon whatsapp-icon">
                        <a href="https://wa.me/7300199100" target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-whatsapp"></i>
                        </a>
                      </div>
                      <div className="social-icon telegram-icon">
                        <a href="https://t.me/codrueducation" target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-telegram"></i>
                        </a>
                      </div>
                      <div className="social-icon linkedin-icon">
                        <a href="https://www.linkedin.com/company/codru-education" target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-linkedin"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Contact;
