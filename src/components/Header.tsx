import { FC } from "react";
import { Button, Space } from "antd";
import CountUp from "react-countup";
import { useWallet } from "../hooks/useWallet";

import ethLogo from "../assets/eth-diamond-rainbow.png";

import "../styles/Header.css";

const Header: FC = () => {
	const { connectWallet, currentAccountAddress, balanceInEthers, isLoading } = useWallet();

	const hiddenCurrentAccountAddress = `${currentAccountAddress.substring(0, 4)}...${currentAccountAddress.substring(38)}`;

	return (
		<div className="header-container">
			{currentAccountAddress ? (
				<>
					<Space size={"middle"}>
						<img src={ethLogo} width="20px" alt="eth-logo" />
						<span id="balance-text">
							<CountUp suffix=" ETH" end={+balanceInEthers} decimals={4} duration={1} separator={" "} />
						</span>
						<span id="accountAddress-text">{hiddenCurrentAccountAddress}</span>
					</Space>
				</>
			) : (
				<>
					<Button type="primary" shape="round" size="large" onClick={connectWallet} disabled={!!currentAccountAddress} loading={isLoading}>
						Connect Wallet
					</Button>
				</>
			)}
		</div>
	);
};

export default Header;
