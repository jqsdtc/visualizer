export function quikSort(array) {
  const copy = array.slice();
  const animation = [];
  partition(copy, 0, copy.length - 1, animation);
  animation.push([0, 0, ""]);
  return animation;
}

function partition(copy, left, right, animation) {
  if (left > right) {
    return;
  }
  animation.push([left, right, "partition"]);
  var cur = right;
  for (let i = right; i > left; i--) {
    animation.push([left, i, "compare"]);
    animation.push([left, i, "compare"]);
    if (copy[i] > copy[left]) {
      animation.push([i, copy[cur], "swap"]);
      animation.push([cur, copy[i], "swap"]);
      swap(copy, cur, i);
      cur--;
    }
  }
  animation.push([left, copy[cur], "swap"]);
  animation.push([cur, copy[left], "swap"]);
  animation.push([cur, cur, "finished"]);
  swap(copy, left, cur);
  partition(copy, left, cur - 1, animation);
  partition(copy, cur + 1, right, animation);
}

function swap(copy, index1, index2) {
  const temp = copy[index1];
  copy[index1] = copy[index2];
  copy[index2] = temp;
}
