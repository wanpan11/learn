// 发布订阅对象
const eventEmitter = {};

// 缓存列表，存放 event 及 fn
eventEmitter.list = {};

/* 订阅消息 */
eventEmitter.on = function (event, fn) {
	const that = this;

	/* 如果订阅列表中 没有该事件就创建该事件并添加订阅回调 反之直接push新的回调函数*/
	if (!that.list[event]) {
		that.list[event] = [];
	}
	that.list[event].push(fn);

	return that;
};

/* 发布消息 */
eventEmitter.emit = function () {
	const that = this;

	/* 获取事件名称 */
	const event = [].shift.call(arguments);
	/* 获取事件内 回调函数 */
	const fns = [...this.list[event]];

	if (!fns || fns.length < 1) {
		return false;
	} else {
		fns.forEach(fn => {
			fn.call(that, arguments);
		});
	}
};

function user1(content) {
	console.log("用户1订阅了:", content);
}

function user2(content) {
	console.log("用户2订阅了:", content);
}

// 订阅
eventEmitter.on("article", user1);
eventEmitter.on("article", user2);

// 发布
eventEmitter.emit("article", "Javascript 发布-订阅模式");

console.log(eventEmitter);

/*
用户1订阅了: Javascript 发布-订阅模式
用户2订阅了: Javascript 发布-订阅模式
*/
