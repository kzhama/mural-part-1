import { useState, FC } from "react";
import { Button, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";

const ETH_WALLET_ADDRESS_CHAR_NUM = 42;

interface SendCardProps {
	sendEth: (address: string, amount: string) => void;
	isWalletLoading: boolean;
}

const SendCard: FC<SendCardProps> = ({ sendEth, isWalletLoading }) => {
	const [ethAddress, setEthAddress] = useState("");
	const [amountInEth, setAmountInEth] = useState("");

	const sendButtonIsDisabled = ethAddress.length !== ETH_WALLET_ADDRESS_CHAR_NUM || !amountInEth;

	return (
		<>
			<h1>Send ETH</h1>
			<Input onChange={(e) => setEthAddress(e.target.value)} value={ethAddress} placeholder="Recipient Address" disabled={isWalletLoading} />
			<br />
			<Input onChange={(e) => setAmountInEth(e.target.value)} value={amountInEth} placeholder="Amount in ETH" disabled={isWalletLoading} />
			<br />
			<Button type="primary" shape="round" onClick={() => sendEth(ethAddress, amountInEth)} loading={isWalletLoading} disabled={sendButtonIsDisabled}>
				<SendOutlined />
			</Button>
		</>
	);
};

export default SendCard;
