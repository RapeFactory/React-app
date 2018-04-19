import React, { Component } from 'react';
import Menu from './Menu';

class Mouse extends Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    const { x, y } = this.state;
    return (
      <div>
        <Menu />
        <div style={{ height: '700px', backgroundColor: '#ccffff' }} onMouseMove={this.handleMouseMove}>
          {this.props.children(x, y)}
        </div>
      </div>
    );
  }
}

const Test = () => (
  <Mouse>
    {(x, y) => (
      <div>
        <h1>Move the mouse around!</h1>
        <p>
          The current mouse position is ({x}, {y - 229})
        </p>
      </div>
    )}
  </Mouse>
);

export default Test;
