import axios from "axios";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

//for custom 'duration' formats => moment.duration().format("hh:mm:ss");
momentDurationFormatSetup(moment);

const youtube = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
});

const getVideoDetails = async ({ id }) => {
  return youtube.get("videos", {
    params: {
      part: "contentDetails",
      id: id,
      key: "AIzaSyCf_JBCgYoPAl2TtTo-gLZ6dyzfhVJ0dno",
    },
  });
};

//credits to https://stackoverflow.com/questions/22148885/converting-youtube-data-api-v3-video-duration-format-to-seconds-in-javascript-no
const YTDurationToSeconds = (duration) => {
  var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  match = match.slice(1).map(function (x) {
    if (x != null) {
      return x.replace(/\D/, "");
    }
  });

  var hours = parseInt(match[0]) || 0;
  var minutes = parseInt(match[1]) || 0;
  var seconds = parseInt(match[2]) || 0;

  return hours * 3600 + minutes * 60 + seconds;
};

const augmentDataWithContentDetails = ({ items, details }) => {
  try {
    const fullItems = items.map((item) => {
      for (let index = 0; index < details.length; index++) {
        const el = details[index];
        if (item.id.videoId === el.id) {
          item.contentDetails = el.contentDetails;
          item.contentDetails.duration = moment
            .duration(YTDurationToSeconds(item.contentDetails.duration) * 1000)
            .format("hh:mm:ss");
        }
      }
      return item;
    });
  } catch (error) {
    console.log("Error while consolidating data", error);
  }
};

const search = async ({ searchTerm }) => {
  console.log(`real search for [${searchTerm}]`);
  try {
    const {
      data: { items },
    } = await youtube.get("search", {
      params: {
        q: searchTerm,
        part: "snippet",
        type: "video",
        maxResults: 5,
        key: "AIzaSyCf_JBCgYoPAl2TtTo-gLZ6dyzfhVJ0dno",
      },
    });

    const videoIds = items.map((video) => video.id.videoId);
    const videoDetails = await getVideoDetails({ id: videoIds.join() });
    const fullItems = augmentDataWithContentDetails({
      items,
      details: videoDetails.data.items,
    });

    return items;
  } catch (error) {
    console.log("Caught an error => ", error);
  }
};

const mockSearch = async ({ searchTerm }) => {
  console.log("mock search");
  try {
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
          description: `Description ${i} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates provident nemo ex blanditiis dolorum et quis, dignissimos aut tenetur eos. Quae possimus odit aut! Optio debitis perspiciatis accusantium ratione illum.`,
          thumbnails: { medium: { url: "https://via.placeholder.com/125" } },
        },
      };
      return template;
    };

    const items = mockStructure.data.items.map((item, i) => {
      item = { ...mockItemTemplate(i) };
      return item;
    });

    const videoIds = items.map((video) => video.id.videoId);
    const videoDetails = await getVideoDetails({ id: videoIds.join() });
    const fullItems = augmentDataWithContentDetails({
      items,
      details: videoDetails.data.items,
    });

    return items;
  } catch (error) {
    console.log("Caught an error => ", error);
  }
};

export default ({ isMock }) => (isMock ? mockSearch : search);
