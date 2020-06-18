import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Sprint.css";
import parrot from "./parrot.png";

function Game() {
  const [counter, setCounter] = React.useState(60);
  React.useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);
  return (
    <div className="container">
      <div className="d-flex flex-column align-items-center">
        <p className="points my-5">100 очков</p>
        <div className="time d-flex justify-content-center">
          <span className="align-self-center">{counter}</span>
        </div>
        <div className="card d-flex flex-column align-items-center p-5">
          <img className="card-img-top" src={parrot} alt="Parrot" />
          <div className="card-body d-flex flex-column align-items-center p-4">
            <h4 className="card-title mb-4">remove</h4>
            <h4 className="card-subtitle mb-5 text-muted">управлять</h4>
            <div>
              <a href="https://reactjs.org" className="btn btn-primary mr-2">Правильно!</a>
              <a href="https://reactjs.org" className="btn btn-danger">Неверно</a>
            </div>
          </div>
        </div>
        <div className="arrows d-flex flex-row justify-content-around w-25">
          <p className="arrow left">&#5130;</p>
          <p className="arrow right">&#5125;</p>
        </div>
      </div>
    </div>
  );
}

export default Game;
