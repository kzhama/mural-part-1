import { FC } from "react";

import "../styles/TransactionsTable.css";

export interface TxType {
	key: string;
	txHash: string;
	linkToEtherscan: string;
}

interface TransactionsTableProps {
	txHashes: TxType[];
}

const TransactionsTable: FC<TransactionsTableProps> = ({ txHashes }) => {
	return (
		<div className="table-container">
			<h2>Transactions List</h2>
			{txHashes.map(({ txHash, linkToEtherscan, key }) => {
				return (
					<a key={key} href={linkToEtherscan} target="_blank" rel="noopener noreferrer">
						{txHash}
					</a>
				);
			})}
		</div>
	);
};

export default TransactionsTable;
