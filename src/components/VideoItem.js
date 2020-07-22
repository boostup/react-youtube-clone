import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";

import "./VideoItem.css";

const VideoItem = ({ video, onVideoSelect }) => {
  const { snippet, contentDetails } = video;

  return (
    <Grid item xs={12}>
      <Paper className="VideoItem_row" onClick={() => onVideoSelect(video)}>
        <div className="VideoItem_thumbnail">
          <img alt="thumbnail" src={snippet.thumbnails.medium.url} />
          <span className="VideoItem_duration">{contentDetails.duration}</span>
        </div>

        <div className="VideoItem_details-panel">
          <Typography variant="subtitle1">{snippet.title}</Typography>
          <Typography variant="subtitle2">{snippet.description}</Typography>
        </div>
      </Paper>
    </Grid>
  );
};

export default VideoItem;
