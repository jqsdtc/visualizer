import React, { Component } from "react";
import {
  GiBrickWall,
  GiStairsGoal,
  GiWalk,
  GiPlainArrow
} from "react-icons/gi";
import { Badge } from "react-bootstrap";

export class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div id="description">
        <ul>
          <li>
            <div className="icon">
              <GiWalk size="2.3em" />
            </div>
            Start Node
          </li>
          <li>
            <div className="icon">
              <GiStairsGoal size="2.3em" />
            </div>
            End Node
          </li>
          <li>
            <div className="icon icon-empty" />
            Empty Node
          </li>
          <li>
            <div className="icon">
              <GiBrickWall size="2.3em" />
            </div>
            Wall Node
          </li>
          <li>
            <div className="icon">
              <GiPlainArrow size="2.3em" />
            </div>
            Path Node
          </li>
          <li>
            <div className="icon">
              <Badge variant="primary" style={{ lineHeight: "2.8" }}>
                num
              </Badge>
            </div>
            Weighted Node
          </li>
        </ul>
      </div>
    );
  }
}
