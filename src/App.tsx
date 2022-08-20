import { FC } from "react";
import { Divider } from "antd";
import Header from "./components/Header";
import Body from "./components/Body";
import { useWallet } from "./hooks/useWallet";

import "./styles/App.css";

const App: FC = () => {
	const { currentAccountAddress } = useWallet();
	return (
		<div className="App">
			<Header />
			<Divider />
			{!!currentAccountAddress && <Body />}
		</div>
	);
};

export default App;
