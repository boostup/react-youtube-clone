// @36:46 https://www.youtube.com/watch?v=VPVzx1ZOVuw

import React from "react";
import { Grid } from "@material-ui/core";

import youtube from "./api/youtube";
import { SearchBar, VideoList, VideoDetail } from "./components";

class App extends React.Component {
  state = {
    videos: [],
    selectedVideo: null,
  };

  componentDidMount() {
    this.handleSubmit("auto therapeute");
  }

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };

  handleSubmit = async (searchTerm) => {
    try {
      const response = await youtube.get("search", {
        params: {
          q: searchTerm,
          part: "snippet",
          maxResults: 5,
          key: "AIzaSyAmEMpDCOpZF-OgiZnK0tyGSkhW7twCDiE",
        },
      });

      this.setState({
        videos: response.data.items,
        selectedVideo: response.data.items[0],
      });
    } catch (error) {
      console.log("Caught an error => ", error);
    }
  };

  render() {
    const { selectedVideo, videos } = this.state;

    return (
      <Grid justify={"center"} container spacing={10}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <SearchBar onFormSubmit={this.handleSubmit} />
            </Grid>
            <Grid item xs={8}>
              <VideoDetail video={selectedVideo} />
            </Grid>
            <Grid item xs={4}>
              <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default App;
