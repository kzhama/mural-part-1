import { FC } from "react";
import { Divider } from "antd";
import { useCustomContext } from "./hooks/useCustomContext";

import Header from "./components/Header";
import Body from "./components/Body";

import "./styles/App.css";

const App: FC = () => {
	const {
		state: { currentAccountAddress },
	} = useCustomContext();
	return (
		<div className="App">
			<Header />
			<Divider />
			{!!currentAccountAddress && <Body />}
		</div>
	);
};

export default App;
