import React from 'react'

class Example0010 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      baz: null,
    }
  }

  render() {
    return (
      <div>
        <div>foo={this.props.foo}</div>
        <div>bar={this.props.bar}</div>
        <div>baz={this.state.baz}</div>
        <button onClick={() => {alert(1)}}>BUTTON1</button>
        <button onClick={() => this.setState({baz: "x"})}>BUTTON2</button>
        <input onChange={(e) => this.setState({baz: e.target.value})} />{this.state.baz}
      </div>
    )
  }
}

export default Example0010
