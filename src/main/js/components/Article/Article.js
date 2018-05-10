import React, { Component } from 'react';
// import './Article.css';

class Article extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  
  get_logo(url){
	var pattern = /.*\.\w*\//
	var result = pattern.exec(url)
	return (result + "favicon.ico")
  }

  handleClick(event){
    window.open(this.props.url,'_blank');
  }

  render() {
	  
    return (
      <div className = "article hover" onClick={this.handleClick}>
			  <img src={this.get_logo(this.props.url)} sizes="32x32"/>
			  <h3>{this.props.title}</h3>
			  <p>{this.props.description}</p>
			  <br/>
      </div>
    );
  }

}


export default Article;