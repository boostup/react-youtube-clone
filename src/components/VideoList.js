import React from "react";
import { Grid } from "@material-ui/core";

import VideoItem from "./VideoItem";

const VideoList = ({ videos, onVideoSelect }) => {
  const listOfVideos = videos
    .slice(1) //remove first video since it is already being displayed by the VideoDetail component
    .map((video, i) => (
      <VideoItem key={i} video={video} onVideoSelect={onVideoSelect} />
    ));

  return (
    <Grid container spacing={1}>
      {listOfVideos}
    </Grid>
  );
};

export default VideoList;
