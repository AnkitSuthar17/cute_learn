// LottieAnimation.jsx
import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/jsonFiles/buyAnim.json';

const BuyAnim = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return <Lottie options={defaultOptions} height={400} width={400} />;
};

export default BuyAnim;
