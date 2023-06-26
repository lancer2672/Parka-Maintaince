import { parkingLotApi } from "@/api";
import BlockDetails from "@/components/ParkingLots/BlockDetails";
import TimeFrameDetails from "@/components/ParkingLots/TimeFrameDetails";
import { useAppSelector } from "@/store/hooks";
import { selectParkingLot } from "@/store/selectors";
import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface IProps {
  title: string;
  content: string | undefined;
}
const DescriptionItem = (props: IProps) => (
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
    fetch(`http://localhost:3001/parking-lot/get-one/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        // setIsSuccess(true);
        // setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // setIsLoading(false);
      });
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
          <BlockDetails idParkingLot={id ?? ""} />
        </Col>
        <Col span={12}>
          <TimeFrameDetails idParkingLot={id ?? ""} />
        </Col>
      </Row>
    </div>
  );
};

export default ParkingLotDetails;
