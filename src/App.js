// @36:46 https://www.youtube.com/watch?v=VPVzx1ZOVuw

import React from "react";
import theme from "./mui-theme";
import { ThemeProvider } from "@material-ui/styles";
import { Grid, Paper } from "@material-ui/core";

import youtube from "./api/youtube";
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
    try {
      // const response = await youtube.get("search", {
      //   params: {
      //     q: searchTerm,
      //     part: "snippet",
      //     maxResults: 5,
      //     key: "AIzaSyDy_uRGdJXeRDGmyRMijmaiE9uAFywpo_0",
      //   },
      // });

      const mockStructure = {
        data: {
          items: [{}, {}, {}, {}, {}],
        },
      };

      const mockItemTemplate = (i) => {
        const vidIds = [
          "XkvrHQNmigs",
          "WV6u_6ZNWkQ",
          "9207OppzJU0",
          "HjToX1WWE3w",
          "68O6eOGAGqA",
        ];
        const template = {
          id: { videoId: vidIds[i] },
          snippet: {
            title: `title ${i}`,
            channelTitle: `channel Title ${i}`,
            description: `description ${i} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates provident nemo ex blanditiis dolorum et quis, dignissimos aut tenetur eos. Quae possimus odit aut! Optio debitis perspiciatis accusantium ratione illum.`,
            thumbnails: { medium: { url: "https://via.placeholder.com/150" } },
          },
        };
        return template;
      };

      const mockResponse = mockStructure.data.items.map((item, i) => {
        item = { ...mockItemTemplate(i) };
        return item;
      });

      this.setState({
        videos: mockResponse, //response.data.items,
        selectedVideo: mockResponse[0], //response.data.items[0],
      });
    } catch (error) {
      console.log("Caught an error => ", error);
    }
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
