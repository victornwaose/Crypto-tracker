import React from "react";
import ReactDOM from "react-dom";
import "react-alice-carousel/lib/alice-carousel.css";

import "./index.css";
import App from "./App";
import CryptoContext from "./context/CryptoContext";

ReactDOM.render(
    <React.StrictMode>
        <CryptoContext>
            <App />
        </CryptoContext>
    </React.StrictMode>,
    document.getElementById("root")
);
