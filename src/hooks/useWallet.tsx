import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import { message } from "antd";
import { useCustomContext } from "./useCustomContext";
import { SET_BALANCE_IN_ETHERS, SET_CURRENT_ACCOUNT_ADDRESS, SET_TX_HASHES } from "../context/ContextProvider";

interface UseWalletProps {
	withEffects?: boolean;
}

export const useWallet = ({ withEffects }: UseWalletProps) => {
	const [isLoading, setIsLoading] = useState(false);

	const { state, dispatch } = useCustomContext();

	const resetStates = () => {
		dispatch({ type: SET_BALANCE_IN_ETHERS, payload: "" });
		dispatch({ type: SET_CURRENT_ACCOUNT_ADDRESS, payload: "" });
	};

	const checkIfWalletIsConnected = useCallback(async () => {
		setIsLoading(true);
		try {
			const { ethereum } = window;

			if (!ethereum) {
				resetStates();
				return;
			}

			const accounts = await ethereum.request({ method: "eth_accounts" });

			if (accounts.length !== 0) {
				const account = accounts[0];
				dispatch({ type: SET_CURRENT_ACCOUNT_ADDRESS, payload: account });
			} else {
				resetStates();
			}
		} catch (err) {
			resetStates();
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	}, [dispatch, resetStates]);

	const connectWallet = async () => {
		setIsLoading(true);
		try {
			const { ethereum } = window;

			if (!ethereum) {
				alert("Get MetaMask :)!");
				return;
			}

			const accounts = await ethereum.request({
				method: "eth_requestAccounts",
			});

			dispatch({ type: SET_CURRENT_ACCOUNT_ADDRESS, payload: accounts[0] });
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	const getBalanceInEthers = useCallback(async () => {
		setIsLoading(true);
		try {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const balanceResponse = await provider.getBalance(state.currentAccountAddress);
			const balanceFormattedToEthers = ethers.utils.formatEther(balanceResponse);
			dispatch({ type: SET_BALANCE_IN_ETHERS, payload: balanceFormattedToEthers });
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	}, [state.currentAccountAddress, dispatch, withEffects]);

	const sendEth = async (ethAddress: string, amountInEth: string) => {
		setIsLoading(true);
		try {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const txResponse = await signer.sendTransaction({
				to: ethAddress,
				value: ethers.utils.parseEther(amountInEth),
			});

			message.success("Tx signed successfully! Click tx hash to view progress on Etherscan", 8);

			const { hash } = txResponse;
			dispatch({
				type: SET_TX_HASHES,
				payload: {
					key: hash,
					txHash: hash,
					linkToEtherscan: `https://rinkeby.etherscan.io/tx/${hash}`,
				},
			});
		} catch (err) {
			console.error(err);
			if (err instanceof Error) message.error(err.message, 8);
		} finally {
			setIsLoading(false);
		}
	};

	const handleAccountOrNetworkChange = useCallback(async () => {
		checkIfWalletIsConnected();
		if (!!state.currentAccountAddress) getBalanceInEthers();
	}, [checkIfWalletIsConnected, state.currentAccountAddress, getBalanceInEthers]);

	useEffect(() => {
		if (!withEffects) return;
		checkIfWalletIsConnected();
		window.ethereum.on("accountsChanged", handleAccountOrNetworkChange);
		window.ethereum.on("networkChanged", handleAccountOrNetworkChange);

		return () => {
			window.ethereum.removeListener("accountsChanged", handleAccountOrNetworkChange);
			window.ethereum.removeListener("networkChanged", handleAccountOrNetworkChange);
		};
	}, [checkIfWalletIsConnected, handleAccountOrNetworkChange, withEffects]);

	useEffect(() => {
		if (!withEffects) return;
		if (!!state.currentAccountAddress) getBalanceInEthers();
	}, [state.currentAccountAddress, getBalanceInEthers, withEffects]);

	return {
		connectWallet,
		isLoading,
		sendEth,
	};
};
