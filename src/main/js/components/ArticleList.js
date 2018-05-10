import React, { Component } from 'react';
import Article from './Article'
const API_KEY = "AMHHd6U7KSJqFMjSzKlnoz"; 
//This key came free from making a filestack account


//Filestack documentation: https://www.filestack.com/docs/image-transformations/screenshot
//Filestack is used to grab screenshots of webpages through the url

class View extends Component {
  constructor(props){
    super(props);
    this.state = {
      timelines: {},
      not_visible: true,
      button_name: "View Articles"
    }

    this.getArticles = this.getArticles.bind(this);
    this.changeVisibility = this.changeVisibility.bind(this);
  }

  componentDidMount(){
    var url = window.location.origin?window.location.origin+'/':window.location.protocol+'/'+window.location.host+'/';
    url = url + "all";
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((findresponse)=>{
        this.setState({
            timelines: (findresponse.timelines)[this.props.timeline_id],
        });
    })
  }

  changeVisibility() {
    this.setState(prevState => ({
      not_visible: !prevState.not_visible
    }));
    if(this.state.not_visible){
      this.setState({
        button_name: "Hide Articles"
      })
    }
    else{
      this.setState({
        button_name: "View Articles"
      })
    }
  }


  getArticles(){
    var urls = [];
    if(this.state.timelines["articles"] != null){
      console.log(this.state.timelines["articles"])
      var articles = Object.values(this.state.timelines["articles"]);
      console.log(articles);
      for(var i = 0; i < articles.length; i++){
        if(articles[i] != null){
          // var src = "https://process.filestackapi.com/" + API_KEY + "/urlscreenshot=m:window,width:500,height:500/" + articles[i];
          console.log(articles[i])
          urls.push(
            <Article title={articles[i]["name"]} url={articles[i]["link"]} description={articles[i]["description"]}/>
          );
          urls.push(<div class="horizontalgap"></div>);
        }
      
      }
    }
    else{
      urls.push(<h3>No Articles</h3>);
    }

    return(
      <div>
        {urls}
      </div>
      );
  }


  render() {

    return (
      <div>
        <h3>{this.state.timelines["name"]}</h3>
        <p className="App-intro">
          {this.state.timelines["description"]}
        </p>
        <form>
          <input className = "main-button" type="button" value={this.state.button_name} onClick={this.changeVisibility} />
        </form>
        <div hidden={this.state.not_visible}>
          {this.getArticles()}
        </div>
      </div>
    );
  }
}

export default View;
