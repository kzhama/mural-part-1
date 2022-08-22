import { createContext, ReactNode, useState } from "react";
import { TxType } from "../components/TransactionsTable";

interface TxHashesContextType {
	txHashes: TxType[];
	setTxHashes: React.Dispatch<React.SetStateAction<TxType[]>>;
}

const TxHashesContext = createContext({} as TxHashesContextType);

export const TxHashesProvider = ({ children }: { children: ReactNode }) => {
	const [txHashes, setTxHashes] = useState<TxType[]>([]);

	return <TxHashesContext.Provider value={{ txHashes, setTxHashes }}>{children}</TxHashesContext.Provider>;
};

export default TxHashesContext;
