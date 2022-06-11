import "@/App.less";
import MainLayout from "@/components/Layout";
import { MerchantRoutes } from "@/config";
import Login from "@/pages/Login";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthWrapper from "@/pages/AuthWrapper";
import { verifyToken } from "@/store/actions/authAction";
import { useAppDispatch } from "@/store/hooks";
import SignUp from "./pages/SignUp";

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      dispatch(verifyToken(accessToken))
        .unwrap()
        .then((res) => {})
        .catch((error) => {
          console.log(error);
          localStorage.removeItem("accessToken");
        });
    }
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
      <Route path="*" element={<Navigate to="/lots" replace />} />
    </Routes>
  );
}
