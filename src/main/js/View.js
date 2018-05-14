import React, { Component } from 'react';
import { Link } from 'react-router';
import ArticleList from './components/ArticleList'
import ArticleForm from './components/ArticleForm'
import Timeline from './components/Timeline'


class View extends Component {
  
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src="" className="App-logo" alt="logo" />
          <h1 className="App-title">{this.props.params.name}</h1>
        </header>

        <Link to="/"><button className="button view-button" type="button">Home</button></Link>
        <p className="App-intro">
          {this.props.params.description}
        </p>
        <Timeline timeline_id={this.props.params.timeline_id} displayView={false} displayName={false} displayDescription={false} name={this.props.params.name} description={this.props.params.description} />
        <ArticleForm timeline_id={this.props.params.timeline_id} />
        <ArticleList timeline_id={this.props.params.timeline_id} />
      </div>
    );
  }
}

export default View;
