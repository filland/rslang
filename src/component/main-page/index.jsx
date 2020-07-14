import React from 'react';

import './style.scss';

const MainPage = () => (
    <div className="wrapper">
      <div className="stone yellow">
      <svg viewBox="0 0 364 311" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M314 46.0001C253 0 137 -28 52.9999 46.0001C-31.0001 120 -1.0002 202 52.9999 248C107 294 247 340 314 248C381 156 375 92.0001 314 46.0001Z" fill="#ffd86f">
    <animate repeatCount="indefinite" attributeName="d" dur="12s"
      values="M314 46.0001C253 0 137 -28 52.9999 46.0001C-31.0001 120 -1.0002 202 52.9999 248C107 294 247 340 314 248C381 156 375 92.0001 314 46.0001Z;
        M302.348 71.5969C209 -48 69.1956 6.19389 41.3478 71.5969C13.5 137 -35.5 223 41.3478 273.597C118.196 324.194 233.195 322.694 302.348 273.597C371.5 224.5 395.695 191.194 302.348 71.5969Z;
        M314 46.0001C253 0 137 -28 52.9999 46.0001C-31.0001 120 -1.0002 202 52.9999 248C107 294 247 340 314 248C381 156 375 92.0001 314 46.0001Z;"></animate>
  </path>
</svg>
      </div>
      <div className="stone blue">
      <svg viewBox="0 0 364 311" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M314 46.0001C253 0 137 -28 52.9999 46.0001C-31.0001 120 -1.0002 202 52.9999 248C107 294 247 340 314 248C381 156 375 92.0001 314 46.0001Z" fill="#5C9EAD">
    <animate repeatCount="indefinite" attributeName="d" dur="15s"
      values="M314 46.0001C253 0 137 -28 52.9999 46.0001C-31.0001 120 -1.0002 202 52.9999 248C107 294 247 340 314 248C381 156 375 92.0001 314 46.0001Z;
        M302.348 71.5969C209 -48 69.1956 6.19389 41.3478 71.5969C13.5 137 -35.5 223 41.3478 273.597C118.196 324.194 233.195 322.694 302.348 273.597C371.5 224.5 395.695 191.194 302.348 71.5969Z;
        M314 46.0001C253 0 137 -28 52.9999 46.0001C-31.0001 120 -1.0002 202 52.9999 248C107 294 247 340 314 248C381 156 375 92.0001 314 46.0001Z;"></animate>
  </path>
</svg>
      </div>
      <div className = "content">
     <div className = "groupButtons">
     <button className = "btn-group">Как играть?</button>
     <button className = "btn-group">Промо</button>
     <button className = "btn-group">Команда</button>
     </div>
     <div className = "quotе">
     <span className = "first-row">Сommunicate,</span><br />
     <span className = "second-row">travel,</span><br />
     <span className = "third-row">work and open the door </span><br />
     <span className = "fourth-row">to new opportunities</span><br />
     <span className = "fifth-row">with Memorizer!</span>
     </div>
 
      <button className = "buttonStart">Начать изучение</button>
      </div>
    </div>
);

export default MainPage;
