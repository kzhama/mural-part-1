import { FC } from "react";
import { useWallet } from "../hooks/useWallet";
import { useCustomContext } from "../hooks/useCustomContext";

import TransactionsTable from "./TransactionsTable";
import SendCard from "./SendCard";

import "../styles/Body.css";

const Body: FC = () => {
	const { sendEth, isLoading } = useWallet({ withEffects: false });
	const {
		state: { txHashes },
	} = useCustomContext();

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
