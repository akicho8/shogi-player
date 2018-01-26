import React, { Component } from 'react'
import NumberButton from "./NumberButton"
import Result from "./Result"

// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

class CalculatorContainer extends Component {
  render() {
    // const { calculator, actions } = this.props
    return (
      <div>
        <div>
        </div>
        <div>
          <Result />
        </div>
      </div>
    )
  }
}

export default CalculatorContainer
