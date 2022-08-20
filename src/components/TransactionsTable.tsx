import { FC } from "react";

import "../styles/TransactionsTable.css";

export interface TxType {
	key: string;
	hash: string;
	link: string;
}

interface TransactionsTableProps {
	txHashes: TxType[];
}

const TransactionsTable: FC<TransactionsTableProps> = ({ txHashes }) => {
	if (!txHashes.length) return null;

	return (
		<div className="table-container">
			<h2>Transactions List</h2>
			{txHashes.map(({ hash, link, key }) => {
				return (
					<a key={key} href={link} target="_blank" rel="noopener noreferrer">
						{hash}
					</a>
				);
			})}
		</div>
	);
};

export default TransactionsTable;
