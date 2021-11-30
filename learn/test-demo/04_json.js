const obj = {
	wanpan: "11",
};
const str = encodeURIComponent(JSON.stringify(obj));

console.log("str-1", str);
console.log("str-2", decodeURIComponent(str));
console.log("str-3", JSON.parse(decodeURIComponent(str)));

const str = encodeURIComponent(
	`taskId:1111-materialId:2222-H5Id:3333-originId:4444`
);

const getStateParams = strState => {
	const obj = {};
	strState.split("-").forEach(el => {
		const arr = el.split(":");
		obj[arr[0]] = arr[1];
	});
	return obj;
};
console.log(getStateParams(decodeURIComponent(str)));
