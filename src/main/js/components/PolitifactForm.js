import React, { Component } from 'react';
import authenticate from '../util/Authentication.js';


class PolitifactForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      not_visible: true,
      hideLoader: true,
      formLink: "",
      formDate: ""
    }
  
    this.changeVisibility = this.changeVisibility.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLinkChange = this.handleLinkChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);

  }

  changeVisibility() {
    authenticate(this.props.timeline_id).then((hasAccess) => {
      if(hasAccess){
        this.setState(prevState => ({
                not_visible: !prevState.not_visible
              }));
      }
    })
  }

  handleSubmit(event){
    event.preventDefault();

    if(this.state.formLink.length < 1){
      window.alert("Please enter the Article URL");
    }
    else if (this.state.formDate.length < 1){
      window.alert("Please enter the Article Date");
    }
    else{
      this.setState({
        not_visible: true,
        hideLoader: false
      });

      var url = window.location.origin?window.location.origin+'/':window.location.protocol+'/'+window.location.host+'/';
      var date = this.state.formDate;
      var link = "http://www.politifact.com";
      if(this.state.formLink.charAt(0) == "/"){
        link = link + this.state.formLink;
      }
      else{
        link = link + "/" + this.state.formLink;
      }

      var url = url + "add_politifact?"
        + "timeline_id=" + this.props.timeline_id
        + "&link=" + link
        + "&date=" + date
      fetch(url, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          link: link,
          date: date
        })
      }).then(function(response) {
        window.location.reload();
      });
    }
  }
  
  handleLinkChange(event){
    this.setState({formLink: event.target.value});
  }
  
  handleDateChange(event){
    this.setState({formDate: event.target.value});
  }


  render() {
    return (
        <div className = "timeline_form">
          <button className = "button teal-button" type = "button" onClick={this.changeVisibility}>Add Single Politifact Article</button>
          <div hidden={this.state.hideLoader} className="loader" />
          <form className="form" hidden={this.state.not_visible} onSubmit={this.handleSubmit}>
            <label>URL: http://www.politifact.com/</label>
            <textarea id="url" type="text" value={this.state.formLink} onChange={this.handleLinkChange}/>
            <br/>
            <label>Publication Date:</label>
            <input id="date" type="date" value={this.state.formDate} onChange={this.handleDateChange} />
            <br/>
            <p> Note: This must be a valid politifact article </p>
            <input className="button green-button" type="submit" value="Submit"/>
          </form>
        </div>
      );
  }

}


export default PolitifactForm;