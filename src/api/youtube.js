import axios from "axios";

// const API_KEY = "AIzaSyAmEMpDCOpZF-OgiZnK0tyGSkhW7twCDiE";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  // params: {
  //   part: "snippet",
  //   maxResults: 5,
  //   key: API_KEY,
  // },
});
