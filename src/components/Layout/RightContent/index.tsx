import { useAppSelector } from "@/store/hooks.js";
import { selectAuth } from "@/store/selectors.js";
import { Avatar, Popover } from "antd";
import Content from "./Content/index.js";
import logoImage from "@/assets/images/logo.png";

const RightContent = () => {
  const { auth } = useAppSelector(selectAuth);

  return (
    <Popover placement="bottomRight" content={<Content />} trigger="hover">
      <div className="flex gap-4 align-middle">
        <Avatar shape="square" src={logoImage} />
        <p className="m-0 font-semibold text-base">{auth?.companyName}</p>
      </div>
    </Popover>
  );
};

export default RightContent;
