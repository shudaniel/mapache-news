import { Link } from 'react-router';
import React, { Component } from 'react';
import authenticate from '../util/Authentication.js';

class Timeline extends Component{

  constructor(props){
    super(props);

    this.state = {
      hide_edit_form: true,
      formName: this.props.name,
      formDescription: this.props.description
    }
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.changeVisibility = this.changeVisibility.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  
  changeVisibility(event){
	console.log('idkman');
	authenticate(this.props.timeline_id).then((hasAccess) => {
		if(hasAccess){
			this.setState(prevState => ({
				hide_edit_form: !prevState.hide_edit_form
			}));
		}
	});
  }

  handleNameChange(event){
    this.setState({formName: event.target.value});
  }
  
  handleDescriptionChange(event){
    this.setState({formDescription: event.target.value});
  }

  handleEdit(event){
	  
    if(this.state.formName.length < 1){
      window.alert("Timeline name cannot be blank");
    }
    else{
      var root_url = window.location.origin?window.location.origin+'/':window.location.protocol+'/'+window.location.host+'/';
      var url = root_url + "update_timeline?"
        + "timeline_id=" + this.props.timeline_id
        + "&name=" + this.state.formName
        + "&description=" + this.state.formDescription;
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
      window.location.reload();

    }
  }

  handleDelete(event){

	  
    var root_url = window.location.origin?window.location.origin+'/':window.location.protocol+'/'+window.location.host+'/';
    var url = root_url + "delete_timeline?"
      + "timeline_id=" + this.props.timeline_id
    // console.log(url);
    fetch(url, {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timeline_id: this.props.timeline_id,
      })
    })
    window.location = root_url;
  }

  render(){
    var timeline_info = [];
    if(this.props.displayName){
      timeline_info.push(<h3>{this.props.name}</h3>);
    }
    if(this.props.displayDescription){
      timeline_info.push(<p>{this.props.description}</p>)
    }

    var buttons = [];
    if(this.props.displayView){
      buttons.push(<Link to={"/view/" + this.props.timeline_id}><button className="button view-button" type="button">View</button></Link>);
    }
    if(this.props.displayEdit){
      buttons.push(<button className="button edit-button" type="button" onClick={this.changeVisibility}>Edit</button>);
    }
    if(this.props.displayDelete){
      buttons.push(<button className="button delete-button" type="button" onClick={this.handleDelete}>Delete</button>);
    }
    return(
      <div className="timeline-item" id={this.props.timeline_id}>
        {timeline_info}
        {buttons}
        <form className="form" hidden={this.state.hide_edit_form} onSubmit={this.handleEdit}>
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

Timeline.defaultProps = {
    displayName: true,
    displayDescription: true,
    displayView: true,
    displayEdit: true,
    displayDelete: true
  }

export default Timeline;