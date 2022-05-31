import { timeFrameApi } from "@/api";
import { parseThousand } from "@/utils/stringHelper";
import { Card, Col, message, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
interface IProps {
  idParkingLot: string;
}
const TimeFrameDetails = (props: IProps) => {
  const [data, setData] = useState<Array<TimeFrame>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const columns: ColumnsType<TimeFrame> = [
    {
      title: "Duration (minute)",
      dataIndex: "duration",
      align: "center",
    },
    {
      title: "Cost (vnđ)",
      dataIndex: "cost",
      align: "center",
      render: (cost: any) => parseThousand(cost),
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await timeFrameApi.getAll(props.idParkingLot);
        setData(res.data.data);
        setIsLoading(false);
      } catch (error) {
        message.error(`${error}`);
      }
    })();
  }, []);
  return (
    <Row gutter={[20, 20]}>
      <Col span={24}>
        <h3 className=" text-xl">TimeFrames</h3>
        <Col flex="auto" />
        <Card>
          <Table<TimeFrame>
            bordered
            loading={isLoading}
            columns={columns}
            dataSource={data}
            rowKey={(row) => row.idParkingLot}
            pagination={{ pageSize: 5 }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default TimeFrameDetails;
