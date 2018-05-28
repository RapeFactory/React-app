import React, { Component } from 'react';
import { Paper } from 'material-ui';
import { blue50 } from 'material-ui/styles/colors';

class Mouse extends Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 266 };
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
        <Paper
          zDepth={2}
          style={{ minHeight: '675px', minWidth: '99%', backgroundColor: blue50 }}
          onMouseMove={this.handleMouseMove}
        >
          {this.props.children(x, y)}
        </Paper>
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
          The current mouse position is ({x}, {y - 266})
        </p>
      </div>
    )}
  </Mouse>
);

export default Test;
