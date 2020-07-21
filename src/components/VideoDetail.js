import React from "react";
import { Paper, Typography } from "@material-ui/core";
import "./responsive-iframe.css";

const VideoDetail = ({ video }) => {
  if (!video) return <div>Loading...</div>;

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

  return (
    <div>
      <div className="video-player-wrapper">
        <div className="video-player">
          <iframe
            frameBorder="0"
            height="100%"
            width="100%"
            title="Video Player"
            src={videoSrc}
          />
        </div>
      </div>

      <Paper elevation={6} style={{ padding: "15px" }}>
        <Typography variant="h4">{video.snippet.title}</Typography>
        <Typography variant="subtitle1">
          {video.snippet.channelTitle}
        </Typography>
        <Typography variant="subtitle2">{video.snippet.description}</Typography>
      </Paper>
    </div>
  );
};

export default VideoDetail;
