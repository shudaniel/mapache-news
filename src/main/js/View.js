import React, { Component } from 'react';
import { Link } from 'react-router';
import Article from './components/Article/Article'
const API_KEY = "AMHHd6U7KSJqFMjSzKlnoz"; 
//This key came free from making a filestack account


//Filestack documentation: https://www.filestack.com/docs/image-transformations/screenshot
//Filestack is used to grab screenshots of webpages through the url

class View extends Component {
  constructor(props){
    super(props);

    // this.state = {
    //   timeline: timelines[this.props.params.id],
    //   articles: timelines[this.props.params.id]["Articles"]
    // }
    // this.getArticles = this.getArticles.bind(this);
  }

  // getArticles(){
  //   var urls = [];
  //   var articles = Object.values(this.state.articles)
  //   for(var i = 0; i < articles.length; i++){
  //   // var src = "https://process.filestackapi.com/" + API_KEY + "/urlscreenshot=m:window,width:500,height:500/" + articles[i];
    
  //   urls.push(
  //   <Article title={articles[i].title} url={articles[i].url} description={articles[i].description}/>
  //   );
  //   urls.push(<div class="horizontalgap"></div>);
    
    
  //   }
  //   return(
  //     <div>
  //       {urls}
  //     </div>
  //     );
  // }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="" className="App-logo" alt="logo" />
        </header>
        <p className="App-intro">
        </p>
        <Link to="/">Home</Link>

      </div>
    );
  }
}

export default View;
