import React, { useContext } from "react";
import Store from "./store";

function ChildOne(params) {
	const { contextData, contextDataHandle } = useContext(Store);

	return (
		<div>
			context: {contextData}
			<button
				onClick={() => {
					contextDataHandle(data => data + 2);
				}}
			>
				+ 2
			</button>
		</div>
	);
}

export default ChildOne;
