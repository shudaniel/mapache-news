import React, { Component } from 'react';
import Article from './Article'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Grid from 'material-ui/Grid';


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
	 
  	const styles = {
  	  root: {
  		display: 'flex',
  		flexWrap: 'wrap',
  		justifyContent: 'space-around',
  	  },
  	  gridList: {
  		display: 'flex',
  		flexWrap: 'nowrap',
  		overflowX: 'auto',
  	  },
  	  titleStyle: {
  		color: 'rgb(0, 188, 212)',
  	  },
  	};
  	
  	
  	var html =  <h3>No Articles</h3>


  	
  	if(this.state.timelines["articles"] != null){
      var articles = Object.values(this.state.timelines["articles"]);

  		html = 
      <MuiThemeProvider>
  		  <Grid container className={"articles"} justify="left" spacing={40} style={styles['gridList']}>
  				{articles.map((article) => (
  					<Grid key={article.title} item>
  						<Article timeline_id={this.props.timeline_id} article_id={article.id} title={article.name} url={article.link} image={article.imageUrl} description={article.description}/>
  					</Grid>
  				))}
  			</Grid>
  		</MuiThemeProvider>
  	 }
  	
  	  
  	return (
      <div style={styles['root']}>
  			{html}
  		</div>
    );
	  
  }


  render() {

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
