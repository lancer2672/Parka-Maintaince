import { parkingLotApi } from "@/api";
import BlockDetails from "@/components/ParkingLots/BlockDetails";
import { ParkingLot } from "@/types";
import { Button, Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Props {
  title: string;
  content: string | undefined;
}
const DescriptionItem = (props: Props) => (
  <Row style={{ fontSize: 16 }}>
    <Col span={3}>
      <p style={{ fontWeight: 600 }}>{props.title}</p>
    </Col>
    <Col>
      <p>{props.content}</p>
    </Col>
  </Row>
);

const ParkingLotDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState<ParkingLot>();

  useEffect(() => {
    parkingLotApi
      .getOne(id)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div>
      <Row gutter={[20, 40]}>
        <Col span={24}>
          <h1>Parking lot information</h1>
          <Card>
            <DescriptionItem title="Name" content={data?.name} />
            <DescriptionItem title="Address" content={data?.address} />
            <DescriptionItem title="Lat" content={data?.lat} />
            <DescriptionItem title="Long" content={data?.long} />
            <DescriptionItem title="Description" content={data?.description} />
          </Card>
        </Col>
        <Col span={12}>
          <BlockDetails />
        </Col>
        <Col span={12}>
          <h3>Slots</h3>
          <Card></Card>
        </Col>
      </Row>
    </div>
  );
};

export default ParkingLotDetails;
