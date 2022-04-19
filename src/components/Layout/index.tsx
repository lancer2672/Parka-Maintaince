import logoImage from "@/assets/images/Logo.png";
import RightContent from "@/components/Layout/RightContent";
import { MerchantRoutes, MenuItems } from "@/config";
import ParkingLots from "@/pages/ParkingLots";
import ProLayout from "@ant-design/pro-layout";
import { useState } from "react";
import { Link, NavLink, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import AppFooter from "./Footer";

const MainLayout = () => {
  const [pathname, setPathname] = useState(window.location.pathname);
  const navigate = useNavigate();

  return (
    <div
      id="test-pro-layout"
      style={{
        height: "100vh",
      }}>
      <ProLayout
        route={MenuItems}
        location={{
          pathname,
        }}
        title="Parka merchant"
        logo={logoImage}
        fixedHeader
        fixSiderbar
        primaryColor="#6D5CE8"
        contentWidth="Fluid"
        layout="side"
        headerTitleRender={(logo, title) => (
          <Link to="/" onClick={() => setPathname("/")}>
            {logo}
            {title}
          </Link>
        )}
        onMenuHeaderClick={() => {
          navigate("/");
          setPathname("/");
        }}
        menuItemRender={(item, dom) => (
          <NavLink
            to={`${item.path}`}
            onClick={() => {
              setPathname(item.path || "/");
            }}>
            {dom}
          </NavLink>
        )}
        rightContentRender={() => <RightContent />}
        footerRender={() => <AppFooter />}>
        <Outlet />
      </ProLayout>
    </div>
  );
};

export default MainLayout;
