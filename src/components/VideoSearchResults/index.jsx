// @36:46 https://www.youtube.com/watch?v=VPVzx1ZOVuw
import React from "react";
import { withRouter } from "react-router-dom";
import { Grid, Paper } from "@material-ui/core";

import VideoList from "../VideoList";
import VideoDetails from "../VideoDetails";
import searchYT from "../../api/youtube";

class VideoSearchResults extends React.Component {
  state = {
    loading: true,
    videos: [],
    selectedVideo: null,
  };

  componentDidMount() {
    this.fetchData(this.props.searchTerm);
  }

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };

  fetchData = async (searchTerm) => {
    const search = searchYT({ isMock: true });
    const response = await search({ searchTerm });

    this.setState({
      loading: false,
      videos: response,
      selectedVideo: response[0],
    });
  };

  render() {
    const { loading, selectedVideo, videos } = this.state;

    if (loading) return <h1>Loading...</h1>;

    return (
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <VideoDetails video={selectedVideo} />
          <br />
          [toolbar]
        </Grid>
        <Grid item xs={12} md={4}>
          <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(VideoSearchResults);
