import React from "react";
import engineering from "../assets/engineering.jpg";
import math from "../assets/math.jpeg";
import science from "../assets/science.jpg";
import technology from "../assets/technology.jpg";
import "../styles/Start3.css";
import DashedLine from "./DashedLine";

window.addEventListener("scroll", function () {
  var elements = document.querySelectorAll(".Start3div2div");
  var scrollPosition = window.scrollY;
  var windowHeight = window.innerHeight;

  elements.forEach(function (element) {
    var position = element.getBoundingClientRect().top;
    if (position < windowHeight * 0.75) {
      // Adjust the threshold as needed
      element.classList.add("scrolled");
    } else {
      element.classList.remove("scrolled");
    }
  });
});

function Start3() {
  return (
    <div className="Start3">
      <div className="Start3div2">
        <div className="Start3div2div1">
          <div>
            <img src={science} alt="Science" />
          </div>
          <div className="Start3div2contentdiv">
            <h2>Science</h2>
            <p>
              Dive into the fascinating realm of science, where curiosity meets
              discovery and innovation knows no bounds. From unraveling the
              mysteries of the cosmos to understanding the intricate workings of
              life at a cellular level, science empowers us to explore,
              question, and comprehend the world around us.
            </p>
          </div>
        </div>

        <div className="lShapedDashedLine">
          <DashedLine
            startX={100}
            startY={50}
            verticalLength={80}
            horizontalLength={900}
            color="black"
            strokeWidth={1}
            dashArray="2,2"
            upperVerticalOffsetX={0}
            lowerVerticalOffsetX={0}
          />
        </div>

        <div className="Start3div2div2">
          <div className="Start3div2contentdiv">
            <h2>Mathematics</h2>
            <p>
              Step into the world of mathematics, where numbers dance, shapes
              come alive, and equations unveil the beauty of patterns and
              structures. From the simplest arithmetic to the most complex
              calculus, mathematics is the universal language that unlocks the
              secrets of the universe.
            </p>
          </div>
          <div>
            <img src={math} alt="Mathematics" />
          </div>
        </div>

        <div className="lShapedDashedLine">
          <DashedLine
            startX={1020}
            startY={50}
            verticalLength={80}
            horizontalLength={-900}
            color="black"
            strokeWidth={1}
            dashArray="5,5"
            upperVerticalOffsetX={0}
            lowerVerticalOffsetX={0}
          />
        </div>

        <div className="Start3div2div3">
          <div>
            <img src={technology} alt="Technology" />
          </div>
          <div className="Start3div2contentdiv">
            <h2>Technology</h2>
            <p>
              Step into the dynamic world of technology, where innovation knows
              no bounds and possibilities are limited only by imagination. From
              the dawn of civilization to the digital age, technology has been
              the driving force behind human progress, revolutionizing the way
              we live, work, and connect with one another.
            </p>
          </div>
        </div>

        <div className="lShapedDashedLine">
          <DashedLine
            startX={100}
            startY={50}
            verticalLength={80}
            horizontalLength={900}
            color="black"
            strokeWidth={1}
            dashArray="2,2"
            upperVerticalOffsetX={0}
            lowerVerticalOffsetX={0}
          />
        </div>

        <div className="Start3div2div4">
          <div className="Start3div2contentdiv">
            <h2>Engineering</h2>
            <p>
              Welcome to the realm of engineering, where creativity meets
              ingenuity and innovation shapes the world around us. From towering
              skyscrapers to cutting-edge technology, engineering is the driving
              force behind human progress, transforming ideas into reality and
              turning dreams into tangible achievements.
            </p>
          </div>
          <div>
            <img src={engineering} alt="Engineering" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Start3;
