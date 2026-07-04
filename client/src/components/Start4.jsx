import "../styles/Start4.css";
// import studyImage from "../assets/study.jpg";
import LottieAnimation from "./LottieAnimation";

function Start4() {
  return (
    <div className="Start4">
      <div className="Start4div1">What is Codru Education?</div>
      <div className="Start4div2">
        <div className="Start4div2div1">
          Codru Education is an educational Institute which offers both online
          and offline courses / workshops / trainings / internships for school
          and B. Tech students. Codru Education is committed to improving lives
          through learning. <br />
          <br />
          Codru Education started taking its initial form in 2021 & is still in
          its transformational phases. Codru’s intention is to provide guidance
          to children so they can become capable of making a difference. This is
          why they strive to work on child’s overall development by helping them
          figure out their purpose, core values and goals and their own way to
          achieve it. They help them explore their curiosity and gain a
          perspective towards everything as it opens new possibilities for
          improvement and development. They focus on enhancing a child’s
          creativity, problem solving and decision-making skills so they can
          bring out what’s inside each of them and what they wish to be in life.
        </div>
        <div className="Start4div2div2">
          <LottieAnimation />
        </div>
      </div>
    </div>
  );
}

export default Start4;
