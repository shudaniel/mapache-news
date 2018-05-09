import React, { Component } from 'react';
// import './TimelineForm.css';

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
	  this.uploadTimeline = this.uploadTimeline.bind(this);
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

  uploadTimeline(){
	  /*
	  fetch('https://mywebsite.com/endpoint/', {
		  method: 'POST',
		  headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
			firstParam: 'yourValue',
			secondParam: 'yourOtherValue',
		  })
		})
	  */
	  
	  console.log(this.state.formName);
	  console.log(this.state.formURL);
	  console.log(this.state.formDescription);
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
          <form className="form" hidden={this.state.not_visible} onSubmit={this.uploadTimeline}>
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