import React from "react";
import ReactDOM from "react-dom/client";
import { ContextProvider } from "./context/ContextProvider";
import App from "./App";

import "./styles/index.css";
import "antd/dist/antd.min.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<ContextProvider>
			<App />
		</ContextProvider>
	</React.StrictMode>
);
