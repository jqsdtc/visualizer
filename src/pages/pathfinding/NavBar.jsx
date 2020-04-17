import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //create the start button according to the algorithm that you choose
  centerButton() {
    if (this.props.algorithm.length === 0) {
      return (
        <Button
          id="center"
          variant="primary"
          onClick={() => this.props.onClick()}
        >
          {this.props.centerButtonContent}
        </Button>
      );
    } else {
      return (
        <Button
          id="center"
          variant="primary"
          onClick={() => this.props.visualizeAlgorithm()}
        >
          Visualize {this.props.algorithm}!
        </Button>
      );
    }
  }

  render() {
    const {
      buttonStatus,
      speed,
      setSpeed,
      setAlgorithm,
      cleanPath,
      cleanGrid
    } = this.props;
    return (
      <div id="navbarDiv">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/visualizer">Visualize Algorithm</Navbar.Brand>

          <Nav className="mr-auto">
            <NavDropdown
              title="Algorithms"
              id="nav-dropdown-primary"
              onSelect={eventKey => {
                setAlgorithm(eventKey);
              }}
            >
              <NavDropdown.Item
                eventKey="Dijkstra"
                disabled={buttonStatus === "off"}
              >
                Dijkstra
              </NavDropdown.Item>
              <NavDropdown.Item
                eventKey="AStar"
                disabled={buttonStatus === "off"}
              >
                AStar
              </NavDropdown.Item>
              <NavDropdown.Item
                eventKey="BFS"
                disabled={buttonStatus === "off"}
              >
                BFS
              </NavDropdown.Item>
              <NavDropdown.Item
                eventKey="DFS"
                disabled={buttonStatus === "off"}
              >
                DFS
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link
              id="cleanPath"
              href="#"
              disabled={buttonStatus === "off"}
              onClick={() => cleanPath()}
            >
              Clean Path
            </Nav.Link>

            <Nav.Link
              id="cleanWall"
              href="#"
              disabled={buttonStatus === "off"}
              onClick={() => cleanGrid()}
            >
              Clean Gird
            </Nav.Link>

            <NavDropdown
              title={` speed:${speed}`}
              id="nav-dropdown-primary"
              onSelect={eventKey => {
                setSpeed(eventKey);
              }}
            >
              <NavDropdown.Item
                eventKey="Fast"
                disabled={buttonStatus === "off"}
              >
                Fast
              </NavDropdown.Item>
              <NavDropdown.Item
                eventKey="Normal"
                disabled={buttonStatus === "off"}
              >
                Normal
              </NavDropdown.Item>
              <NavDropdown.Item
                eventKey="Slow"
                disabled={buttonStatus === "off"}
              >
                Slow
              </NavDropdown.Item>
            </NavDropdown>

            {this.centerButton()}
          </Nav>
        </Navbar>
      </div>
    );
  }
}
