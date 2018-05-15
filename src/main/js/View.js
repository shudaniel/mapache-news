import React, { Component } from 'react';
import { Link } from 'react-router';
import ArticleList from './components/ArticleList'
import ArticleForm from './components/ArticleForm'
import Timeline from './components/Timeline'


class View extends Component {

  constructor(props){
    super(props);

    this.state = {
      name: "",
      description: ""
    }

  }

  componentWillMount() {
    console.log("Component will mount");
    var url = window.location.origin?window.location.origin+'/':window.location.protocol+'/'+window.location.host+'/';
    url = url + "all";
    // console.log(url);

    fetch(url)
      .then((response) => response.json())
      .then((findresponse)=>{
        this.setState({
          name: findresponse.timelines[this.props.params.timeline_id]["name"],
          description: findresponse.timelines[this.props.params.timeline_id]["description"],
        });
      })
  }
  // componentDidMount(){
  //   console.log("did mount");
  //   console.log(this.state.timelines);
  //   console.log(this.state.timelines.length);
  //   this.setTimelineInfo();
  // }

  setTimelineInfo(){
    console.log(this.state.timelines);
    var timeline = this.state.timelines[this.props.params.timeline_id];
    console.log(timeline);
    if(timeline != null){
      this.setState({
        name: timeline["name"],
        description: timeline["description"]
      });
    }
  }

  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="" className="App-logo" alt="logo" />
          <h1 className="App-title">{this.state.name}</h1>
        </header>

        <Link to="/"><button className="button view-button" type="button">Home</button></Link>
        <p className="App-intro">
          {this.state.description}
        </p>
        <Timeline timeline_id={this.props.params.timeline_id} displayView={false} displayName={false} displayDescription={false} name={this.state.name} description={this.state.description} />
        <ArticleForm timeline_id={this.props.params.timeline_id} />
        <ArticleList timeline_id={this.props.params.timeline_id} />
      </div>
    );
  }
}

export default View;
