// <html>
//   <body>
//     <div id="root"></div>
//
//     <!-- 両方必要 -->
//     <script src="https://unpkg.com/react@15.3.1/dist/react.min.js"></script>
//     <script src="https://unpkg.com/react-dom@15.3.1/dist/react-dom.min.js"></script>
//
//     <!-- 謎のタグを変換してくれる。jsxtransformer を使うのは古いやり方 -->
//     <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
//     <script type="text/babel">
//
//       class Foo extends React.Component {
//         constructor(props) {
//           super(props)
//           this.state = {
//             v: "a",
//           }
//         }
//         henkoushita(e) {
//           this.setState({v: e.target.value})
//         }
//         render() {
//            return (
//              <div>
//                <input type="text" value={this.state.v} onChange={this.henkoushita.bind(this)} ref="key1" /><br/>
//                {this.state.v}
//              </div>
//            )
//         }
//       }
//
//       ReactDOM.render(<Foo/>, document.getElementById('root'));
//     </script>
//   </body>
// </html>

import React from 'react'

class FormDemo1 extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  getInitialState() {
    return {
      foo: 0,
    }
  }

  yobareru(e) {
    this.setState({foo: e.target.value})
  }

  // setStateTextVal: function(foo) {
  //   this.setState({foo: foo})
  // },

  render() {
    // const { calculator, actions } = this.props
    return (
      <div>
        <input type="text" onChange={this.yobareru} />
        <div>
          {this.state.foo}
        </div>
      </div>
    )
  }
}

export default FormDemo1
