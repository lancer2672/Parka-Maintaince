import { useAppDispatch } from "@/store/hooks";
import { Menu } from "antd";
import { HiOutlineLogout, HiOutlinePencil } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { logout } from "@/store/reducers/authSlice";
import { IconContext } from "react-icons";

const Content = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const editProfile = () => {
    navigate("/profile");
  };

  const contents = [
    {
      icon: <HiOutlinePencil />,
      content: "Edit profile",
      onClick: editProfile,
    },
    {
      icon: <HiOutlineLogout />,
      content: "Log out",
      onClick: handleLogout,
    },
  ];
  const renderMenu = contents.map((content) => {
    return (
      <Menu.Item key={content.content} onClick={content.onClick} icon={content.icon}>
        {content.content}
      </Menu.Item>
    );
  });

  return (
    <Menu className="w-" style={{ width: 140 }}>
      {renderMenu}
    </Menu>
  );
};

export default Content;
