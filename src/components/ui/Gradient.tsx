import React, { useEffect } from 'react';
import { GradientJS } from '../../assets/gradient';

export const Gradient = () => {
  const gradient = new GradientJS();
  useEffect(() => {
    // Call `initGradient` with the selector to your canvas
    gradient.initGradient('#gradient-canvas');
  }, []);

  return (
    <canvas className="w-full h-full" id="gradient-canvas" data-transition-in />
  );
};
