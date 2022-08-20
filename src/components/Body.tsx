import { useState, FC } from "react";
import { Button, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useWallet } from "../hooks/useWallet";
import TransactionsTable from "./TransactionsTable";

import "../styles/Body.css";

const Body: FC = () => {
	const [ethAddress, setEthAddress] = useState("");
	const [amountInEth, setAmountInEth] = useState("");
	const { sendEth, isLoading, txHashes } = useWallet();

	return (
		<div className="body-container">
			<div className="body-wrapper">
				<h1>Send ETH</h1>
				<Input onChange={(e) => setEthAddress(e.target.value)} value={ethAddress} placeholder="Recipient Address" disabled={isLoading} />
				<br />
				<Input onChange={(e) => setAmountInEth(e.target.value)} value={amountInEth} placeholder="Amount in ETH" disabled={isLoading} />
				<br />
				<Button type="primary" shape="round" onClick={() => sendEth(ethAddress, amountInEth)} loading={isLoading}>
					<SendOutlined />
				</Button>
				<br />
				<TransactionsTable txHashes={txHashes} />
			</div>
		</div>
	);
};

export default Body;
