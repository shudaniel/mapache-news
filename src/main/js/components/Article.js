import React, { Component } from 'react';
const API_KEY = "AMHHd6U7KSJqFMjSzKlnoz"; 

//Filestack documentation: https://www.filestack.com/docs/image-transformations/screenshot
//Filestack is used to grab screenshots of webpages through the url


class Article extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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
        <h3 className="hover" onClick={this.handleClick}>{this.props.title}</h3>
        <p>{this.props.description}</p>
			  <img className="hover" src={this.get_screenshot(this.props.url)} onClick={this.handleClick} sizes="32x32"/>
        <button className="button delete-button" type="button" onClick={this.handleDelete}>Delete</button>
      </div>
    );
  }

}


export default Article;