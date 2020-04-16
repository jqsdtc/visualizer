import React, { Component } from "react";
import "../../css/Node.css";
import { GiBrickWall, GiStairsGoal, GiWalk } from "react-icons/gi";
import { Badge } from "react-bootstrap";

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.type !== this.props.type) {
      return true;
    }
    if (nextProps.weight !== this.props.weight) {
      return true;
    }
    return false;
  }

  render() {
    const {
      row,
      col,
      direction,
      weight,
      type,
      handleMouseDown,
      handleMouseUp,
      handleMouseEnter
    } = this.props;

    const extraClassName =
      type === "start"
        ? "node-start"
        : type === "end"
        ? "node-end"
        : type === "wall"
        ? "node-wall"
        : "";

    return (
      <div
        className={`node ${extraClassName}`}
        id={`node-${row}-${col}`}
        onMouseDown={e => handleMouseDown(row, col, e)}
        onMouseEnter={() => handleMouseEnter(row, col)}
        onMouseUp={() => handleMouseUp(row, col)}
      >
        {setIcon(type, direction, weight)}
      </div>
    );
  }
}

function setIcon(type, direction, weight) {
  switch (type) {
    case "start":
      return <GiWalk size="2.2em" />;
    case "end":
      return <GiStairsGoal size="2.2em" />;
    case "wall":
      return <GiBrickWall size="2.2em" />;
    case "path":
      var imgName;
      switch (direction) {
        case "up":
          imgName = "arrow-up.png";
          break;
        case "down":
          imgName = "arrow-down.png";
          break;
        case "left":
          imgName = "arrow-left.png";
          break;
        case "right":
          imgName = "arrow-right.png";
          break;
        default:
          imgName = "arrow-up.png";
          break;
      }
      const imgSrc = require(`../../image/${imgName}`);
      return <img src={imgSrc} width="35px" alt="" />;
    case "":
      if (weight !== 0) {
        return (
          <Badge variant="primary" style={{ lineHeight: "1.5" }}>
            {weight}
          </Badge>
        );
      } else {
        return;
      }
    default:
      return;
  }
}
