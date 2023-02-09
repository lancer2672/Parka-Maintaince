import logoImage from "@/assets/images/logo.png";
import RightContent from "@/components/Layout/RightContent";
import { MenuItems } from "@/config";
import ProLayout from "@ant-design/pro-layout";
import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import AppFooter from "./Footer";

const MainLayout = () => {
  const [pathname, setPathname] = useState(window.location.pathname);
  const navigate = useNavigate();

  return (
    <div
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
          <Link to="/parking-lot" onClick={() => setPathname("/parking-lot")}>
            {logo}
            {title}
          </Link>
        )}
        onMenuHeaderClick={() => {
          navigate("/parking-lot");
          setPathname("/parking-lot");
        }}
        menuItemRender={(item, dom) => (
          <NavLink
            to={`${item.path}`}
            onClick={() => {
              setPathname(item.path || "/parking-lot");
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
