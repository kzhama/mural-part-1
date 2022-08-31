import { useContext } from "react";
import Context from "../context/ContextProvider";

export const useCustomContext = () => {
	return useContext(Context);
};
