import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "../css/home.css";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // redirect: ""
    };
  }

  render() {
    if (this.state.redirect === "pathfinding") {
      return <Redirect to="/pathfinding" />;
    } else if (this.state.redirect === "sorting") {
      return <Redirect to="/sorting" />;
    } else {
      return (
        <div id="home">
          <div className="visualizer_head">
            <p className="head">Select a visualizer...</p>
          </div>
          <div className="visualizer_container">
            <div
              className="visualizer_box"
              // onMouseDown={() =>
              //   this.setState({
              //     redirect: "pathfinding"
              //   })
              // }
            >
              <img src={require("../image/findpath.jpg")} alt="" />
              <div className="visualizer_name">
                <Link className="visualizer_name_link" to="/pathfinding">
                  PathFinding Visualizer
                </Link>
              </div>
            </div>
            <div
              className="visualizer_box"
              // onMouseDown={() =>
              //   this.setState({
              //     redirect: "sorting"
              //   })
              // }
            >
              <img src={require("../image/sort.jpg")} alt="" />
              <div className="visualizer_name">
                <Link className="visualizer_name_link" to="/sorting">
                  Sorting Visualizer
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Home;
