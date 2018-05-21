import React, { Component } from 'react';
const API_KEY = "AMHHd6U7KSJqFMjSzKlnoz"; 

//Filestack documentation: https://www.filestack.com/docs/image-transformations/screenshot
//Filestack is used to grab screenshots of webpages through the url


class Article extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.get_screenshot = this.get_screenshot.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

  }
  
  get_logo(url){
	var pattern = /.*\.\w*\//
	var result = pattern.exec(url)
	return (result + "favicon.ico")
  }

  get_screenshot(){
    if(this.props.image != null && this.props.image.length > 0){
      return this.props.image
    }
    else{
      return "https://process.filestackapi.com/" + API_KEY + "/urlscreenshot=m:window/resize=width:300/" + this.props.url
    }
  }

  handleClick(event){
    window.open(this.props.url,'_blank');
  }

  handleDelete(event){
    var root_url = window.location.origin?window.location.origin+'/':window.location.protocol+'/'+window.location.host+'/';
    var url = root_url + "delete_article?"
      + "timeline_id=" + this.props.timeline_id
      + "&article_id=" + this.props.article_id
    // console.log(url);
    fetch(url, {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timeline_id: this.props.timeline_id,
        article_id: this.props.article_id,
      })
    })
    window.location.reload();
  }

  render() {
	  
    return (
      <div className = "article">
        <h3 title={this.props.description} className="hover" onClick={this.handleClick}>{this.props.title}</h3>
			  <img title={this.props.description} className="thumbnail hover" src={this.get_screenshot()} onClick={this.handleClick} sizes="32x32"/>
        <button className="button delete-button" type="button" onClick={this.handleDelete}>Delete</button>
      </div>
    );
  }

}


export default Article;