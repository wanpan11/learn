import React, { useContext } from "react";
import Store from "./store";

function ChildTwo(params) {
	const { contextData, contextDataHandle } = useContext(Store);
	return (
		<div>
			context: {contextData}
			<button
				onClick={() => {
					contextDataHandle(data => data + 1);
				}}
			>
				+ 1
			</button>
		</div>
	);
}

export default ChildTwo;
