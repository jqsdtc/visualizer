export function findPath(grid, startNode, endNode, algorithm) {
  const visitedNodes = [];
  const unvisitedNodes = getNodes(grid);
  startNode.distance = 0;
  let sort = D_sort;
  if (algorithm === "Dijkstra") {
    sort = D_sort;
  } else if (algorithm === "AStar") {
    sort = A_sort;
  }else if(algorithm){
    sort = B_sort;
  }
  if(algorithm === "DFS"){
    const stack = [];
    stack.push(startNode);
    while (stack.length !== 0) {
      const curNode = stack.pop();
      visitedNodes.push(curNode);
      curNode.isVisited = true;
      visitedNodes.push(curNode);
      if (curNode === endNode) {
        return visitedNodes;
      } else {
        const neighbors = getNeighbors(curNode,grid);
        neighbors.forEach(node => stack.push(node));
      }
    }
  }else {
    while (unvisitedNodes.length !== 0) {
      sort(unvisitedNodes, endNode);
      const curShortestNode = unvisitedNodes.shift();
      if (curShortestNode.distance === Infinity) {
        return visitedNodes;
      }
      curShortestNode.isVisited = true;
      visitedNodes.push(curShortestNode);
      if (curShortestNode === endNode) {
        return visitedNodes;
      } else {
        updateNeighbors(curShortestNode, grid);
      }
    }
  }
}

export function getShortestPath(endNode, startNode) {
  const nodesInPath = [];
  let curNode = endNode;
  while (curNode !== null) {
    if (curNode !== startNode && curNode !== endNode) {
      setDirection(curNode, nodesInPath[0]);
    }
    nodesInPath.unshift(curNode);
    curNode = curNode.previousNode;
  }
  return nodesInPath;
}

//set the direction of each node in path
function setDirection(node1, node2) {
  const dir = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  for (let i = 0; i < 4; i++) {
    const row = node1.row + dir[i][0];
    const col = node1.col + dir[i][1];
    if (row === node2.row && col === node2.col) {
      switch (i) {
        case 0:
          node1.direction = "down";
          break;
        case 1:
          node1.direction = "up";
          break;
        case 2:
          node1.direction = "right";
          break;
        case 3:
          node1.direction = "left";
          break;
        default:
          break;
      }
    }
  }
}

function getNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}


function B_sort(nodes, endNode) {
  nodes.sort((node1, node2) => {
    return node1.distance - node2.distance;
  });
}

//sort nodes according to their distance to the start node
function D_sort(nodes, endNode) {
  nodes.sort((node1, node2) => {
    return node1.distance + node1.weight - node2.distance - node2.weight;
  });
}

//sort nodes according to the sum of distance to start node and manhattan distance to end node
function A_sort(nodes, endNode) {
  nodes.sort((node1, node2) => {
    const distance1 =
      node1.distance + node1.weight + manhattanDistance(node1, endNode);
    const distance2 =
      node2.distance + node2.weight + manhattanDistance(node2, endNode);
    return distance1 - distance2;
  });
}

function manhattanDistance(node1, node2) {
  return Math.abs(node1.row - node2.row) + Math.abs(node1.col - node2.col);
}

//update the distance of neighbors of current node
function updateNeighbors(node, grid) {
  const dir = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  for (let i = 0; i < 4; i++) {
    const row = node.row + dir[i][0];
    const col = node.col + dir[i][1];
    if (
      row >= 0 &&
      row < grid.length &&
      col >= 0 &&
      col < grid[0].length &&
      !grid[row][col].isVisited &&
      grid[row][col].type !== "wall"
    ) {
      grid[row][col].distance = node.distance + 1;
      grid[row][col].previousNode = node;
    }
  }
}


function getNeighbors(node, grid) {
  const dir = [[0, -1], [1, 0],[0, 1], [-1, 0]];
  const neighbors = [];
  for (let i = 0; i < 4; i++) {
    const row = node.row + dir[i][0];
    const col = node.col + dir[i][1];
    if (
      row >= 0 &&
      row < grid.length &&
      col >= 0 &&
      col < grid[0].length &&
      !grid[row][col].isVisited &&
      grid[row][col].type !== "wall"
    ) {
      grid[row][col].distance = node.distance + 1;
      grid[row][col].previousNode = node;
      neighbors.push(grid[row][col]);
    }
  }
  return neighbors;
}
