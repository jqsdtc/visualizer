export function bubbleSort(array) {
  const copy = array.slice();
  const animation = [];
  for (let i = 0; i < copy.length; i++) {
    var curMinIndex = i;
    for (let j = i + 1; j < copy.length; j++) {
      animation.push([curMinIndex, j, "compare"]);
      animation.push([curMinIndex, j, "compare"]);
      if (copy[j] < copy[curMinIndex]) {
        curMinIndex = j;
      }
    }
    animation.push([i, copy[curMinIndex], "swap"]);
    animation.push([curMinIndex, copy[i], "swap"]);
    swap(copy, i, curMinIndex);
    animation.push([i, i, "finished"]);
  }

  animation.push([0, 0, ""]);
  return animation;
}

function swap(array, index1, index2) {
  var temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}
