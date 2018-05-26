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
      description: "",
      hideSearch: true,
      hideLoader: true,
      hidePolitifactForm: true,
      hidePolitifactLoader: true
    }

    this.handleAutoGenerate = this.handleAutoGenerate.bind(this);
    this.handlePolitifact = this.handlePolitifact.bind(this);
    this.showSearchForm = this.showSearchForm.bind(this);
    this.showPolitifactForm = this.showPolitifactForm.bind(this);
  }

  componentWillMount() {
    var url = window.location.origin?window.location.origin+'/':window.location.protocol+'/'+window.location.host+'/';
    url = url + "all";

    fetch(url)
      .then((response) => response.json())
      .then((findresponse)=>{
        this.setState({
          name: findresponse.timelines[this.props.params.timeline_id]["name"],
          description: findresponse.timelines[this.props.params.timeline_id]["description"],
        });
      })
  }


  handleAutoGenerate(event){
    var query = document.getElementById("query").value;
    var start_date = document.getElementById("start_date").value;
    var end_date = document.getElementById("end_date").value;

    if(query.length < 1){
      window.alert("Please enter a query.");
    }
    else if(start_date.length < 1){
      window.alert("Please enter a start date.");
    }
    else if(end_date.length < 1){
      window.alert("Please enter an end date.");
    }
    else{

      document.getElementById("generator").disabled = true;

      this.setState(prevState => ({
        hideSearch: true,
        hideLoader: false
      }));

      var root_url = window.location.origin?window.location.origin+'/':window.location.protocol+'/'+window.location.host+'/';
      var url = root_url + "generate?"
        + "timeline_id=" + this.props.params.timeline_id
        + "&query=" + query
        + "&start_date=" + start_date
        + "&end_date=" + end_date
      fetch(url, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timeline_id: this.props.params.timeline_id,
          query: query
        })
      }).then(function(response) {
        window.location.reload();
      });
    }
  }

  handlePolitifact(event){
    var query = document.getElementById("politifact_search").value;

    if(query.length < 1){
      window.alert("Please enter a query term.");
    }
    else{

      document.getElementById("generator").disabled = true;

      this.setState(prevState => ({
        hidePolitifactForm: true,
        hidePolitifactLoader: false
      }));

      var root_url = window.location.origin?window.location.origin+'/':window.location.protocol+'/'+window.location.host+'/';
      var url = root_url + "politifact?"
        + "timeline_id=" + this.props.params.timeline_id
        + "&query=" + query
      fetch(url, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timeline_id: this.props.params.timeline_id,
          query: query
        })
      }).then(function(response) {
        window.location.reload();
      });
    }

  }

  showSearchForm(){
    this.setState(prevState => ({
      hideSearch: !prevState.hideSearch
    }));
  }

  showPolitifactForm(){
    this.setState(prevState => ({
      hidePolitifactForm: !prevState.hidePolitifactForm
    }));
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="" className="App-logo" alt="logo" />
          <h1 className="App-title">{this.state.name}</h1>
        </header>

        <Link to="/"><button className="button view-button" type="button">Home</button></Link>
        <button id="generator" className="button green-button" type="button" onClick={this.showSearchForm}>Auto-Generate Articles</button>
        <div hidden={this.state.hideLoader} className="loader" />
        <br/>
        <form className="form" hidden={this.state.hideSearch} onSubmit={this.handleAutoGenerate}>
          <label>Query:</label>
          <input id="query" type="text"  />
          <br/>
          <label>Start Date:</label>
            <input id="start_date" type="date" />
          <br/>
          <label>End Date:</label>
          <input id="end_date" type="date" />
          <br/>
          <p>*Automatically generates articles between specified dates based on query term</p>
          <input className="button green-button" type="submit" value="Submit"/>
        </form>
        
        <p className="App-intro">
          {this.state.description}
        </p>

        <Timeline timeline_id={this.props.params.timeline_id} displayView={false} displayName={false} displayDescription={false} name={this.state.name} description={this.state.description} />
        <ArticleForm timeline_id={this.props.params.timeline_id} />
        <ArticleList timeline_id={this.props.params.timeline_id} />
        <div>
          <h3>Politifact</h3>
          <button id="generator" className="button green-button" type="button" onClick={this.showPolitifactForm}>Generate Politifact Articles</button>
          <div hidden={this.state.hidePolitifactLoader} className="loader" />
          <form className="form" hidden={this.state.hidePolitifactForm} onSubmit={this.handlePolitifact}>
            <label>Query:</label>
            <input id="politifact_search" type="text"  />
            <br/>
            <p>*Automatically generates Politifact articles based on query term</p>
            <input className="button green-button" type="submit" value="Submit"/>
          </form>
          <ArticleList timeline_id={this.props.params.timeline_id} isPolitifact={true} />

        </div>
      </div>
    );
  }
}

export default View;