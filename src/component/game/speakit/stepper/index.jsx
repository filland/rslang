import React from 'react';
import './styles.scss';

export default function Stepper() {
  const dots = [
    {
      category: 1,
      active: false,
    },
    {
      category: 2,
      active: true,
    },
    {
      category: 3,
      active: false,
    },
    {
      category: 4,
      active: false,
    },
    {
      category: 5,
      active: false,
    },
    {
      category: 6,
      active: false,
    },
  ];

  const dotsTemplate = dots.map((dot) => (<a key={dot.category} href="#" className={`dot ${dot.active ? 'active' : ''}`}></a>));

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
