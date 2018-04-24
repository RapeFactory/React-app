import React, { Component } from 'react';
import Menu from './Menu';

class Mouse extends Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 211 };
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
      <div className="App-intro">
        <Menu />
        <div
          style={{ minHeight: '730px', minWidth: '100%', backgroundColor: '#ddffff' }}
          onMouseMove={this.handleMouseMove}
        >
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
        <h4>Move the mouse around!</h4>
        <p>
          The current mouse position is ({x}, {y - 211})
        </p>
      </div>
    )}
  </Mouse>
);

export default Test;
