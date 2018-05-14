import React, { Component } from 'react';
const API_KEY = "AMHHd6U7KSJqFMjSzKlnoz"; 

//Filestack documentation: https://www.filestack.com/docs/image-transformations/screenshot
//Filestack is used to grab screenshots of webpages through the url


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

  get_screenshot(url){
    var src = "https://process.filestackapi.com/" + API_KEY + "/urlscreenshot=m:window/resize=width:300/" + url;
    return src;
  }

  handleClick(event){
    window.open(this.props.url,'_blank');
  }

  render() {
	  
    return (
      <div className = "article hover" onClick={this.handleClick}>
			  <img src={this.get_screenshot(this.props.url)} sizes="32x32"/>
			  <h3>{this.props.title}</h3>
			  <p>{this.props.description}</p>
			  <br/>
      </div>
    );
  }

}


export default Article;