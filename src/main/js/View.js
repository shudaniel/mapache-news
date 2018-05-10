import React, { Component } from 'react';
import { Link } from 'react-router';
import ArticleList from './components/ArticleList/ArticleList'
import ArticleForm from './components/ArticleForm/ArticleForm'


class View extends Component {
  
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src="" className="App-logo" alt="logo" />
          <h1 className="App-title">View Timeline</h1>
        </header>

        <Link to="/"><button className="button view-button" type="button">Home</button></Link>
        <ArticleForm timeline_id={this.props.params.timeline_id} />
        <ArticleList timeline_id={this.props.params.timeline_id} />
      </div>
    );
  }
}

export default View;
