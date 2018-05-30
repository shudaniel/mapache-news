import React, { Component } from 'react';
const API_KEY = "AMHHd6U7KSJqFMjSzKlnoz"; 

//Filestack documentation: https://www.filestack.com/docs/image-transformations/screenshot
//Filestack is used to grab screenshots of webpages through the url


class Article extends Component {

  constructor(props) {
    super(props);

    this.state = {
      date: this.props.date,
      hideEdit: true,
      hideLoader: true,
      formName: "",
      formDescription: "",
      formLink: "",
      formDate: "",
    }

    this.handleClick = this.handleClick.bind(this);
    this.get_screenshot = this.get_screenshot.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.changeVisibility = this.changeVisibility.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleLinkChange = this.handleLinkChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);

  }
  
  componentWillMount(){
    var formattedDate = new Date(this.state.date);
    formattedDate = new Date(formattedDate).toUTCString();
    formattedDate = formattedDate.split(' ').slice(0, 4).join(' ');

    this.setState({
      date: formattedDate,
      formName: this.props.title,
      formDescription: this.props.description,
      formLink: this.props.url,
      formDate: this.props.date
    });
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

  handleEdit(event){
    var name = this.state.formName;
    var description = this.state.formDescription;
    var link = this.state.formLink;
    var date = this.state.formDate;
    if(name.length < 1 && !this.props.isPolitifact){
      window.alert("Please enter a Timeline name");
    }
    else if(link.length < 1){
      window.alert("Please enter a url");
    }
    else if(date.length < 1){
      window.alert("Please enter a date");
    }
    else{
      //Disable the button so it can't be pressed again
      document.getElementById("edit").disabled = true;
      document.getElementById("delete").disabled = true;


      this.setState({
        hideEdit: true,
        hideLoader: false
      });
      if(link.substring(0,7) != "http://"){
        link = "http://" + link;
      }

      var root_url = window.location.origin?window.location.origin+'/':window.location.protocol+'/'+window.location.host+'/';
      var url = root_url + "update_article?";
      url = url  
        + "timeline_id=" + this.props.timeline_id 
        + "&article_id=" + this.props.article_id
        + "&name=" + name
        + "&description=" + description
        + "&link=" + link
        + "&date=" + date
        + "&politifact=" + this.props.isPolitifact

      fetch(url, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timeline_id: this.props.timeline_id,
          name: name,
          description: description,
        })
      }).then(function(response) {
        window.location.reload();
      });
    }
    
  }

  handleDelete(event){
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

  changeVisibility(){
    this.setState(prevState => ({
      hideEdit: !prevState.hideEdit
    }));
  }

  handleNameChange(event){
    this.setState({formName: event.target.value});
  }
  
  handleDescriptionChange(event){
    this.setState({formDescription: event.target.value});
  }

  handleLinkChange(event){
    this.setState({formLink: event.target.value});
  }
  
  handleDateChange(event){
    this.setState({formDate: event.target.value});
  }

  render() {
	  
    return (
      <div className = "article">
        <h3 title={this.props.description} className="hover" onClick={this.handleClick}>{this.props.title}</h3>
			  <img title={this.props.description} className="thumbnail hover" src={this.get_screenshot()} onClick={this.handleClick} sizes="32x32"/>
        <br/>
        <button id="edit" className="button edit-button" type="button" onClick={this.changeVisibility}>Edit</button>
        <button id="delete" className="button delete-button" type="button" onClick={this.handleDelete}>Delete</button>
        <br/>
        <div hidden={this.state.hideLoader} className="loader" />
        <form className="form" hidden={this.state.hideEdit} onSubmit={this.handleEdit}>
          <label>Name:</label>
          <textarea id="name" type="text" value={this.state.formName} onChange={this.handleNameChange} />
          <br />
          <label>Description:</label>
          <textarea id="description" type="text" value={this.state.formDescription} onChange={this.handleDescriptionChange} />
          <br/>
          <label>Link:</label>
          <textarea id="link" type="text" value={this.state.formLink} onChange={this.handleLinkChange} />
          <br/>
          <label>Date:</label>
          <input id="date" type="date" value={this.state.formDate} onChange={this.handleDateChange} />
          <br/>
          <input className="button green-button" type="submit" value="Submit"/>
        </form>
        <p>{this.state.date}</p>
      </div>
    );
  }

}

Article.defaultProps = {
  isPolitifact: false
}


export default Article;