import React, { Component } from 'react';

class ArticleForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      not_visible: true,
      button_name: "Add Article",
      formName: "",
      formDescription: "",
      formLink: "",
      formDate: ""
    }
  
    this.changeVisibility = this.changeVisibility.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLinkChange = this.handleLinkChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  changeVisibility() {
    this.setState(prevState => ({
      not_visible: !prevState.not_visible
    }));
    if(this.state.not_visible){
      this.setState({
        button_name: "Cancel"
      })
    }
    else{
      this.setState({
        button_name: "Add Article"
      })
    }
  }

  handleSubmit(event){
    event.preventDefault();
    if(this.state.formName.length < 1){
        window.alert("Please enter Article Name");
    }
    else if(this.state.formLink.length < 1){
        window.alert("Please enter the Article URL");
    }
    else{

      var url = window.location.origin?window.location.origin+'/':window.location.protocol+'/'+window.location.host+'/';

      var url = url + "add_article?"
        + "timeline_id=" + this.props.timeline_id
        + "&name=" + this.state.formName 
        + "&link=" + this.state.formLink
        + "&date=" + this.state.formDate
        + "&description=" + this.state.formDescription;
      console.log(url);
      fetch(url, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.formName,
          description: this.state.formDescription,
          link: this.state.formLink,
          date: this.state.formDate
        })
      })
      location.reload();
    }
  }
  
  handleNameChange(event){
    this.setState({formName: event.target.value});
  }

  handleLinkChange(event){
    this.setState({formLink: event.target.value});
  }
  
  handleDescriptionChange(event){
    this.setState({formDescription: event.target.value});
  }

  handleDateChange(event){
    this.setState({formDate: event.target.value});
  }
  


  render() {
    return (
        <div className = "timeline_form">
          <form>
            <input className = "main-button" type="button" value={this.state.button_name} onClick={this.changeVisibility} />
          </form>
          <form className="form" hidden={this.state.not_visible} onSubmit={this.handleSubmit}>
            <label>Name:</label>
            <input type="text" value={this.state.formName} onChange={this.handleNameChange} />
            <br/>
            <label>URL:</label>
            <input type="text" value={this.state.formLink} onChange={this.handleLinkChange} />
            <br/>
            <label>Date:</label>
            <input id="date" type="date" onChange={this.handleDateChange} />
            <br/>
            <label>Description:</label>
            <textarea type="text" value={this.state.formDescription} onChange={this.handleDescriptionChange}/>
            <br/>
            <input type="submit" value="Submit"/>
          </form>
        </div>
      );
  }

}


export default ArticleForm;