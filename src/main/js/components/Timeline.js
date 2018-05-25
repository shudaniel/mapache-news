import { Link } from 'react-router';
import React, { Component } from 'react';

class Timeline extends Component{

  constructor(props){
    super(props);

    this.state = {
      hideEdit: true,
      hideLoader: true,
      formName: "",
      formDescription: "",
      info: [],
      display_buttons: []
    }
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.changeVisibility = this.changeVisibility.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  componentWillMount(){
    var timeline_info = [];
    if(this.props.displayName){
      timeline_info.push(<h3>{this.props.name}</h3>);
    }
    if(this.props.displayDescription){
      timeline_info.push(<p>{this.props.description}</p>)
    }

    var buttons = [];
    if(this.props.displayView){
      buttons.push(<Link to={"/view/" + this.props.timeline_id}><button id="view" className="button view-button" type="button">View</button></Link>);
    }
    if(this.props.displayEdit){
      buttons.push(<button id="edit" className="button edit-button" type="button" onClick={this.changeVisibility}>Edit</button>);
    }
    if(this.props.displayDelete){
      buttons.push(<button id="delete" className="button delete-button" type="button" onClick={this.handleDelete}>Delete</button>);
    }

    this.setState({
      info: timeline_info,
      display_buttons: buttons
    })
  }

  changeVisibility(event){
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

  handleEdit(event){

    var name = this.state.formName;
    var description = this.state.formDescription;
    if(name.length < 1 && description.length < 1){
      window.alert("Please change at least one field");
    }
    else{
      //Disable the button so it can't be pressed again
      document.getElementById("edit").disabled = true;
      document.getElementById("delete").disabled = true;


      this.setState({
        hideEdit: true,
        hideLoader: false
      });

      if(name.length < 1){
        name = this.props.name;
      }
      if(description.length < 1){
        description = this.props.description;
      }

      var root_url = window.location.origin?window.location.origin+'/':window.location.protocol+'/'+window.location.host+'/';
      var url = root_url + "update_timeline?"
        + "timeline_id=" + this.props.timeline_id
        + "&name=" + name
        + "&description=" + description;
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
    document.getElementById("delete").disabled = true;
    document.getElementById("edit").disabled = true;

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
    }).then(function(response) {
        window.location = root_url;
      });
    
  }

  render(){
    return(
      <div className="timeline-item" id={this.props.timeline_id}>
        {this.state.info}
        {this.state.display_buttons}
        <div hidden={this.state.hideLoader} className="loader" />
        <form className="form" hidden={this.state.hideEdit} onSubmit={this.handleEdit}>
          <label>New Name:</label>
          <input type="text" value={this.state.formName} onChange={this.handleNameChange} />
          <br/>
          <label>New Description:</label>
          <textarea type="text" value={this.state.formDescription} onChange={this.handleDescriptionChange}/>
          <br/>
          <input className="button green-button" type="submit" value="Submit"/>
        </form>
        <button className="button delete-button" type="button" hidden={this.state.hideEdit} onClick={this.changeVisibility}>Cancel</button>
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