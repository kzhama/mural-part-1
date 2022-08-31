import { createContext, ReactNode, useReducer } from "react";
import { TxType } from "../components/TransactionsTable";

export const SET_TX_HASHES = "SET_TX_HASHES";
export const SET_CURRENT_ACCOUNT_ADDRESS = "SET_CURRENT_ACCOUNT_ADDRESS";
export const SET_BALANCE_IN_ETHERS = "SET_BALANCE_IN_ETHERS";

type SetTxHashesAction = { type: "SET_TX_HASHES"; payload: TxType };
type SetCurrentAccountAction = { type: "SET_CURRENT_ACCOUNT_ADDRESS"; payload: string };
type SetBalanceInEthersAction = { type: "SET_BALANCE_IN_ETHERS"; payload: string };

type Action = SetTxHashesAction | SetCurrentAccountAction | SetBalanceInEthersAction;

type StateType = {
	txHashes: TxType[];
	currentAccountAddress: string;
	balanceInEthers: string;
};

const initialState: StateType = {
	txHashes: [],
	currentAccountAddress: "",
	balanceInEthers: "",
};

function reducer(state: StateType, action: Action) {
	switch (action.type) {
		case SET_TX_HASHES: {
			return { ...state, txHashes: [action.payload, ...state.txHashes] };
		}
		case SET_CURRENT_ACCOUNT_ADDRESS: {
			return { ...state, currentAccountAddress: action.payload };
		}
		case SET_BALANCE_IN_ETHERS: {
			return { ...state, balanceInEthers: action.payload };
		}
		default: {
			return state;
		}
	}
}

interface ContextType {
	state: StateType;
	dispatch: React.Dispatch<Action>;
}

const Context = createContext({} as ContextType);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export default Context;
