import { useState } from "react";
import "../styles/Form.css";
import Muialert from "./Muialert";
// import Navbar from './Navbar';

const Form = () => {
  const [value, setValue] = useState({
    name: "",
    email: "",
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
    const { name, email, phone, city, message } = value;

    const res = await fetch("https://codru-server.vercel.app/contactus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });

    if (res.ok) {
      setAlert({
        show: true,
        severity: "success",
        message: "Message sent successfully!",
      });
      setValue({ name: "", email: "", message: "" });
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
      <div className="form-page">
        <div className="form_page">
          <h1>
            Ask Your &nbsp;<span>Querry</span>
          </h1>
          <div className="form_main">
            <div className="form_main_div1">
              <span>Send us a Message</span>
              <div className="form_form">
                <div className="form_form-container">
                  <form onSubmit={PostData}>
                    <div className="form_form-group">
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

                    <div className="form_form-group">
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
                    <div className="form_form-group">
                      <label htmlFor="message">
                        <textarea
                          placeholder="Message Query"
                          id="message"
                          name="message"
                          value={value.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </label>
                    </div>
                    <div className="form_form-group">
                      <button type="submit">Send Message</button>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
