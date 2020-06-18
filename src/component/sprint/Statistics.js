import React from "react";
import "bootstrap/dist/css/bootstrap.css";

function Statistics() {
  return (
    <div className="container" id=" statistics-wrapper">
      <div className="card d-flex flex-column align-items-center p-5" id="statistics">
        <div className="card-body">
          <h2 className="card-title">Статистика Игры:</h2>
          <h3 className="card-subtitle my-3">
            Ошибок
            <span className="badge badge-danger ml-2">10</span>
          </h3>
          <ul className="list-group card-text">
            <li className="list-group-item">Amount - количество</li>
            <li className="list-group-item">Deserve - заслуживать</li>
            <li className="list-group-item">Lean - наклонять</li>
          </ul>
          <h3 className="card-subtitle my-3">
            Знаю
            <span className="badge badge-info ml-2">10</span>
          </h3>
          <ul className="list-group card-text">
            <li className="list-group-item">Amount - количество</li>
            <li className="list-group-item">Deserve - заслуживать</li>
            <li className="list-group-item">Lean - наклонять</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
