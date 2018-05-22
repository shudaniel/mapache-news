import React, { Component } from 'react';

class TimelineForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      not_visible: true,
      button_name: "Create Timeline",
      disablePassword: true
    }
	
    this.changeVisibility = this.changeVisibility.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
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
    var name = document.getElementById("name").value;
    var description = document.getElementById("description").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    if(name.length < 1){
      window.alert("Please enter a name for this Timeline");
    }
    else if(!this.state.disablePassword && password != confirmPassword){
      window.alert("Passwords do not match");
    }
    else{
  	  var home_url = window.location.origin?window.location.origin+'/':window.location.protocol+'/'+window.location.host+'/';

  	  // console.log(name);
  	  // console.log(description);
      var url = home_url +  "create?name=" + name + "&description=" + description;
      if(!this.state.disablePassword){
        url = url + "&password=" + password;
      }
      console.log(url);
      fetch(url, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          description: description,
        })
      })
      location.reload();
    }
  }
  

  handleCheckbox(event){
    this.setState(prevState => ({
      disablePassword: !prevState.disablePassword
    }));
  }
  


  render() {
    return (
        <div className = "timeline_form">
          <form>
            <input className = "main-button" type="button" value={this.state.button_name} onClick={this.changeVisibility} />
          </form>
          <form className="form" hidden={this.state.not_visible} onSubmit={this.handleSubmit}>
            <label for="name">Name:</label>
            <input id="name" type="text" />
            <br/>
            <label for="description">Description: </label>
            <textarea id="description" type="text" />
            <br/>
            <p> You can lock the Timeline by setting a password. If you do not, anybody can edit or delete this Timeline. </p>
            <input id="checkBox" type="checkbox" onClick={this.handleCheckbox}/>
            <label for="checkBox">Lock Timeline</label>
            <br/>
            <label for="password">Password:</label>
            <input id="password" type="text" disabled={this.state.disablePassword}/>
            <br/>
            <label for="confirmPassword">Confirm Password:</label>
            <input id="confirmPassword" type="text" disabled={this.state.disablePassword}/>
            <br/>
            <input type="submit" value="Submit"/>

          </form>
        </div>
      );
  }

}


export default TimelineForm;