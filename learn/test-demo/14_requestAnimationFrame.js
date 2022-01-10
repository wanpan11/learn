let btn = document.getElementById("start");
let div = document.getElementById("div");
let start = 0;
let allInterval = [];

const progress = () => {
  div.style.width = div.offsetWidth + 1 + "px";
  div.innerHTML = div.offsetWidth + "%";
  if (div.offsetWidth < 100) {
    let current = Date.now();
    allInterval.push(current - start);
    start = current;
    requestAnimationFrame(progress);
  } else {
    console.log(allInterval); // 打印requestAnimationFrame的全部时间间隔
  }
};

btn.addEventListener("click", () => {
  div.style.width = 0;
  let currrent = Date.now();
  start = currrent;
  requestAnimationFrame(progress);
  console.log(allInterval);
});

// 浏览器 每帧画面 绘制完毕后 都是执行 requestAnimationFrame 的回调


