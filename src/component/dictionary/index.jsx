import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import "./styles.css";

const propTypes = {

};

// eslint-disable-next-line react/prefer-stateless-function
class Dictionary extends Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>
          Список покупок для
        </h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({

});

const mapDispatchToProps = {

};

Dictionary.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(Dictionary);
