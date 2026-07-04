// LottieAnimation.jsx
import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/jsonFiles/aboutUsAnim.json';

const AboutUsAnim = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return <Lottie options={defaultOptions} height={500} width={750} />;
};

export default AboutUsAnim;
