import React from 'react';

export default class Draggable extends React.Component {
  drag = (e) => {
    e.dataTransfer.setData('transfer', e.target.id);
  };

  noAllowDrop = (e) => {
    e.stopPropagation();
  };

  render() {
    return (
      <div
        id={this.props.id}
        draggable="true"
        onDragStart={this.drag}
        onDragOver={this.noAllowDrop}
        className={this.props.className}
        onClick={this.props.handleWordClick}
        onMouseDown={this.props.onMouseDown}
      >
        {this.props.children}
      </div>
    );
  }
}
