import { useState } from "react";
import "../styles/Admission.css";
import { useEffect } from "react";

const Admission = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    address: "",
    userphoto: "",
    usersign: "",
    userparentsign: "",
    gender: "",
    phone: "",
    altphone: "",
    adddeclaration: false,
    classorsem: "",
    chosensubs: ["", "", "", "", "", ""],
    schoolorcollege: "",
    semorclg: "",
    fatherName: "",
    fatherOcc: "",
    motherName: "",
    motherOcc: "",
  });

  const handlefileinput = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const newPhoto = reader.result;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: newPhoto,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    if (name.startsWith("Subject_Choosen")) {
      const index = parseInt(name.replace("Subject_Choosen", ""), 10);
      const subjects = [...formData.chosensubs];
      subjects[index] = value;
      setFormData((prevFormData) => ({
        ...prevFormData,
        chosensubs: subjects,
      }));
    } else if (type === "checkbox") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: checked,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const storedUsername = localStorage.getItem("Username");
      if (!storedUsername) {
        console.error("name not found in localStorage");
        return;
      }

      try {
        const res = await fetch(
          `https://codru-server.vercel.app/students/${storedUsername}`
        );
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `https://codru-server.vercel.app/admission/${localStorage.getItem("Username")}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        const jsondata = await res.json();
        console.log(jsondata);
        window.alert("Data submitted successfully");
      } else {
        console.log("Error submitting data");
        window.alert("Submission failed");
      }
    } catch (error) {
      console.error("Error:", error);
      window.alert("An error occurred while submitting the form");
    }
  };
    const [selectedImage, setSelectedImage] = useState(null);
  
    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
      }
    };

  return (
    <div className="admission-form">
      <div className="header">
        <h1>📚 Codru Education</h1>
        <p>Learn, how to learn.</p>
      </div>
      <div className="form-container">
        <h2>Admission Form</h2>

        {/* Photo Upload Section */}
        <div className="photo-box">
          {selectedImage ? (
            <img src={selectedImage} alt="Uploaded" className="uploaded-photo" />
          ) : (
            <p>Upload Photo</p>
          )}
        </div>
        <input type="file" accept="image/*" onChange={handleImageUpload} />

        <form>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>DOB:</label>
            <div className="dob-container">
              <input type="text" placeholder="DD" className="dob-input" />
              /
              <input type="text" placeholder="MM" className="dob-input" />
              /
              <input type="text" placeholder="YYYY" className="dob-input" />
            </div>
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <label>
              <input type="radio" name="gender" /> Male
            </label>
            <label>
              <input type="radio" name="gender" /> Female
            </label>
            <label>
              <input type="radio" name="gender" /> Other
            </label>
          </div>
          <div className="form-group">
            <label>Address:</label>
            <textarea rows="2"></textarea>
          </div>
          <div className="form-group">
            <label>Email Id:</label>
            <input type="email" />
          </div>
          <div className="form-group">
            <label>Phone No.:</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Alt Phone No.:</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Chosen Subjects:</label>
            <div className="subject-box">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <input key={num} type="text" placeholder={`${num}`} />
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Class / Semester:</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>School / College:</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Father’s Name:</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Mother’s Name:</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Father’s Occupation:</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Mother’s Occupation:</label>
            <input type="text" />
          </div>

          {/* Declaration with Checkbox */}
          <div className="declaration">
            <h3>Declaration</h3>
            <label className="declaration-label">
              <input type="checkbox" required />
              I hereby declare that I will obey all the rules and regulations of
              the institution and be fully responsible for violating the rules.
            </label>
          </div>

          <div className="signatures">
            <p>Student’s Signature</p>
            <p>Parent’s / Guardian’s Signature</p>
          </div>
        </form>
      </div>
      <div className="footer">
        <p>Phone No.: 7300-199-100</p>
        <p>Shop No. 1 & 2 R. K. Puram Kota</p>
      </div>
    </div>
  );
};

export default Admission;
