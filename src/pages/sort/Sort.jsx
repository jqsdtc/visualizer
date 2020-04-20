import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Button, Form } from "react-bootstrap";
import "../../css/Sort.css";
import { mergeSort } from "../../algorithms/mergeSort";
import { selectionSort } from "../../algorithms/selectionSort";
import { quickSort } from "../../algorithms/quickSort";
import { sortAnimation } from "../../animations/sortAnimation";

const BAR_COLOR_ONE = "turquoise";

export default class Path extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      numberOfBar: 50,
      centerButtonContent: "Vitualize!",
      algorithm: "",
      buttonStatus: "on",
      timesOfHeight: 1,
      speed: 50,
      shown: false
    };
  }

  componentDidMount() {
    this.setArray();
  }

  setArray() {
    const { numberOfBar, shown } = this.state;
    if (shown) {
      const bars = document.getElementsByClassName("bar-in");
      for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = BAR_COLOR_ONE;
      }
    }
    const array = [];
    for (let i = 0; i < numberOfBar; i++) {
      const num = Math.floor(Math.random() * (100 - 0) + 0);
      array.push(num);
    }
    const temp = (window.innerHeight / 100) * 0.9;
    this.setState({
      array: array,
      timesOfHeight: temp,
      shown: false
    });
  }

  onClick() {
    this.setState({
      centerButtonContent: "Pick an algorithm!"
    });
  }

  //check if the animation if finished and update the button status
  timeout() {
    setTimeout(() => {
      if (document.getElementById("center").disabled) {
        this.timeout();
      } else {
        this.setState({
          buttonStatus: "on",
          shown: true
        });
      }
    }, 100);
  }

  virtualize() {
    if (this.state.shown) {
      this.setArray();
    }
    const { algorithm, array, timesOfHeight, speed } = this.state;
    this.setState({
      buttonStatus: "off"
    });

    var animation;
    document.getElementById("center").disabled = true;
    if (algorithm === "Merge") {
      animation = mergeSort(array);
    } else if (algorithm === "Selection") {
      animation = selectionSort(array);
    } else {
      animation = quickSort(array);
    }

    sortAnimation(animation, speed, timesOfHeight, algorithm);

    this.timeout();
  }

  centerButton() {
    if (this.state.algorithm.length === 0) {
      return (
        <Button id="center" variant="primary" onClick={() => this.onClick()}>
          {this.state.centerButtonContent}
        </Button>
      );
    } else {
      return (
        <Button id="center" variant="primary" onClick={() => this.virtualize()}>
          Visualize {this.state.algorithm}!
        </Button>
      );
    }
  }

  navbar() {
    return (
      <div id="navbarDiv">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/visualizer">Visualize Algorithm</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Nav className="mr-auto">
            <Nav.Link
              href="#"
              disabled={this.state.buttonStatus === "off"}
              onClick={() => this.setArray()}
            >
              Reset Array
            </Nav.Link>

            <Nav.Link
              href="#"
              disabled={this.state.buttonStatus === "off"}
              onClick={() =>
                this.setState({
                  algorithm: "Quick"
                })
              }
            >
              Quick Sort
            </Nav.Link>

            <Nav.Link
              href="#"
              disabled={this.state.buttonStatus === "off"}
              onClick={() =>
                this.setState({
                  algorithm: "Selection"
                })
              }
            >
              Selection Sort
            </Nav.Link>

            <Nav.Link
              href="#"
              disabled={this.state.buttonStatus === "off"}
              onClick={() =>
                this.setState({
                  algorithm: "Merge"
                })
              }
            >
              Merge Sort
            </Nav.Link>
          </Nav>

          <Form>
            <Form.Group id="speed" controlId="formBasicRangeCustom">
              <Form.Label style={{ color: "grey" }}>Speed</Form.Label>
              <Form.Control
                type="range"
                custom
                min="10"
                max="100"
                value={this.state.speed}
                disabled={this.state.buttonStatus === "off"}
                onChange={event => {
                  this.setState({
                    speed: event.target.value
                  });
                }}
              />
            </Form.Group>
          </Form>
          <Form>
            <Form.Group id="array_size" controlId="formBasicRangeCustom">
              <Form.Label style={{ color: "grey" }}>Array Size</Form.Label>
              <Form.Control
                type="range"
                custom
                min="10"
                max="150"
                value={this.state.numberOfBar}
                disabled={this.state.buttonStatus === "off"}
                onChange={event => {
                  this.setState(
                    {
                      numberOfBar: event.target.value
                    },
                    () => {
                      this.setArray();
                    }
                  );
                }}
              />
            </Form.Group>
          </Form>

          {this.centerButton()}
        </Navbar>
      </div>
    );
  }

  render() {
    const { array, timesOfHeight } = this.state;
    return (
      <>
        {this.navbar()}
        <div className="array_container">
          {array.map((num, idx) => (
            <div className="bar" key={idx}>
              <div
                id={`bar-${idx}`}
                className="bar-in"
                style={{
                  backgroundColor: BAR_COLOR_ONE,
                  height: `${num * timesOfHeight}px`
                }}
              />
            </div>
          ))}
        </div>
      </>
    );
  }
}
