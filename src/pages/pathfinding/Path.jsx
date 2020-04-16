import React, { Component } from "react";
import "../../css/Path.css";
import "../../css/bootstrap.min.css";
import Node from "./Node";
import { findPath, getShortestPath } from "../../algorithms/pathFinding";
import { instantAnimate } from "../../animations/instantAnimation";
import { animate } from "../../animations/animation";
import { Description } from "./Description";
import { ModalWeight } from "./Modal_Weight";
import { NavBar } from "./NavBar";
import { Introduction } from "./Introduction";

var START_NODE_ROW, START_NODE_COL, END_NODE_ROW, END_NODE_COL;
var flag = false;

export default class Path extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseState: false,
      startNode: null,
      endNode: null,
      buttonStatus: "off",
      pressedNodeStatus: null,
      speed: "Fast",
      algorithm: "",
      centerButtonContent: "Visualize!",
      pathShow: false,
      keyValue: false,
      modalShow: [false, 0, 0]
    };

    this.resetGrid = this.resetGrid.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  //reset the grid when the window size changed
  resetGrid = () => {
    this.cleanGrid();
    const grid = initializeGrid();
    grid[START_NODE_ROW][START_NODE_COL].type = "start";
    grid[END_NODE_ROW][END_NODE_COL].type = "end";
    this.setState({
      grid: grid,
      startNode: grid[START_NODE_ROW][START_NODE_COL],
      endNode: grid[END_NODE_ROW][END_NODE_COL]
    });
  };

  componentDidMount() {
    const grid = initializeGrid();
    this.setState({
      grid: grid,
      startNode: grid[START_NODE_ROW][START_NODE_COL],
      endNode: grid[END_NODE_ROW][END_NODE_COL]
    });
    grid[START_NODE_ROW][START_NODE_COL].type = "start";
    grid[END_NODE_ROW][END_NODE_COL].type = "end";

    window.addEventListener("resize", this.resetGrid);
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resetGrid);
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
  }

  handleKeyDown = event => {
    if (flag) {
      event.preventDefault();
    } else {
      this.setState({
        keyValue: event.key
      });
      flag = true;
    }
  };

  handleKeyUp = () => {
    this.setState({
      keyValue: false
    });
    flag = false;
  };

  //handle mousedown events
  handleMouseDown = (row, col, event) => {
    if (this.state.buttonStatus === "on") {
      event.preventDefault();
      // event.stopPropagation();
      const { grid, startNode, endNode, keyValue } = this.state;
      const node = grid[row][col];
      let nodeStatus;
      if (node.type === "path") {
        node.isPath = false;
        node.direction = null;
      } else if (node === startNode) {
        nodeStatus = "start";
      } else if (node === endNode) {
        nodeStatus = "end";
      } else if (keyValue === "w") {
        nodeStatus = "key";
      } else {
        // node.isWall = !node.isWall;
        node.type = node.type === "wall" ? "" : "wall";
        nodeStatus = "wall";
        node.weight = 0;
      }
      this.setState({
        // grid: grid,
        pressedNodeStatus: nodeStatus
      });
    }
  };

  //handle mouseup events
  handleMouseUp = (row, col) => {
    if (this.state.buttonStatus === "on") {
      if (this.state.pressedNodeStatus === "key") {
        this.handleShow(row, col);
      }
      this.setState({
        pressedNodeStatus: null
      });
    }
  };

  //handle mouse enter events
  handleMouseEnter = (row, col) => {
    if (this.state.buttonStatus === "on") {
      if (!this.state.pressedNodeStatus) {
        return;
      }
      const {
        grid,
        startNode,
        endNode,
        pressedNodeStatus,
        pathShow
      } = this.state;
      const node = grid[row][col];
      if (node.type === "path") {
        node.type = "";
        node.direction = null;
      }
      if (pressedNodeStatus === "start") {
        //change the start node
        startNode.type = "";
        node.type = "start";
        node.weight = 0;
        this.setState(
          {
            startNode: node
          },
          function() {
            if (pathShow) {
              this.instantAlgorithm();
            }
          }
        );
      } else if (pressedNodeStatus === "end") {
        //change the end node
        endNode.type = "";
        node.type = "end";
        node.weight = 0;
        this.setState(
          {
            endNode: node
          },
          function() {
            if (pathShow) {
              this.instantAlgorithm();
            }
          }
        );
      } else if (pressedNodeStatus === "wall") {
        //draw the walls
        if (node.type !== "start" && node.type !== "end") {
          node.type = node.type === "wall" ? "" : "wall";
          node.weight = 0;
        }
      }
      this.setState({
        grid: grid
      });
    }
  };

  instantAlgorithm = () => {
    this.cleanPath();
    const { grid, startNode, endNode, algorithm } = this.state;
    const visitedNodes = findPath(grid, startNode, endNode, algorithm);
    const nodesInShortestPath = getShortestPath(endNode, startNode);
    instantAnimate(visitedNodes, nodesInShortestPath, this.setPath);
    this.setState({
      pathShow: true
    });
  };

  //clean the Grid
  cleanGrid = () => {
    if (this.state.pathShow) {
      this.cleanPath();
    }
    const { grid, startNode, endNode } = this.state;
    for (const row of grid) {
      for (const node of row) {
        // node.isWall = false;
        node.type = "";
        node.weight = 0;
      }
    }

    startNode.type = "start";
    endNode.type = "end";

    this.setState({
      grid: grid
    });
  };

  //clean the path and the node which is visited
  cleanPath = () => {
    const { grid, startNode, endNode } = this.state;
    for (const row of grid) {
      for (const node of row) {
        if (node.type !== "wall") {
          const cur = document.getElementById(`node-${node.row}-${node.col}`);
          if (
            cur.className !== "node node-start" &&
            cur.className !== "node node-end"
          ) {
            cur.className = "node";
          }
          node.isVisited = false;
          node.distance = Infinity;
          node.previousNode = null;
          node.direction = null;
          node.type = "";
        }
      }
      startNode.type = "start";
      endNode.type = "end";
    }
    this.setState({
      grid: grid,
      pathShow: false
    });
  };

  setPath = (row, col) => {
    const { grid } = this.state;
    // grid[row][col].isPath = true;
    grid[row][col].type = "path";
    this.setState({
      grid: grid
    });
  };

  //call algorithm to calculate the shortest path
  visualizeAlgorithm = () => {
    if (this.state.pathShow) {
      this.cleanPath();
    }
    this.setState({
      buttonStatus: "off"
    });

    document.getElementById("center").disabled = true;
    const { grid, startNode, endNode, speed, algorithm } = this.state;
    const visitedNodes = findPath(grid, startNode, endNode, algorithm);
    const nodesInShortestPath = getShortestPath(endNode, startNode);
    animate(visitedNodes, nodesInShortestPath, speed, this.setPath);
    this.timeout();
    this.setState({
      pathShow: true
    });
  };

  onClick = () => {
    this.setState({
      centerButtonContent: "Pick an algorithm!"
    });
  };

  //check if the animation if finished and update the button status
  timeout = () => {
    setTimeout(() => {
      if (document.getElementById("center").disabled) {
        this.timeout();
      } else {
        this.setState({
          buttonStatus: "on"
        });
      }
    }, 100);
  };

  setAlgorithm = al => {
    this.setState({
      algorithm: al
    });
  };

  setSpeed = speed => {
    this.setState({
      speed: speed
    });
  };

  handleClose = () => {
    this.setState({
      modalShow: [false, 0, 0]
    });
  };

  handleShow = (row, col) => {
    this.setState({
      modalShow: [true, row, col]
    });
  };

  render() {
    const {
      grid,
      modalShow,
      speed,
      buttonStatus,
      algorithm,
      centerButtonContent
    } = this.state;
    return (
      <>
        <NavBar
          buttonStatus={buttonStatus}
          speed={speed}
          algorithm={algorithm}
          centerButtonContent={centerButtonContent}
          onClick={this.onClick}
          visualizeAlgorithm={this.visualizeAlgorithm}
          setSpeed={this.setSpeed}
          setAlgorithm={this.setAlgorithm}
          cleanPath={this.cleanPath}
          cleanGrid={this.cleanGrid}
        />

        <Description />
        <ModalWeight
          modalShow={modalShow}
          grid={grid}
          handleClose={this.handleClose}
        />

        <Introduction
          start={() => {
            this.setState({
              buttonStatus: "on"
            });
          }}
        />

        <div className="grid">
          {grid.map(Row => {
            return (
              <div key={Row[0].row} className="grid_row">
                {Row.map(node => {
                  const {
                    row,
                    col,
                    isStart,
                    isEnd,
                    isWall,
                    isPath,
                    weight,
                    direction,
                    type
                  } = node;
                  return (
                    <Node
                      key={node.col}
                      row={row}
                      col={col}
                      isStart={isStart}
                      isEnd={isEnd}
                      isWall={isWall}
                      isPath={isPath}
                      weight={weight}
                      direction={direction}
                      type={type}
                      handleMouseDown={this.handleMouseDown}
                      handleMouseEnter={this.handleMouseEnter}
                      handleMouseUp={this.handleMouseUp}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

//initialized the grid according to the windown size
const initializeGrid = () => {
  const grid = [];
  const heightF = Math.floor((window.innerHeight * 0.81) / 35);
  const widthF = Math.floor((window.innerWidth) / 35);

  START_NODE_ROW = Math.floor(heightF / 2);
  END_NODE_ROW = START_NODE_ROW;
  START_NODE_COL = Math.floor(widthF / 10);
  END_NODE_COL = Math.floor((widthF / 10) * 9);

  for (let row = 0; row < heightF; row++) {
    const tempRow = [];
    for (let col = 0; col < widthF; col++) {
      tempRow.push(createNode(row, col));
    }
    grid.push(tempRow);
  }

  return grid;
};

//create each node in the grid
const createNode = (row, col) => {
  return {
    row,
    col,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isEnd: row === END_NODE_ROW && col === END_NODE_COL,
    isVisited: false,
    distance: Infinity,
    previousNode: null,
    direction: null,
    weight: 0,
    type: ""
  };
};
