import React, { useState } from "react";
import styleComponent from "styled-components";
import { Button } from "@douyinfe/semi-ui";
import GridLayoutApp from "./pages/grid-layout";
import Dnd from "./pages/dnd";
import ClassOrFunction from "./pages/class-function";

const Box = styleComponent.div`
  padding:0 24px;
`;

export default function Container() {
	const [more, moreHandle] = useState(false);

	return (
		<Box>
			<h1> ClassOrFunction </h1>
			<ClassOrFunction />
			<hr />

			<Button onClick={() => moreHandle(!more)}>查看更多</Button>

			{more ? (
				<>
					{" "}
					<h1> GridLayoutApp </h1> <GridLayoutApp />
					<hr />
					<h1> Dnd </h1>
					<Dnd />
					<hr />{" "}
				</>
			) : null}
		</Box>
	);
}
