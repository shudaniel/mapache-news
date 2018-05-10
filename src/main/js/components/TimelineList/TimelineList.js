import React, { Component } from 'react';
import Timeline from '../Timeline/Timeline'


class TimelineList extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      timelines: {},
      not_visible: true,
      button_name: "View Timelines"

    }

    this.changeVisibility = this.changeVisibility.bind(this);
  }

  componentDidMount() {
    var url = window.location.origin?window.location.origin+'/':window.location.protocol+'/'+window.location.host+'/';
    url = url + "all";
    // console.log(url);

    fetch(url)
      .then((response) => response.json())
      .then((findresponse)=>{
        this.state.timelines = findresponse.timelines;
      })
  }

  changeVisibility() {
    // console.log(JSON.stringify(this.state.timelines));

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

  generateTimelineList() {
    var list = [];
    var keys = Object.keys(this.state.timelines);
    if(keys.length == 0){
      list.push(<h1> No Timelines </h1>);
    }

    for(var i = 0; i < Object.keys(this.state.timelines).length; i++){
      var arr = this.state.timelines[keys[i]];
      // console.log(arr)
      list.push(
        <Timeline article_id={arr["id"]} name={arr["name"]} description={arr["description"]}/>
      );
    list.push(<br/>);
    
    }
    return list;
  }



  render(){
    console.log(this.state.timelines);
    return(
      <div>
        <form>
          <input className = "main-button" type="button" value={this.state.button_name} onClick={this.changeVisibility} />
        </form>
        <div hidden={this.state.not_visible}>
          {this.generateTimelineList()}
        </div>
      </div>
    );
  }
}

export default TimelineList;