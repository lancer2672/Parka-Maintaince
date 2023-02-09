import "@/App.less";
import MainLayout from "@/components/Layout";
import { MerchantRoutes } from "@/config";
import AuthWrapper from "@/pages/AuthWrapper";
import Login from "@/pages/Login";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";

export default function App() {
  useEffect(() => {
    // const idCompany = localStorage.getItem("COMPANY_ID");
    // if (idCompany) {
    // }
    // const accessToken = localStorage.getItem("accessToken");
    // if (accessToken) {
    //   dispatch(verifyToken(accessToken))
    //     .unwrap()
    //     .then((res) => {})
    //     .catch((error) => {
    //       console.log(error);
    //       localStorage.removeItem("accessToken");
    //     });
    // }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
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
      <Route path="*" element={<Navigate to="/parking-lot" replace />} />
    </Routes>
  );
}
