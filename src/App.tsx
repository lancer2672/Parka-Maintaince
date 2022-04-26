import MainLayout from "@/components/Layout";
import { ConfigProvider } from "antd";
import enUS from "antd/lib/locale/en_US";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.less";
import ErrorBoundary from "./components/ErrorBoundary";
import { MerchantRoutes } from "./config";
import Login from "./pages/Login";
import { store } from "./store";

export default function App() {
  return (
    <ErrorBoundary>
      <ConfigProvider locale={enUS}>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<MainLayout />}>
                {MerchantRoutes?.map((route) => (
                  <Route key={route.path} path={route.path} element={route.page} />
                ))}
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </ConfigProvider>
    </ErrorBoundary>
  );
}
