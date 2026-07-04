import { NavLink } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  const currentYear = new Date(Date.now()).getFullYear();
  return (
    <div className="Footer">
      <div className="Footerdiv2">
        <div className="Footerdiv2div1">
          <div>
            <h2>Quick Links</h2>
            <NavLink className="footerlinks" to="/contact">
              Contact Us
            </NavLink>
            <NavLink className="footerlinks" to="/terms">
              Terms & Conditions
            </NavLink>
            <NavLink className="footerlinks" to="policy">
              Privacy Policy
            </NavLink>
          </div>
          <div>
            <h2>Place</h2>
            <p>Near Ahimsa Circle, Kota</p>
          </div>
        </div>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.193078044915!2d75.82496867520503!3d25.129162434453473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396f9b8b3d45ccf7%3A0x6e8f5e272fed2e3f!2sCodru%20Education!5e0!3m2!1sen!2sin!4v1716785885481!5m2!1sen!2sin"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <hr style={{ width: "90%" }} />
      <div className="Footerdiv3">© {currentYear} Codru Education</div>
    </div>
  );
}

export default Footer;
