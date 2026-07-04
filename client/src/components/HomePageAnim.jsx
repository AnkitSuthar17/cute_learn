import React from 'react';
import Lottie from 'react-lottie';
import homePageAnimData from '../assets/jsonFiles/homePageAnim.json';

const homePageAnim = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: homePageAnimData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={550} width={550} />
    </div>
  );
};

export default homePageAnim;
