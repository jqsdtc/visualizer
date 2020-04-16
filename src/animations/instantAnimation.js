// animate Dijkstra algorithm
export function instantAnimate(visitedNodes, nodesInShortestPath, setPath) {
  for (let i = 0; i < visitedNodes.length; i++) {
    const node = visitedNodes[i];
    document.getElementById(`node-${node.row}-${node.col}`).className =
      "node instant-node-visited";
  }

  animatePath();

  //animate the shortest path that we find
  function animatePath() {
    for (let i = 0; i < nodesInShortestPath.length; i++) {
      const node = nodesInShortestPath[i];
      const cur = document.getElementById(`node-${node.row}-${node.col}`);
      if (i === 0) {
        cur.className = "node node-start";
      } else if (i === nodesInShortestPath.length - 1) {
        cur.className = "node node-end";
      } else {
        cur.className = "node node-path";
        setPath(node.row, node.col);
      }
    }
  }
}
