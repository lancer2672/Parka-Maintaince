import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { FC } from "react";

const RightContent: FC = () => {
  return (
    <div>
      <Avatar shape="square" size="small" icon={<UserOutlined />} />
    </div>
  );
};

export default RightContent;
