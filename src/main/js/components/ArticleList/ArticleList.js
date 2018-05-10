import React, { Component } from 'react';
import Article from '../Article/Article'
const API_KEY = "AMHHd6U7KSJqFMjSzKlnoz"; 
//This key came free from making a filestack account


//Filestack documentation: https://www.filestack.com/docs/image-transformations/screenshot
//Filestack is used to grab screenshots of webpages through the url

class View extends Component {
  constructor(props){
    super(props);
    this.state = {
      timelines: {},
      isLoading: true,
      not_visible: true,
      button_name: "View Articles"
    }

    this.getArticles = this.getArticles.bind(this);
    this.onClick = this.onClick.bind(this);
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
            timelines: findresponse.timelines,
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
    console.log(this.state.timelines)
    console.log(this.props.timeline_id)
    var timeline = this.state.timelines[this.props.timeline_id];
    console.log(timeline);
    console.log(timeline["name"]);
    var urls = [];
    if(timeline["articles"] != null){
      var articles = Object.values(timeline["articles"]);
      var keys = Object.keys(timeline["articles"]);
      console.log(keys);
      for(var i = 0; i < articles.length; i++){
      // var src = "https://process.filestackapi.com/" + API_KEY + "/urlscreenshot=m:window,width:500,height:500/" + articles[i];
      
        urls.push(
          <Article title={articles[key[i]].name} url={articles[key[i]].link} description={articles[key[i]].description}/>
        );
        urls.push(<div class="horizontalgap"></div>);
      
      
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

  onClick(event){
    this.setState({isLoading:false});
  }

  render() {
    //For some reason, if I do not add this, then this.state.timelines is undefined
    if(this.state.isLoading){
      console.log(this.state.timelines);
      return (
        <div>
          <h2>Loading</h2>
          <form><input className = "main-button" type="button" value="Finished Loading. Click to View" onClick={this.onClick} /></form>
        </div>
      );      
    }

    return (
      <div>
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
