const BAR_COLOR_ONE = "turquoise";
const BAR_COLOR_TWO = "red";

export function sortAnimation(animation, speed, timesOfHeight, algorithm) {
  speed = 110 - speed;
  const bars = document.getElementsByClassName("bar-in");
  for (let i = 0; i < animation.length; i++) {
    const [index1, index2, type] = animation[i];
    if (type === "partition") {
      setTimeout(() => {
        for (let j = index1; j <= index2; j++) {
          bars[j].style.backgroundColor = "yellow";
        }
      }, i * speed);
    } else if (type === "compare") {
      const bar1 = bars[index1];
      const bar2 = bars[index2];
      setTimeout(() => {
        bar1.style.backgroundColor = BAR_COLOR_TWO;
        bar2.style.backgroundColor = BAR_COLOR_TWO;
      }, i++ * speed);
      setTimeout(() => {
        bar1.style.backgroundColor = BAR_COLOR_ONE;
        bar2.style.backgroundColor = BAR_COLOR_ONE;
      }, i * speed);
    } else if (type === "swap") {
      setTimeout(() => {
        const curBar = bars[index1];
        curBar.style.height = `${index2 * timesOfHeight}px`;
      }, i * speed);
    } else if (type === "finished") {
      if (algorithm === "Selection" || algorithm === "Quick") {
        setTimeout(() => {
          bars[index2].style.backgroundColor = "#e83e8c";
        }, i * speed);
      } else if (algorithm === "Merge") {
        setTimeout(() => {
          for (let j = index1; j <= index2; j++) {
            bars[j].style.backgroundColor = "#e83e8c";
          }
        }, i * speed);
      }
    } else {
      setTimeout(() => {
        document.getElementById("center").disabled = false;
      }, i * speed);
    }
  }
}
