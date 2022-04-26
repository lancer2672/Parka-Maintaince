import { useAppSelector } from "@/store/hooks.js";
import { selectAuth } from "@/store/selectors.js";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Popover } from "antd";
import Content from "./Content/index.js";

const RightContent = () => {
  const { auth } = useAppSelector(selectAuth);

  return (
    <Popover placement="bottomRight" content={<Content />} trigger="hover">
      <div className="flex gap-4 align-middle">
        <Avatar shape="square" icon={<UserOutlined />} />
        <p className="m-0 font-semibold text-base">{auth?.companyName}</p>
      </div>
    </Popover>
  );
};

export default RightContent;
