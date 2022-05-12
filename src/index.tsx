import { ConfigProvider } from "antd";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Routes } from "react-router-dom";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.less";
import { store } from "./store";
import enUS from "antd/lib/locale/en_US";

ReactDOM.render(
  <ErrorBoundary>
    <ConfigProvider locale={enUS}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ConfigProvider>
  </ErrorBoundary>,
  document.getElementById("root"),
);
