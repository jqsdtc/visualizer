// animate algorithm
export function animate(visitedNodes, nodesInShortestPath, speed, setPath) {
  const curSpeed = speed === "Fast" ? 0 : speed === "Normal" ? 100 : 400;
  timeout(0);
  function timeout(index) {
    setTimeout(() => {
      if (index === visitedNodes.length) {
        animatePath(0);
      } else {
        const node = visitedNodes[index];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
        timeout(index + 1);
      }
    }, curSpeed);
  }

  //animate the shortest path that we find
  function animatePath(index) {
    setTimeout(() => {
      if (index === nodesInShortestPath.length) {
        document.getElementById("center").disabled = false;
      } else {
        const node = nodesInShortestPath[index];
        const cur = document.getElementById(`node-${node.row}-${node.col}`);
        if (index === 0) {
          cur.className = "node node-start";
        } else if (index === nodesInShortestPath.length - 1) {
          cur.className = "node node-end";
        } else {
          cur.className = "node node-path";
          setPath(node.row, node.col);
        }
        animatePath(index + 1);
      }
    }, 50);
  }
}
