import { ReactComponent as Search } from "../assets/ESM@iconset_Search.svg";
import { ReactComponent as Edit } from "../assets/ESM@iconset_Edit.svg";
import { ReactComponent as Delete } from "../assets/ESM@iconset_Delete.svg";
import { Table } from 'antd'
import { useState } from "react";
const column = [
	{
		title: "Client Name",
		dataIndex: "ClientName",
		width: 150,
	},
	{
		title: "Board Name",
		dataIndex: "BoardName",
		width: 150,
	},
	{
		title: "Tags",
		dataIndex: "Tags",
		width: 150,
		render: (value) => {
			console.log(value);
			if (!value || !value.length) {
				return null;
			}
			return value.map((it) => {
				return (
					<div
						style={{
							background: "#eee",
							display: "inline-block",
							padding: "0 4px",
							margin: "0 4px 0 0",
						}}
						key={it}
					>
						{it}
					</div>
				);
			});
		},
	},
	{
		title: "Requestor",
		dataIndex: "Requestor",
		width: 150,
	},
	{
		title: "SDK Script",
		dataIndex: "SDK Script",
		width: 150,
		render: () => {
			return <div style={{ color: "#356ef4" }}>&lt;/&gt; SDK</div>;
		},
	},
	{
		title: "Actions",
		dataIndex: "Actions",
		width: 150,
		render: () => {
			return (
				<div className="actions-box">
					<Edit fill="#7c878e" className="edit-icon" />
					<Delete fill="#7c878e" className="delete-icon" />
				</div>
			);
		},
	},
];
const defaultData = [
	{
		ClientName: "Worker Training",
		BoardName: "Admin Supports",
		Tags: ["Story", "xx"],
		Requestor: "Kleven YU",
	},
	{
		ClientName: "Order",
		BoardName: "Elsa LI",
		Tags: ["CES"],
		Requestor: "Elsa",
	},
];
function TableComponent() {
  const [dataSource, setDataSource] = useState(defaultData);
	return (
		<div className="table-container">
			<div className="table-header">
				<div className="title">SDK Mangement</div>
				<div className="table-header-right">
					<Search fill="#7c878e" className="search-icon" />
					<input
						type="text"
						placeholder="Search client name, board name, tags, requestor"
					/>
					<button>Create SDK</button>
				</div>
			</div>
			<div className="table-content">
				<Table
					columns={column}
					dataSource={dataSource}
					rowKey={(record) => record.ClientName}
				/>
			</div>
		</div>
	);
}

export default TableComponent;
