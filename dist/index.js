import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AuthProvider } from "./context/AuthContext";
var root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(BrowserRouter, null,
    React.createElement(Provider, { store: store },
        React.createElement(AuthProvider, null,
            React.createElement(App, null)))));
