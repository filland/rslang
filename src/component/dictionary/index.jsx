import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Tabs, Tab } from "react-bootstrap";
import "./styles.css";

const propTypes = {

};

// eslint-disable-next-line react/prefer-stateless-function
class Dictionary extends Component {
  render() {
    return (
      <Tabs defaultActiveKey="learn" id="dictionary-tab-mode">
        <Tab eventKey="learn" title="Изучаемые слова">
          tab-1
        </Tab>
        <Tab eventKey="difficult" title="Сложные слова" disabled>
          tab-2
        </Tab>
        <Tab eventKey="deleted" title="Удалённые слова" disabled>
          tab-3
        </Tab>
      </Tabs>
    );
  }
}

const mapStateToProps = (store) => ({

});

const mapDispatchToProps = {

};

Dictionary.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(Dictionary);
