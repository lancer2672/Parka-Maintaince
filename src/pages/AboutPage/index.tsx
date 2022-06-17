import React from "react";
import { Col, Row } from "antd";
import ProfileCard from "@/components/AboutPage/AboutCard";

const AboutPage = () => {
  const team = [
    {
      name: "Trung Huỳnh",
      imgUrl:
        "https://firebasestorage.googleapis.com/v0/b/lanspire.appspot.com/o/images%2Ftrunghuynh.jpg?alt=media&token=1070eb20-a905-44fb-805f-7708d7ba4e00",
      title: "Software engineer",
      github: "https://github.com/trunghq234",
      facebook: "https://www.facebook.com/trunghuynh2304/",
    },
    {
      name: "Quang Pn",
      imgUrl:
        "https://firebasestorage.googleapis.com/v0/b/lanspire.appspot.com/o/images%2Fquangpn.jpg?alt=media&token=eb17f1d7-aaf2-40e1-a8a1-a181a6c585d4",
      title: "Software engineer",
      github: "https://github.com/quangpn24",
      facebook: "https://www.facebook.com/quangpn24",
    },
  ];
  return (
    <Row gutter={[20, 20]} justify="center">
      <Col span={24}>
        <h3 className="font-semibold text-xl self-center">Our team</h3>
      </Col>
      {team.map((item) => (
        <Col xs={24} sm={12} md={6} key={item.name}>
          <ProfileCard user={item} />
        </Col>
      ))}
    </Row>
  );
};

export default AboutPage;
