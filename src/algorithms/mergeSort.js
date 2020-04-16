export function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }

  //animation is used to store the steps of comparation
  const animation = [];
  const copy1 = array.slice();
  const copy2 = array.slice();
  partition(copy2, 0, array.length - 1, copy1, animation);
  animation.push([0, 0, ""]);
  return animation;
}

function partition(array, left, right, copy, animation) {
  if (left === right) {
    return;
  }

  const mid = Math.floor((left + right) / 2);
  partition(copy, left, mid, array, animation);
  partition(copy, mid + 1, right, array, animation);
  merge(array, left, mid, right, copy, animation);
}

function merge(array, left, mid, right, copy, animation) {
  let i = left;
  let j = mid + 1;
  let cur = left;

  animation.push([left, right, "partition"]);
  while (i <= mid && j <= right) {
    animation.push([i, j, "compare"]);
    animation.push([i, j, "compare"]);

    if (copy[i] <= copy[j]) {
      animation.push([cur, copy[i], "swap"]);
      array[cur++] = copy[i++];
    } else {
      animation.push([cur, copy[j], "swap"]);
      array[cur++] = copy[j++];
    }
  }

  while (i <= mid) {
    animation.push([i, i, "compare"]);
    animation.push([i, i, "compare"]);
    animation.push([cur, copy[i], "swap"]);
    array[cur++] = copy[i++];
  }

  while (j <= right) {
    animation.push([j, j, "compare"]);
    animation.push([j, j, "compare"]);
    animation.push([cur, copy[j], "swap"]);
    array[cur++] = copy[j++];
  }

  animation.push([left, right, "finished"]);
}
