import React, { Component } from 'react';
import "./search.scss";
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      launches: [
      ],
      launchpads:[],
      yearsArr: [],
      keywords:"",
      launchpad: "",
      minYear:"",
      maxYear:"",
      filteredResult: "",
    };
    this.filterArray = this.filterArray.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getFilteredArray = this.getFilteredArray.bind(this);
    this.formatAMPM = this.formatAMPM.bind(this);
    this.format = this.format.bind(this);
    this.clickFooter = this.clickFooter.bind(this);
    this.loadAllObjectsInfo = this.loadAllObjectsInfo.bind(this);
  }

  async loadAllObjectsInfo(endpoint) {
		// headers set to be Content-Type because of type CORS which makes some headers restricted
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    let response = await fetch(`http://localhost:8001/${endpoint}`, requestOptions);
    let data = await response.json();
    this.setState({ [endpoint]: data.body });
  }

  componentDidMount (){
		//Api calls
    this.loadAllObjectsInfo('launches')
    this.loadAllObjectsInfo('launchpads')
  }


  /**
   * Filters an array of objects by custom predicates.
   *
   * @param  {Array}  array: the array to filter
   * @param  {Object} filters: an object with the filter criteria
   * @return {Array}
   */
  filterArray(array, filters) {
    const filterKeys = Object.keys(filters);
    return array.filter(item => {
      // validates all filter criteria
      return filterKeys.every(key => {
        // ignores non-function predicates
        if (typeof filters[key] !== 'function') return true;
        return filters[key](item[key]);
      });
    });
  }

  getFilteredArray() {
		// Don't mutate the state directly
    const newLaunches = this.state.launches
    console.log('[Debug][Filter] showing all states: ', this.state)
    var keywordsFilter = {};
		// Conditional on which fields will the keywords match, will match keywords to flight_number, rocket_name and payloads in different cases.
    if(typeof(this.state.keywords)==='number'){
      keywordsFilter = {
        flight_number: flight_number => flight_number === parseInt(this.state.keywords, 10)
      }
    } else if (['falcon', 'falcon 1', 'falcon 9'].includes(this.state.keywords.toLowerCase())) {
      keywordsFilter = {
        rocket: rocket => rocket.rocket_name.toLowerCase().includes(this.state.keywords.toLowerCase()),
      }
    } else {
      keywordsFilter = {
        payloads: payloads => payloads.find(x => x.payload_id.toLowerCase().includes(this.state.keywords.toLowerCase())),
      }
    }
    const filters = {
      launch_site:  launch_site => (this.state.launchpad === "" ? true : launch_site.site_id.includes(this.state.launchpad)),
      year: year => (this.state.minYear === "" ? (year > 0) : (year >= this.state.minYear)) && (this.state.maxYear ==="" ? year < 9999999999 : year <= this.state.maxYear)
    };
    var allFilters = Object.assign(keywordsFilter, filters);
    // console.log(this.filterArray(newLaunches, allFilters))
    this.setState({
      filteredResult: this.filterArray(newLaunches, allFilters)
    });
  }

  handleChange (evt) {
      const name = evt.target.name;
      const value = evt.target.value;
      this.setState({ [name]: value });
  }

  clickFooter(){
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

//Date helpers
  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ampm;
    return strTime;
  }

  format(date, tmp){
    return [
      (tmp = date.getDate()) +
        ([, 'st', 'nd', 'rd'][/1?.$/.exec(tmp)] || 'th'),
      [ 'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
      ][date.getMonth()],
      date.getFullYear()
    ].join(' ')
  }



  render() {
    console.log('[Debug][Render] showing all states:', this.state);
    // populate years field and years Array
    var yearsArr = [];
    this.state.launches.map((launch, i) => {
     const launchYear = new Date(launch.launch_date_local).getFullYear();
     launch.year = launchYear
     if (yearsArr.includes(launchYear)){
       return ""
     } else {
       yearsArr.push(launchYear)
     }
    })

    return (
      <Grid container className="container">
        <Grid item xs={12} className="content">
          <Grid container className="search">
            <Grid item xs={2}>
              <FormControl className="form-control">
              <span className='input-label'>Keywords</span>
              <div><input className='input-form' placeholder="e.g. Falcon" name="keywords" value={this.state.keywords} onChange={(evt)=> this.handleChange(evt)}/></div>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl className="form-control">
                <span className='input-label'>Launch Pad</span>
                <select className='dropdown-form' name="launchpad" onChange={(evt)=> this.handleChange(evt)}>
                   <option value={''}>Any</option>
                 {this.state.launchpads.map((launchpad,i)=> {
                     return (<option key={i} value={launchpad.id}>{launchpad.full_name}</option>);
                 })}
               </select>
             </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl className="form-control">
               <span className='input-label'>Min Year</span>
               <select className='dropdown-form' name="minYear" onChange={(evt)=> this.handleChange(evt)}>
                   <option value={''}>Any</option>
                {yearsArr.map((year,i)=> {
                    return (<option key={i} value={year}>{year}</option>);
                })}
              </select>
             </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl className="form-control">
                <span className='input-label'>Max Year</span>
                <select className='dropdown-form' name="maxYear" onChange={(evt)=> this.handleChange(evt)}>
                   <option value={''}>Any</option>
                 {yearsArr.map((year,i)=> {
                     return (<option key={i} value={year}>{year}</option>);
                 })}
               </select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <div className='search-button-box'>
               <button className='search-button' onClick={this.getFilteredArray} variant="contained">Apply</button>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} className="search-result">
            <Grid item xs={12} className='search-result-header'>{'Showing ' + (this.state.filteredResult !== "" ? this.state.filteredResult.length: this.state.launches.length) + ' Missions'}</Grid>
          {(this.state.filteredResult !== "" ? this.state.filteredResult: this.state.launches).map((launch, i) => {
              return (
                <Grid key={i} container>
                  <Grid item xs={2}>
                    <div><img src={launch.links.mission_patch} className="mission-patch-image" alt="mission_patch" /></div>
                  </Grid>
                  <Grid item xs={9}>
                    <Grid item xs={12} className='search-result-info'>
                      <div>
                      {launch.rocket.rocket_name + ' - ' +
                        launch.payloads.map((payload)=> { return payload.payload_id })
                      }
                      <span className='alert-text'>{(launch.launch_success && launch.land_success ? '' : (' - Failed Mission'))}</span>
                      </div>
                      <div>{'Launched on ' + this.format(new Date(launch.launch_date_local))+' at ' + this.formatAMPM(new Date(launch.launch_date_local)) +' from '+ launch.launch_site.site_name}{}</div>
                    </Grid>
                    <Grid item xs={12} className="link-section">
                      {launch.links.reddit_campaign ? <span className='link-box'><a className='link' href={`${launch.links.reddit_campaign}`} target="_blank">Reddit Campaign</a></span>: ""}
                      {launch.links.reddit_launch ? <span className='link-box'><a className='link' href={`${launch.links.reddit_launch}`} target="_blank">Reddit Launch</a></span>: ""}
                      {launch.links.reddit_media ? <span className='link-box'><a className='link' href={`${launch.links.reddit_media}`} target="_blank">Reddit Media</a></span>: ""}
                      {launch.links.presskit ? <span className='link-box'><a className='link' href={`${launch.links.presskit}`} target="_blank">Press Kit</a></span>: ""}
                      {launch.links.article_link ? <span className='link-box'><a className='link' href={`${launch.links.article_link}`} target="_blank">Article</a></span>: ""}
                      {launch.links.video_link ? <span className='link-box'><a className='link' href={`${launch.links.video_link}`} target="_blank">Watch Video</a></span>: ""}
                    </Grid>
                  </Grid>
                  <Grid item xs={1}>
                  <div className='search-flight-number'>{"#"+launch.flight_number}</div>
                  <div className='search-flight-text'>Flight Number</div>
                  </Grid>
                </Grid>
              )
            })
          }
          </Grid>
        </Grid>
        <Grid container className='footer' justify='flex-end'><span onClick={()=>this.clickFooter()}>Back to top</span></Grid>
      </Grid>
    );
  }
}

export default Search;
