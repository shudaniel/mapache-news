import React, { Component } from 'react';

class TimelineForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      not_visible: true,
      button_name: "Create Timeline",
	    formName: "",
	    formDescription: ""
    }
	
    this.changeVisibility = this.changeVisibility.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleNameChange = this.handleNameChange.bind(this);
	  this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
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
        button_name: "Create Timeline"
      })
    }
  }

  handleSubmit(event){
    event.preventDefault();
    if(this.state.formName.length < 1){
        window.alert("Please enter a name for this Timeline");
    }
    else{

  	  var home_url = window.location.origin?window.location.origin+'/':window.location.protocol+'/'+window.location.host+'/';

  	  // console.log(this.state.formName);
  	  // console.log(this.state.formDescription);
      var url = home_url +  "create?name=" + this.state.formName + "&description=" + this.state.formDescription;
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
        })
      })
      location.reload();
    }
  }
  
  handleNameChange(event){
	  this.setState({formName: event.target.value});
  }
  
  handleDescriptionChange(event){
	  this.setState({formDescription: event.target.value});
  }
  


  render() {
    return (
        <div className = "timeline_form">
          <form>
            <input className = "main-button" type="button" value={this.state.button_name} onClick={this.changeVisibility} />
          </form>
          <form className="form" hidden={this.state.not_visible} onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" value={this.state.formName} onChange={this.handleNameChange} />
            </label>
            <br/>
            <label>
              Description:
              <textarea type="text" value={this.state.formDescription} onChange={this.handleDescriptionChange}/>
            </label>
            <br/>
            <input type="submit" value="Submit"/>
          </form>
        </div>
      );
  }

}


export default TimelineForm;