import React, { useState } from "react";
import styleComponent from "styled-components";
import { Button } from "@douyinfe/semi-ui";
import Dnd from "./pages/dnd";
import ContextDemo from "./pages/context-demo";
import GridLayoutApp from "./pages/grid-layout";
import ClassOrFun from "./pages/class-function";

const Box = styleComponent.div`
  padding:0 24px;

  .tips{
	  font-size:16px;
  }
`;

export default function Container() {
	const [more, moreHandle] = useState(false);

	return (
		<Box>
			<h1> ClassOrFunction </h1>
			<ClassOrFun />
			<hr />

			<Button onClick={() => moreHandle(!more)}>查看更多</Button>

			{more ? (
				<>
					<h1> GridLayoutApp </h1>
					<GridLayoutApp />
					<hr />

					<h1>
						ContextDemo
						<span className="tips">(用于处理多层嵌套 数据共享)</span>
					</h1>
					<ContextDemo />
					<hr />

					<h1> Dnd </h1>
					<Dnd />
					<hr />
				</>
			) : null}
		</Box>
	);
}
