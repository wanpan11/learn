import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./index.scss";

// 样式相关 代码
const grid = 8;

// 垂直样式
const getItemStyle = (isDragging, draggableStyle) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: "none",
	padding: grid * 2,
	margin: `0 0 ${grid}px 0`,

	// change background colour if dragging
	background: isDragging ? "lightgreen" : "grey",

	// styles we need to apply on draggables
	...draggableStyle,
});
const getListStyle = isDraggingOver => ({
	background: isDraggingOver ? "lightblue" : "lightgrey",
	padding: grid,
	width: 250,
	margin: 10,
	float: "left",
});

// 水平样式
/* const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'red' : 'black',
  display: 'flex',
  padding: grid,
  overflow: 'auto',
}); */

class Dnd extends React.Component {
	//
	constructor(props) {
		super(props);
		this.state = {
			items_1: [
				{ id: "item-1-0", content: "hello-1" },
				{ id: "item-1-1", content: "I-1" },
				{ id: "item-1-2", content: "am-1" },
				{ id: "item-1-3", content: "卡-1" },
				{ id: "item-1-4", content: "特-1" },
				{ id: "item-1-5", content: "洛-1" },
			],
			items_2: [
				{ id: "item-2-0", content: "hello-2" },
				{ id: "item-2-1", content: "I-2" },
				{ id: "item-2-2", content: "am-2" },
				{ id: "item-2-3", content: "卡-2" },
				{ id: "item-2-4", content: "特-2" },
				{ id: "item-2-5", content: "洛-2" },
			],
		};
	}

	//#region fun
	/* 同组内 移动重排 */
	reOrder = ({ droppableId, fromIndex, toIndex }) => {
		const { items_1, items_2 } = this.state;

		const newlist = droppableId === "droppable_1" ? items_1 : items_2;
		const key = droppableId === "droppable_1" ? "items_1" : "items_2";

		const [removed] = newlist.splice(fromIndex, 1);
		newlist.splice(toIndex, 0, removed);

		this.setState({
			[key]: newlist,
		});
	};

	/* 夸组 移动重排 */
	acrossReOrder = ({ fromDroppableId, toDroppableId, fromIndex, toIndex }) => {
		const { items_1, items_2 } = this.state;

		/* 动态数据 */
		const fromItems_1 = fromDroppableId === "droppable_1" ? items_1 : items_2;
		const toItems_2 = toDroppableId === "droppable_1" ? items_1 : items_2;

		/* 动态key */
		const from_key = fromDroppableId === "droppable_1" ? "items_1" : "items_2";
		const to_key = toDroppableId === "droppable_1" ? "items_1" : "items_2";

		/* 添加 删除 */
		const [removed] = fromItems_1.splice(fromIndex, 1);
		toItems_2.splice(toIndex, 0, removed);

		this.setState({
			[from_key]: fromItems_1,
			[to_key]: toItems_2,
		});
	};

	onDragEnd = result => {
		// dropped outside the list
		const { destination, source } = result;

		if (!destination) {
			return;
		}

		if (destination.droppableId !== source.droppableId) {
			this.acrossReOrder({
				fromDroppableId: source.droppableId,
				toDroppableId: destination.droppableId,
				fromIndex: source.index,
				toIndex: destination.index,
			});
		} else {
			this.reOrder({
				droppableId: destination.droppableId,
				fromIndex: source.index,
				toIndex: destination.index,
			});
		}
	};
	//#endregion

	render() {
		return (
			<div className="App">
				<DragDropContext onDragEnd={this.onDragEnd}>
					<div className="dnd-pro">
						{/* // */}
						<Droppable droppableId="droppable_1" direction="vertical">
							{(provided, snapshot) => (
								<div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} {...provided.droppableProps}>
									{this.state.items_1.map((item, index) => (
										//
										<Draggable key={item.id} draggableId={item.id} index={index}>
											{(provided, snapshot) => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
												>
													{item.content}
												</div>
											)}
										</Draggable>
										//
									))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
						{/* // */}
						{/* // */}
						<Droppable droppableId="droppable_2" direction="vertical">
							{(provided, snapshot) => (
								<div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} {...provided.droppableProps}>
									{this.state.items_2.map((item, index) => (
										//
										<Draggable key={item.id} draggableId={item.id} index={index}>
											{(provided, snapshot) => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
												>
													{item.content}
												</div>
											)}
										</Draggable>
										//
									))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
						{/* // */}
					</div>
				</DragDropContext>
			</div>
		);
	}
}

export default Dnd;
