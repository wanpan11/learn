const stopShakeFun = (sceond = 200) => {
	let timer = null; // 定时器

	// 返回依赖timer 的闭包函数
	return (fun, params) => {
		// timer存在说明触发过 这里清理下
		if (timer) {
			clearTimeout(timer);
		}

		// 清理完 再次赋值新的定时器
		timer = setTimeout(() => {
			fun(...params);
			// console.log(arguments);
		}, sceond);
	};
};

const myClick = stopShakeFun(500);
