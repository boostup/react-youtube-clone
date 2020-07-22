import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";

import theme from "./mui-theme";
import Header from "./components/Header";
import Home from "./components/Home";
import Playlists from "./components/Playlists";
import VideoSearchResults from "./components/VideoSearchResults";

class App extends React.Component {
  state = {
    searchTerm: "",
  };

  componentDidMount() {}

  handleSubmit = async (searchTerm) => {
    this.setState({ searchTerm });
    this.props.history.push("/video-search-results");
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Header onSearchSubmit={this.handleSubmit} />
        <Switch>
          <Route
            exact
            from="/"
            render={(routeProps) => <Home {...routeProps} />}
          />
          <Route
            exact
            path="/video-search-results"
            render={(routeProps) => (
              <VideoSearchResults {...routeProps} {...this.state} />
            )}
          />
          <Route
            exact
            path="/playlists"
            render={(routeProps) => <Playlists {...routeProps} />}
          />
        </Switch>
      </ThemeProvider>
    );
  }
}

export default withRouter(App);
