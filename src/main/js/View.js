import React, { Component } from 'react';
import { Link } from 'react-router';
import ArticleList from './components/ArticleList/ArticleList'
const API_KEY = "AMHHd6U7KSJqFMjSzKlnoz"; 
//This key came free from making a filestack account


//Filestack documentation: https://www.filestack.com/docs/image-transformations/screenshot
//Filestack is used to grab screenshots of webpages through the url

class View extends Component {
  
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src="" className="App-logo" alt="logo" />
          <h1 className="App-title">View Timeline</h1>
        </header>

        <Link to="/"><button className="button view-button" type="button">Home</button></Link>
        <ArticleList timeline_id={this.props.params.timeline_id} />
      </div>
    );
  }
}

export default View;
