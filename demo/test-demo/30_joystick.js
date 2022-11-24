const zone = document.getElementById("joystick_box");
const body = document.getElementsByTagName("body")[0];

const joystickSize = 100;
/* 当前存在的摇杆节点 */
const currentJoystick = {
  ui: null,
  back: null,
  front: null,
  x: 25,
  y: 25,
  build: false,
};

/* 计算 */
const distance = (curPos, startPos) => {
  const dx = startPos.x - curPos.x;
  const dy = startPos.y - curPos.y;
  return Math.sqrt(dx * dx + dy * dy);
};
const radian = (p1, p2) => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;

  return Math.atan2(dy, dx);
};
const findCoord = (p, d, a) => {
  const b = { x: 0, y: 0 };
  b.x = -(d * Math.cos(a));
  b.y = -(d * Math.sin(a));
  return b;
};

/* 构建dom */
const appleStyle = (node, style) => {
  const styleKey = Object.keys(style);
  styleKey.forEach(e => {
    node.style[e] = style[e];
  });
};
const buildDom = zone => {
  const ui = document.createElement("div");
  const back = document.createElement("div");
  const front = document.createElement("div");
  currentJoystick.ui = ui;
  currentJoystick.back = back;
  currentJoystick.front = front;

  ui.setAttribute("id", "joystick");
  back.setAttribute("id", "back");
  front.setAttribute("id", "front");

  const uiStyle = {
    position: "fixed",
    top: currentJoystick.y - joystickSize / 2 + "px",
    left: currentJoystick.x - joystickSize / 2 + "px",
  };
  const backStyle = {
    width: `${joystickSize}px`,
    height: `${joystickSize}px`,
    "background-color": "red",
    "border-radius": "100%",
  };
  const frontStyle = {
    width: `${joystickSize / 2}px`,
    height: `${joystickSize / 2}px`,
    "background-color": "#fff",
    "border-radius": "100%",
    position: "absolute",
    top: 0,
    left: 0,
    margin: `${joystickSize / 4}px 0 0 ${joystickSize / 4}px`,
    transform: "translate(0px, 0px)",
  };
  appleStyle(ui, uiStyle);
  appleStyle(back, backStyle);
  appleStyle(front, frontStyle);

  ui.append(back, front);
  zone.appendChild(ui);
  currentJoystick.build = true;
};

/* 移动 */
const move = e => {
  if (!currentJoystick.build) return;

  const currentPos = { x: e.clientX, y: e.clientY };
  const r = currentJoystick.back.getBoundingClientRect().width / 2;

  /* 获取斜边长度 */
  var dist = distance(currentPos, currentJoystick);
  /* 获取原点夹角 弧度 */
  var rad = radian(currentPos, currentJoystick);

  /* 限制最大距离 */
  const clamped_dist = Math.min(dist, r);
  /* 计算位移点坐标 */
  const clamped_pos = findCoord(currentJoystick, clamped_dist, rad);

  currentJoystick.front.style.transform = `translate(${clamped_pos.x}px,${clamped_pos.y}px)`;
};

/* 监听 */
zone.addEventListener("mousedown", e => {
  const { clientX, clientY } = e;
  currentJoystick.x = clientX;
  currentJoystick.y = clientY;

  buildDom(zone);

  body.addEventListener("mousemove", move);
});

body.addEventListener("mouseup", e => {
  body.removeEventListener("mousemove", move);

  if (currentJoystick.build) {
    currentJoystick.front.style.transform = `translate(0px, 0px)`;
    setTimeout(() => {
      currentJoystick.ui.remove();
    }, 100);
  }
});
