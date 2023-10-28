import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
import { Provider } from "react-redux";
import { setupStore } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
      <App />
        {/* <Provider store={setupStore}>
          <App />
        </Provider> */}
    </BrowserRouter>
);
