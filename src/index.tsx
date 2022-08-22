import React from "react";
import ReactDOM from "react-dom/client";
import { TxHashesProvider } from "./context/TxHashesProvider";
import App from "./App";

import "./styles/index.css";
import "antd/dist/antd.min.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<TxHashesProvider>
			<App />
		</TxHashesProvider>
	</React.StrictMode>
);
