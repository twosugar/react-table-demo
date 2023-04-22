import { ReactComponent as Search } from "../assets/ESM@iconset_Search.svg";
import { ReactComponent as Edit } from "../assets/ESM@iconset_Edit.svg";
import { ReactComponent as Delete } from "../assets/ESM@iconset_Delete.svg";
import { Table, Input } from "antd";
import { useCallback, useMemo, useState } from "react";
function TableComponent(props) {
  const { setIsModalOpen, setModalInfo, dataSource, setDataSource } = props;
	const [searchValue, setSearchValue] = useState("");

	const highlightKeywords = useCallback(
		(str) => {
			if (!searchValue) {
				return str;
			}
			const lowerStr = str.toLowerCase();
			const index = lowerStr.indexOf(searchValue.toLowerCase());
			const len = searchValue.length;
			if (index < 0) {
				return str;
			}
			const keywords = str.slice(index, index + len);
			const res = str
				.split(keywords)
				.join("<span style='color:red;'>" + keywords + "</span>");
			return res;
		},
		[searchValue]
	);

  const deleteSdk = (row) => {
		const ds = dataSource
			.map((it) => {
				return {
					...(it.id === row.id ? {} : it),
				};
			})
			.filter((it) => !!it.id);
		setDataSource(ds);
		localStorage.setItem("searchtable", JSON.stringify(ds));
	};

	const column = useMemo(() => {
		const list = [
			{
				title: "Client Name",
				dataIndex: "ClientName",
				width: 150,
				render: (value) => {
					if (!value) {
						return null;
					}
					return (
						<div
							dangerouslySetInnerHTML={{ __html: highlightKeywords(value) }}
						></div>
					);
				},
			},
			{
				title: "Board Name",
				dataIndex: "BoardName",
				width: 150,
				render: (value) => {
					if (!value) {
						return null;
					}
					return (
						<div
							dangerouslySetInnerHTML={{ __html: highlightKeywords(value) }}
						></div>
					);
				},
			},
			{
				title: "Tags",
				dataIndex: "Tags",
				width: 150,
				render: (value) => {
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
								dangerouslySetInnerHTML={{ __html: highlightKeywords(it) }}
							></div>
						);
					});
				},
			},
			{
				title: "Requestor",
				dataIndex: "Requestor",
				width: 150,
				render: (value) => {
					if (!value) {
						return null;
					}
					return (
						<div
							dangerouslySetInnerHTML={{ __html: highlightKeywords(value) }}
						></div>
					);
				},
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
				render: (value, row) => {
					return (
						<div className="actions-box">
							<Edit
								fill="#7c878e"
								className="edit-icon"
								onClick={() => editSdk(row)}
							/>
							<Delete fill="#7c878e" className="delete-icon" onClick={() => deleteSdk(row)} />
						</div>
					);
				},
			},
		];
		return list;
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue, dataSource]);

  const editSdk = (info) => {
    setModalInfo(info);
    setIsModalOpen(true);
  }

	const onChange = (e) => {
		setSearchValue(e.target.value);
	};

	const list = useMemo(() => {
		if (!searchValue) {
			return dataSource;
		}
		const data = [];
		out: for (const item of dataSource) {
			for (const it of Object.values(item)) {
				if (typeof it === "string") {
					if (it.toLowerCase().indexOf(searchValue.toLowerCase()) > -1) {
						data.push(item);
						break;
					}
				}
				if (Array.isArray(it)) {
					for (const row of it) {
						if (row.toLowerCase().indexOf(searchValue.toLowerCase()) > -1) {
							data.push(item);
							break out;
						}
					}
				}
			}
		}
		return data;
	}, [searchValue, dataSource]);

  const openDialog = () => {
    setModalInfo({});
    setIsModalOpen(true)
  }

	return (
		<div className="table-container">
			<div className="table-header">
				<div className="title">SDK Mangement</div>
				<div className="table-header-right">
					<Input
						className="search-input"
						prefix={<Search fill="#7c878e" className="search-icon" />}
						placeholder="Search client name, board name, tags, requestor"
						onChange={onChange}
						value={searchValue}
					/>
					<button onClick={openDialog}>Create SDK</button>
				</div>
			</div>
			<div className="table-content">
				<Table
					columns={column}
					dataSource={list}
					rowKey={(record) => record.id}
				/>
			</div>
		</div>
	);
}

export default TableComponent;
