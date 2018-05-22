import React, { Component } from 'react';

class ArticleForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      not_visible: true,
      button_name: "Add Article"
    }
  
    this.changeVisibility = this.changeVisibility.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    var name = document.getElementById("name").value;
    var description = document.getElementById("description").value;
    var link = document.getElementById("url").value;
    var date = document.getElementById("date").value;

    if(name.length < 1){
      window.alert("Please enter Article Name");
    }
    else if(link.length < 1){
      window.alert("Please enter the Article URL");
    }
    else if (date.length < 1){
      window.alert("Please enter the Article Date");
    }
    else{

      var url = window.location.origin?window.location.origin+'/':window.location.protocol+'/'+window.location.host+'/';

      var url = url + "add_article?"
        + "timeline_id=" + this.props.timeline_id
        + "&name=" + name 
        + "&link=" + link
        + "&date=" + date
        + "&description=" + description;
      fetch(url, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          description: description,
          link: link,
          date: date
        })
      })
      location.reload();
    }
  }
  


  render() {
    return (
        <div className = "timeline_form">
          <form>
            <input className = "main-button" type="button" value={this.state.button_name} onClick={this.changeVisibility} />
          </form>
          <form className="form" hidden={this.state.not_visible} onSubmit={this.handleSubmit}>
            <label>Name:</label>
            <input id="name" type="text"  />
            <br/>
            <label>URL:</label>
            <input id="url" type="text" />
            <br/>
            <label>Date:</label>
            <input id="date" type="date" />
            <br/>
            <label>Description:</label>
            <textarea id="description" type="text" />
            <br/>
            <input type="submit" value="Submit"/>
          </form>
        </div>
      );
  }

}


export default ArticleForm;