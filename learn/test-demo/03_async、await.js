/* 直接返回形式 */
async function test_1(params) {
	/* reject */
	throw params;
	/* resolve */
	// return params;
}

async function test(params) {
	// 赋值
	// const num = (await test_1(params)) + 2;

	// 链式
	await test_1(params)
		.then(feed => {
			console.log("#1", feed);
		})
		.catch(e => {
			console.log(e);
		});

	// console.log('#2', num);
}

/* 返回Promise 形式 */
// async function test_1(params) {
// 	return new Promise(rev => {
// 		setTimeout(() => {
// 			rev(params);
// 		}, 200);
// 	});
// }

// async function test(params) {
// 	// 赋值
// 	const num = (await test_1(params)) + 2;

// 	// 链式
// 	await test_1(params).then(feed => {
// 		console.log("#1", feed);
// 	});

// 	console.log("#2", num);
// }

test(6);

/* Generator 函数
    Generator对象 像是一个方法集合 每个yield域 就是集合中的一个方法（子集们 被嵌套在一个公共方法里 所以每个子集都可以访问到其它子集的变量）
	每次调用next 方法就是执行下一个 yield域里的方法 
*/
function* mengmeng(param) {
	let a = yield param;
	let b = yield a + 1;
	yield b;
}

const fun = mengmeng(1);
console.log(fun.next());
console.log(fun.next(1));
console.log(fun.next(2));

const getRawType = target =>
	Object.prototype.toString.call(target).slice(8, -1);

const __createArrayIterable = arr => {
	if (typeof Symbol !== "function" || !Symbol.iterator) return {};
	if (getRawType(arr) !== "Array") throw new Error("it must be Array");
	const iterable = {};
	iterable[Symbol.iterator] = () => {
		arr.length++;
		const iterator = {
			next: () => ({ value: arr.shift(), done: arr.length <= 0 }),
		};
		return iterator;
	};
	return iterable;
};

const itable = __createArrayIterable(["人月", "神话"]);
const it = itable[Symbol.iterator]();

// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
