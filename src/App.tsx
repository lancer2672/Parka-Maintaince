import MainLayout from "@/components/Layout";
import { ConfigProvider } from "antd";
import enUS from "antd/lib/locale/en_US";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "@/App.less";
import ErrorBoundary from "@/components/ErrorBoundary";
import { MerchantRoutes } from "@/config";
import Login from "@/pages/Login";
import { store } from "@/store";
import { useAppSelector } from "@/store/hooks";
import { authState$ } from "@/store/selectors";
import { useEffect, useState } from "react";
import AuthWrapper from "./pages/AuthWrapper";

export default function App() {
  const authState = useAppSelector(authState$);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  // const render = () => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   if (accessToken && authState.auth) {
  //     return (
  //       <Route path="/" element={<MainLayout />}>
  //         {MerchantRoutes?.map((route) => (
  //           <Route key={route.path} path={route.path} element={route.page} />
  //         ))}
  //       </Route>
  //     );
  //   } else {
  //     return (
  //       <>
  //         <Route path="/login" element={<Login />} />
  //         <Route path="*" element={<Navigate to="/login" replace />} />
  //       </>
  //     );
  //   }
  // };
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && authState.auth) {
      setIsAuth(true);
    }
  }, []);
  // if (!isAuth) {
  //   return (
  //     <Routes>
  //       <Route path="/login" element={<Login />} />
  //       <Route path="*" element={<Navigate to="/login" replace />} />
  //     </Routes>
  //   );
  // }
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <AuthWrapper>
            <MainLayout />
          </AuthWrapper>
        }>
        {MerchantRoutes?.map((route) => (
          <Route key={route.path} path={route.path} element={route.page} />
        ))}
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
