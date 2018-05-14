const React = require('react');
const ReactDOM = require('react-dom');
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './App'
import View from './View'


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="/view/:name/:description/:timeline_id" component={View} />
    <Route path="/view/:name/:timeline_id" component={View} />
  </Router>,
  document.getElementById('react')
)