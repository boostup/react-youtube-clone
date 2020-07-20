import React, { Component } from "react";

import { Paper, TextField } from "@material-ui/core";

class SearchBar extends Component {
  state = {
    searchTerm: "",
  };

  handleChange = (e) => this.setState({ searchTerm: e.target.value });

  onKeyPress = (e) => {
    if (e.key === "Enter") {
      const { searchTerm } = this.state;
      const { onFormSubmit } = this.props;
      onFormSubmit(searchTerm);
    }
  };

  render() {
    return (
      <Paper elevation={6} style={{ padding: "25px" }}>
        <TextField
          fullWidth
          label="Search..."
          onChange={this.handleChange}
          onKeyPress={this.onKeyPress}
        />
      </Paper>
    );
  }
}

export default SearchBar;
