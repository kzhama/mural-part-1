import { useCallback, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { message } from "antd";
import TxHashesContext from "../context/TxHashesProvider";

export const useWallet = () => {
	const [currentAccountAddress, setCurrentAccountAddress] = useState("");
	const [balanceInEthers, setBalanceInEthers] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const { setTxHashes } = useContext(TxHashesContext);

	const resetStates = () => {
		setBalanceInEthers("");
		setCurrentAccountAddress("");
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
				setCurrentAccountAddress(account);
			} else {
				resetStates();
			}
		} catch (err) {
			resetStates();
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	}, []);

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

			setCurrentAccountAddress(accounts[0]);
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	const getBalanceInEthers = useCallback(async () => {
		try {
			setIsLoading(true);
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const balanceResponse = await provider.getBalance(currentAccountAddress);
			const balanceFormattedToEthers = ethers.utils.formatEther(balanceResponse);
			setBalanceInEthers(balanceFormattedToEthers);
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			console.error(err);
		}
	}, [currentAccountAddress]);

	const sendEth = async (ethAddress: string, amountInEth: string) => {
		try {
			setIsLoading(true);

			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const txResponse = await signer.sendTransaction({
				to: ethAddress,
				value: ethers.utils.parseEther(amountInEth),
			});

			message.success("Tx signed successfully! Click tx hash to view progress on Etherscan", 8);

			// This txs should be in some kind of global state manager like Redux, or React useReducer hook.
			// But for this example, its just an overkill.
			const { hash } = txResponse;
			setTxHashes((prevState) => {
				return [
					{
						key: hash,
						txHash: hash,
						linkToEtherscan: `https://rinkeby.etherscan.io/tx/${hash}`,
					},
					...prevState,
				];
			});

			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			console.error(err);
			if (err instanceof Error) message.error(err.message, 8);
		}
	};

	const handleAccountOrNetworkChange = useCallback(async () => {
		checkIfWalletIsConnected();
		if (!!currentAccountAddress) getBalanceInEthers();
	}, [checkIfWalletIsConnected, currentAccountAddress, getBalanceInEthers]);

	useEffect(() => {
		checkIfWalletIsConnected();
		window.ethereum.on("accountsChanged", handleAccountOrNetworkChange);
		window.ethereum.on("networkChanged", handleAccountOrNetworkChange);

		return () => {
			window.ethereum.removeListener("accountsChanged", handleAccountOrNetworkChange);
			window.ethereum.removeListener("networkChanged", handleAccountOrNetworkChange);
		};
	}, [checkIfWalletIsConnected, handleAccountOrNetworkChange]);

	useEffect(() => {
		if (!!currentAccountAddress) getBalanceInEthers();
	}, [currentAccountAddress, getBalanceInEthers]);

	return {
		connectWallet,
		currentAccountAddress,
		balanceInEthers,
		isLoading,
		sendEth,
	};
};
