import React, { Component } from 'react';
import Timeline from '../Timeline/Timeline'
const client = require('../../client');


class TimelineList extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      timelines: [],
      not_visible: true,
      button_name: "View Timelines"

    }

    this.changeVisibility = this.changeVisibility.bind(this);
  }

  componentDidMount() {

    client({method: 'GET', path: '/all'}).done(response => {
      this.setState({timelines: response.timelines});
    });
  }

  changeVisibility() {
    this.setState(prevState => ({
      not_visible: !prevState.not_visible
    }));
    if(this.state.not_visible){
      this.setState({
        button_name: "Hide Timelines"
      })
    }
    else{
      this.setState({
        button_name: "View Timelines"
      })
    }
  }


  render(){
    var list = this.state.timelines.map(timeline =>
      <Timeline key={timeline._links.self.href} timeline={timeline}/>
    );

    return(
      <div>
        <form>
          <input className = "main-button" type="button" value={this.state.button_name} onClick={this.changeVisibility} />
        </form>
        <div hidden={this.state.not_visible}>
          {list}
        </div>
      </div>
    );
  }
}

export default TimelineList;