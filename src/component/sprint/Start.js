import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./Sprint.css";

class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "block",
    };
  }

  handleClick() {
    this.setState({ display: "none" });
  }

  render() {
    const style = { display: this.state.display };
    return (
      <div className="container h-100" id="start-wrapper" style={style}>
        <div className="card d-flex flex-column align-items-center p-5" id="start">
          <div className="card-body d-flex flex-column align-items-center p-4">
            <h4 className="card-title mb-4">Начать Игру?</h4>
            <div>
              <Link className="btn btn-primary mr-2" to="/Game" onClick={() => this.handleClick()}>
                Да!
              </Link>
              <Link className="btn btn-danger" to="/Statistics" onClick={() => this.handleClick()}>
                Нет :(
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Start;
