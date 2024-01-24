import React from "react";
import ReactDOM from "react-dom/client";
import eruda from "eruda";
import "./style.css";

import { Game } from "./Game";

eruda.init();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Game />
    </React.StrictMode>
)