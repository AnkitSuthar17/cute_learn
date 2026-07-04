import "../styles/Userprofile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import profile from "../assets/userprofile.jpeg";

function Userprofile() {
  const coursedata = [
    {
      course: "Web Development",
      duration: "6 months",
      price: "₹41,000",
    },
    {
      course: "Flutter Development",
      duration: "4 months",
      price: "₹32,800",
    },
    {
      course: "Data Science",
      duration: "8 months",
      price: "₹65,600",
    },
    {
      course: "Machine Learning",
      duration: "6 months",
      price: "₹57,400",
    },
    {
      course: "Cybersecurity",
      duration: "5 months",
      price: "₹49,200",
    },
    {
      course: "Cloud Computing",
      duration: "7 months",
      price: "₹61,500",
    },
    {
      course: "Mobile App Development",
      duration: "5 months",
      price: "₹45,100",
    },
    {
      course: "Digital Marketing",
      duration: "3 months",
      price: "₹24,600",
    },
    {
      course: "Artificial Intelligence",
      duration: "6 months",
      price: "₹69,700",
    },
    {
      course: "Blockchain Development",
      duration: "6 months",
      price: "₹73,800",
    },
  ];

  return (
    <div className="Userp">
      <div className="userpdiv1">
        <div className="userpdiv1div1">
          <div className="userpdiv1div1div1">
            <h2>Hello,Gajanand</h2>
            <button>
              Edit Profile <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          </div>
          <hr style={{ width: "90%", border: "1px solid black" }} />
          <div className="userpdiv1div1div2">
            <div className="userpdiv1div1div2div1">
              <p>
                Date of Registration: <span>20/05/2024</span>
              </p>
              <p>
                Username: <span>Futurestar7891</span>
              </p>
              <p>
                Email: <span>gkmali49@gmail.com</span>
              </p>
              <p>
                Mobile: <span>9358179840</span>
              </p>
            </div>
          </div>
        </div>
        <div className="userpdiv1div2">
          <div className="userpdiv1div2div1">
            <img src={profile} alt="" />
          </div>
        </div>
      </div>
      <div className="userpdiv2">
        <div className="userdiv2div1">
          <h2>Enrolled Courses</h2>
          <div className="userdiv2div1div1">
            {coursedata.map((data, idx) => {
              return (
                <div className=" userdiv2div1div1div1" key={idx}>
                  <div>
                    <h2>{data.course}</h2>
                    <p>Description</p>
                  </div>

                  <span>{data.duration}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="userdiv2div2"></div>
        <div className="userdiv2div3"></div>
      </div>
    </div>
  );
}

export default Userprofile;
