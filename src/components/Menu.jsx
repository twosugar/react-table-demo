import { ReactComponent as ICON2_API } from "../assets/ICON2_API.svg";
const currentKey = "SDK Management";
const menus = [
	{ title: "User Profile", Icon: (fill) => <ICON2_API fill={fill} /> },
	{ title: "SDK Management", Icon: (fill) => <ICON2_API fill={fill} />, },
	{ title: "Dashboards", Icon: (fill) => <ICON2_API fill={fill} /> },
	{ title: "Terms & Conditions", Icon: (fill) => <ICON2_API fill={fill} /> },
];
function Menu() {
	return <div className="menus-container">
    {
      menus.map(it => {
        return (
					<div
						key={it.title}
						className={`menu-item ${currentKey === it.title && 'active'}`}
					>
						{it.Icon(currentKey === it.title ? "#356ef4" : "#ccc")}
						{it.title}
					</div>
				);
      })
    }
  </div>;
}

export default Menu;
