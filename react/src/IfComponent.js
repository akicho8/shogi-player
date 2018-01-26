// https://qiita.com/kmdsbng/items/97a20d73341b8e5de05d

import React from 'react'

class IfComponent extends React.Component {
  render() {
    const {cond, children} = this.props

    if (cond) {
      return (
        <div>
          {children}
        </div>
      )
    } else {
      return null
    }
  }
}

// IfComponent.propTypes = {
//   cond: React.PropTypes.bool.isRequired
// }

export default IfComponent
