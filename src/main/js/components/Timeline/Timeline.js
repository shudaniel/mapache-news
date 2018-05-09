import React, { Component } from 'react';

class Timeline extends React.Component{
  render(){
    return(
      <div className="timeline-item" id={this.props.id}>
        <h3>{this.props.timeline.name}</h3>
        <p>{this.props.timeline.description}</p>
        <button className="button view-button" type="button">View</button>
        <button className="button edit-button" type="button">Edit</button>
        <button className="button delete-button" type="button">Delete</button>
      </div>
    );
  }
}

export default Timeline;