const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
import App from './App'

class Timeline extends React.Component{
  render() {
    return (
      <tr>
        <td>{this.props.timeline.name}</td>
        <td>{this.props.timeline.description}</td>
      </tr>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('react')
)