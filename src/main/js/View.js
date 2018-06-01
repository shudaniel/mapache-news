import React, { Component } from 'react';
import { Link } from 'react-router';
import ArticleList from './components/ArticleList'
import ArticleForm from './components/ArticleForm'
import Timeline from './components/Timeline'
import PolitifactForm from './components/PolitifactForm'
import authenticate from './util/Authentication.js';

class View extends Component {

  constructor(props){
    super(props);

    this.state = {
      name: "",
      description: "",
      hideSearch: true,
      hideLoader: true,
      hidePolitifactForm: true,
      hidePolitifactLoader: true,
	    password: ""
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
          description: findresponse.timelines[this.props.params.timeline_id]["description"]
//		  password: findresponse.timelines[this.props.params.timeline_id]["password"]
        });
      })
  }


  handleAutoGenerate(event){
    var query = document.getElementById("query").value;

    if(query.length < 1){
      window.alert("Please enter a query.");
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

      document.getElementById("politifact-generator").disabled = true;

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
  	authenticate(this.props.params.timeline_id).then((hasAccess) => {
  		if(hasAccess){
  			this.setState(prevState => ({
  				hideSearch: !prevState.hideSearch
  			}));
  		}
  	})
  }

  showPolitifactForm(){
    authenticate(this.props.params.timeline_id).then((hasAccess) => {
      if(hasAccess){
        this.setState(prevState => ({
          hidePolitifactForm: !prevState.hidePolitifactForm
        }));
      }
    })
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
          <p>*Automatically generates articles based on query term</p>
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
          <button id="politifact-generator" className="button green-button" type="button" onClick={this.showPolitifactForm}>Generate Politifact Articles</button>
          <div hidden={this.state.hidePolitifactLoader} className="loader" />
          <form className="form" hidden={this.state.hidePolitifactForm} onSubmit={this.handlePolitifact}>
            <label>Query:</label>
            <input id="politifact_search" type="text"  />
            <br/>
            <p>*Automatically generates Politifact articles based on query term</p>
            <input className="button green-button" type="submit" value="Submit"/>
          </form>
          <PolitifactForm timeline_id = {this.props.params.timeline_id} />
          <ArticleList timeline_id={this.props.params.timeline_id} isPolitifact={true} />

        </div>
      </div>
    );
  }
}

export default View;
