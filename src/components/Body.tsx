import { FC } from "react";
import { useWallet } from "../hooks/useWallet";
import TransactionsTable from "./TransactionsTable";
import SendCard from "./SendCard";

import "../styles/Body.css";

const Body: FC = () => {
	const { sendEth, isLoading, txHashes } = useWallet();

	return (
		<div className="body-container">
			<div className="body-wrapper">
				<SendCard sendEth={sendEth} isWalletLoading={isLoading} />
				<br />
				{!!txHashes.length && <TransactionsTable txHashes={txHashes} />}
			</div>
		</div>
	);
};

export default Body;
