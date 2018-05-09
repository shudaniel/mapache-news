import React, { Component } from 'react';
import './Article.css';

class Article extends Component {

  constructor(props) {
    super(props);
  }
  
  get_logo(url){
	var pattern = /.*\.\w*\//
	var result = pattern.exec(url)
	return (result + "favicon.ico")
  }

  render() {
	  
    return (
        <div className = "article">
			<a href={this.props.url} target="_blank"><img src={this.get_logo(this.props.url)} sizes="32x32"/></a>
			<h3>{this.props.title}</h3>
			<p>{this.props.description}</p>
			<br/>
        </div>
      );
  }

}


export default Article;