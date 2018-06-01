import React, { Component } from 'react';
const API_KEY = "AMHHd6U7KSJqFMjSzKlnoz"; 
import authenticate from '../util/Authentication.js';

//Filestack documentation: https://www.filestack.com/docs/image-transformations/screenshot
//Filestack is used to grab screenshots of webpages through the url


class Article extends Component {

  constructor(props) {
    super(props);

    this.state = {
      date: this.props.date
    }

    this.handleClick = this.handleClick.bind(this);
    this.get_screenshot = this.get_screenshot.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

  }
  
  componentWillMount(){
    var formattedDate = new Date(this.state.date);
    formattedDate = new Date(formattedDate).toUTCString();
    formattedDate = formattedDate.split(' ').slice(0, 4).join(' ');
    this.setState({
      date: formattedDate
    })
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
	authenticate(this.props.timeline_id).then((hasAccess) => {
		if(hasAccess){
	  
			var root_url = window.location.origin?window.location.origin+'/':window.location.protocol+'/'+window.location.host+'/';
			var url = root_url + "delete_article?";
			if(this.props.isPolitifact){
			  url = root_url + "delete_politifact?"
			}

			url = url  
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
			}).then(function(response) {
				window.location.reload();
			  });
		}
	})
  }

  render() {
	  
    return (
      <div className = "article">
        <h3 title={this.props.description} className="hover" onClick={this.handleClick}>{this.props.title}</h3>
			  <img title={this.props.description} className="thumbnail hover" src={this.get_screenshot()} onClick={this.handleClick} sizes="32x32"/>
        <br/>
        <button className="button delete-button" type="button" onClick={this.handleDelete}>Delete</button>
        <br/>
        <p>{this.state.date}</p>
      </div>
    );
  }

}


export default Article;