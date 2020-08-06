import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import SearchForm from "./Components/SearchForm";
import GifList from "./Components/GifList";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      gifs: [],
      loading: true,
    };
  }

  // componentDidMount() {
  //   fetch("http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       this.setState({
  //         gifs: data.data,
  //       });
  //     })
  //     .catch((err) => console.log(`Error fetching and parsing data ${err}`));
  // }

  componentDidMount() {
    axios
      .get(
        "http://api.giphy.com/v1/gifs/trending?api_key=KUwX6R7eAyTpfG2p1S9eyDuPSVFDmKG9"
      )
      .then((response) => {
        this.setState({
          gifs: response.data.data,
          loading: false,
        });
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  }

  performSearch = (query) => {
    axios
      .get(
        `http://api.giphy.com/v1/gifs/search?q=${query}&limit=24&api_key=KUwX6R7eAyTpfG2p1S9eyDuPSVFDmKG9`
      )
      .then((response) => {
        this.setState({
          gifs: response.data.data,
        });
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  };

  render() {
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">Gif-Lib</h1>
            <SearchForm onSearch={this.performSearch} />
          </div>
        </div>
        <div className="main-content">
          {this.state.loading ? (
            <p>Loading...</p>
          ) : (
            <GifList data={this.state.gifs} />
          )}
        </div>
      </div>
    );
  }
}
