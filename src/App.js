// @36:46 https://www.youtube.com/watch?v=VPVzx1ZOVuw

import React from "react";
import theme from "./mui-theme";
import { ThemeProvider } from "@material-ui/styles";
import { Grid, Paper } from "@material-ui/core";

import searchYT from "./api/youtube";
import { Header, VideoList, VideoDetail } from "./components";

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
    const search = searchYT({ isMock: true });
    const response = await search({ searchTerm });

    this.setState({
      videos: response,
      selectedVideo: response[0],
    });
  };

  render() {
    const { selectedVideo, videos } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper>
              <Header onSearchSubmit={this.handleSubmit} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper>
              <VideoDetail video={selectedVideo} />
              <br />
              [toolbar]
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper>
              <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
            </Paper>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
}

export default App;
