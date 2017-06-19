import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail'
const API_KEY = 'AIzaSyA3MBOE0Ev_XsAzg_IARByd25P6mcSFbMY';



class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      videos: [],
      slectedVideo: null };
      this.videoSearch('surfboards')
  }

  videoSearch(term){
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos,
        selectedVideo: videos[0],
      });
    });
  }
  render(){

    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

    return (
      <div>
        <SearchBar onSearchChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo}) } videos={this.state.videos} />

      </div>
    );
  }

}

//display component's generated html into the DOM
ReactDOM.render(<App/>, document.querySelector('.container'));
