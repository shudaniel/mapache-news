import React, { Component } from 'react';
import TimelineForm from './components/TimelineForm'
import TimelineList from './components/TimelineList'
//import './App.css';
import { Link } from 'react-router';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="" className="App-logo" alt="logo" />
          <h1 className="App-title">Timelines</h1>
        </header>
        <p className="App-intro">
          Place some introduction text here
        </p>
        <TimelineForm />
        <br />
        <TimelineList />
      </div>
    );
  }
}
export default App;
