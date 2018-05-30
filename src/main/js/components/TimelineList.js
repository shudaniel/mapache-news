import React, { Component } from 'react';
import Timeline from './Timeline'


class TimelineList extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      timelines: {},
      not_visible: true,
      button_name: "View Timelines"

    }

    this.changeVisibility = this.changeVisibility.bind(this);
    this.filterTimelines = this.filterTimelines.bind(this);
  }

  componentDidMount() {
    var url = window.location.origin?window.location.origin+'/':window.location.protocol+'/'+window.location.host+'/';
    url = url + "all";

    fetch(url)
      .then((response) => response.json())
      .then((findresponse)=>{
        this.state.timelines = findresponse.timelines;
      })
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

  filterTimelines() {
    var input, list, item, timeline, i;
    input = document.getElementById("query");
    input = input.value.toUpperCase();
    list = document.getElementById("allTimelines");
    item = list.getElementsByTagName("li");
    for (i = 0; i < item.length; i++) {
      if (item[i].id.toUpperCase().indexOf(input) > -1) {
        item[i].style.display = "";
      } else {
        item[i].style.display = "none";

      }
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
      if(arr != null){
        list.push(
          <li id={arr["name"] + " " + arr["description"]}><Timeline timeline_id={arr["id"]} name={arr["name"]} description={arr["description"]}/></li>
        );
        list.push(<br/>);
      }
    
    }
    return list;
  }



  render(){
    return(
      <div>
        <form>
          <input className = "main-button" type="button" value={this.state.button_name} onClick={this.changeVisibility} />
        </form>
        <br/>
        <div className="search-bar" hidden={this.state.not_visible}>
          <label>Search</label>
          <input type="text" id="query" onKeyUp={this.filterTimelines} placeholder="Name/Description..." />
        </div>
        <ul id="allTimelines" hidden={this.state.not_visible}>
          {this.generateTimelineList()}
        </ul>
      </div>
    );
  }
}

export default TimelineList;