import { Link } from 'react-router';
import React, { Component } from 'react';

class Timeline extends Component{

  constructor(props){
    super(props);

    this.state = {
      hide_edit_form: true,
      formName: this.props.name,
      formDescription: this.props.description
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.changeVisibility = this.changeVisibility.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  changeVisibility(event){
    this.setState(prevState => ({
      hide_edit_form: !prevState.hide_edit_form
    }));
  }

  handleNameChange(event){
    this.setState({formName: event.target.value});
  }
  
  handleDescriptionChange(event){
    this.setState({formDescription: event.target.value});
  }

  onSubmit(event){
    if(this.state.formName.length < 1){
      window.alert("Timeline name cannot be blank");
    }
    else{
      var url = window.location.origin?window.location.origin+'/':window.location.protocol+'/'+window.location.host+'/';
      url = url + "update_timeline?"
        + "timeline_id=" + this.props.timeline_id
        + "&name=" + this.state.formName
        + "&description=" + this.state.formDescription;
      console.log(url);
      fetch(url, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timeline_id: this.props.timeline_id,
          name: this.state.formName,
          description: this.state.formDescription,
        })
      })
      location.reload();

    }
  }

  render(){
    return(
      <div className="timeline-item" id={this.props.timeline_id}>
        <h3>{this.props.name}</h3>
        <p>{this.props.description}</p>
        <Link to={"/view/" + this.props.timeline_id}><button className="button view-button" type="button">View</button></Link>
        <button className="button edit-button" type="button" onClick={this.changeVisibility}>Edit</button>
        <button className="button delete-button" type="button">Delete</button>
        <form className="form" hidden={this.state.hide_edit_form} onSubmit={this.onSubmit}>
          <label>
            Name:
            <input type="text" defaultValue={this.props.name} onChange={this.handleNameChange} />
          </label>
          <br/>
          <label>
            Description:
            <textarea type="text" defaultValue={this.props.description} onChange={this.handleDescriptionChange}/>
          </label>
          <br/>
          <input type="submit" value="Submit"/>
        </form>
        <button className="button delete-button" type="button" hidden={this.state.hide_edit_form} onClick={this.changeVisibility}>Cancel</button>
      </div>
    );
  }
}

export default Timeline;