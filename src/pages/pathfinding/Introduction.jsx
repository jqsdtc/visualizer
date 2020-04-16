import React, { Component } from "react";
import "../../css/introduction.css";
import { Button } from "react-bootstrap";
import background from "../../image/background.png";

export class Introduction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
  }

  addPage = () => {
    var { page } = this.state;
    if (page !== 8) {
      page++;
      this.setState({
        page: page
      });
    } else {
      this.closeIntro();
    }
  };

  closeIntro = () => {
    document.getElementById("intro").style.display = "none";
    this.props.start();
  };

  minusPage = () => {
    var { page } = this.state;
    if (page !== 1) {
      page--;
    }
    this.setState({
      page: page
    });
  };

  render() {
    const { page } = this.state;
    return (
      <div id="intro" style={{ backgroundImage: `url(${background})` }}>
        {pageContent(page)}
        <div id="page_counter">{page}/8</div>
        <div id="skip_button">
          <Button
            variant="outline-dark"
            style={{ width: "100px" }}
            onClick={() => this.closeIntro()}
          >
            Skip
          </Button>
        </div>
        <div id="page_button">
          <Button
            variant="outline-dark"
            style={{ width: "100px", marginRight: "20px" }}
            onClick={() => this.minusPage()}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline-dark"
            style={{ width: "100px" }}
            onClick={() => this.addPage()}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }
}

function pageContent(page) {
  if (page === 1) {
    return (
      <>
        <h1>Welcome to Pathfinding Visualizer!</h1>
        <h5>
          This short introduction will walk you through all of the features of
          this application.
        </h5>
        <p>
          You can also press the "Skip" button below to skip the introduction.
        </p>
        <img
          src={require("../../image/route.png")}
          style={{ width: "30%" }}
          alt=""
        />
      </>
    );
  } else if (page === 2) {
    return (
      <>
        <h1>What is this visualizer doing?</h1>
        <h5>
          The main point is to find the shortest path between start node and end
          node.
        </h5>
        <p>
          All of the algorithms are adapted for a 2D grid, where the distance
          between two connected nodes is 1.
        </p>
        <img
          src={require("../../image/path.png")}
          style={{ width: "50%" }}
          alt=""
        />
      </>
    );
  } else if (page === 3) {
    return (
      <>
        <h1>Choose an algorithm</h1>
        <h5>Choose an algorithm from the "Algorithms" drop-down menu.</h5>
        <p>
          Dijkstra and A* are weighted algorithms which means weight nodes are
          taken into account and algorithns guarantee the shortest path.
        </p>
        <img
          src={require("../../image/algorithm.png")}
          style={{ width: "35%" }}
          alt=""
        />
      </>
    );
  } else if (page === 4) {
    return (
      <>
        <h1>Adding walls</h1>
        <h5>
          Click on the grid to add a wall.Click on the grid and drag the mouse
          to add lots of walls
        </h5>
        <p>
          Walls are impenetrable, meaning that a path cannot cross through them.
          If the start node is crossed by some walls, end node can not be
          reached.
        </p>
        <img
          src={require("../../image/createWall.gif")}
          style={{ width: "50%" }}
          alt=""
        />
      </>
    );
  } else if (page === 5) {
    return (
      <>
        <h1>Adding weights</h1>
        <h5>Click on the grid while pressing W to add a weight.</h5>
        <p>
          Weight nodes are not impassable. They are more "costly" to move
          through. In this application, you can choose a value of weight from
          select component.
        </p>
        <img
          src={require("../../image/addWeight.gif")}
          style={{ width: "35%" }}
          alt=""
        />
      </>
    );
  } else if (page === 6) {
    return (
      <>
        <h1>Dragging nodes</h1>
        <h5>
          Click and drag the start or target node to change their position.
        </h5>
        <p>
          You can drag start or end node even after an algorithm has finished
          running. This will allow you to instantly see different paths.
        </p>
        <img
          src={require("../../image/instant.gif")}
          style={{ width: "50%" }}
          alt=""
        />
      </>
    );
  } else if (page === 7) {
    return (
      <>
        <h1>Other features</h1>
        <h5>
          Use the navbar buttons to visualize algorithms and to do other stuff.
        </h5>
        <p>
          You can clear the current path, clear grid and weights and adjust the
          visualization speed, all from the navbar.
        </p>
        <img
          src={require("../../image/features.png")}
          style={{ width: "50%" }}
          alt=""
        />
      </>
    );
  } else if (page === 8) {
    return (
      <>
        <h1>Enjoy!</h1>
        <h5>I hope you have fun with this visualization tool.</h5>
        <p>
          If you want to go back home page to try Sorting Visualizer, click on
          "Visualize Algorithm" in the top left corner of your screen.
        </p>
      </>
    );
  }
}
