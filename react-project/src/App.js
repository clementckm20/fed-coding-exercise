import React, { Component } from 'react';
import './App.scss';
import Search from "./Search";
import Grid from '@material-ui/core/Grid';

class App extends Component {
  constructor() {
    super();
    this.clickArrow = this.clickArrow.bind(this);
    };

  clickArrow (){
    window.scrollTo({
      top: window.screen.height,
      behavior: 'smooth'
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-background">
          <header className="App-header">
              <span className="App-title">SPACE SAVVY</span>
              <Grid container className="App-intro-box">
                <Grid container justify='center'><span className="App-intro">Discover Space Missions</span></Grid>
                <Grid container justify='center'><div onClick={()=> this.clickArrow()} className="header-arrow"><i className="arrow down"></i></div></Grid>
              </Grid>
          </header>
          <Search />
        </div>
      </div>
    );
  }
}

export default App;
