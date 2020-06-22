import React from 'react';
import './Stepper.scss';

export default function Stepper() {
  const dots = [
    {
      active: false,
    },
    {
      active: true,
    },
    {
      active: false,
    },
    {
      active: false,
    },
    {
      active: false,
    },
    {
      active: false,
    },
  ];

  const dotsTemplate = dots.map((dot) => (<a href="#" className={`dot ${dot.active ? 'active' : ''}`}></a>));

  return (
        <div className="stepper-container">
            <div className="stepper">
                <div className="line"></div>
                <div className="dots-container">
                    {dotsTemplate}
                </div>
            </div>
        </div>
  );
}
