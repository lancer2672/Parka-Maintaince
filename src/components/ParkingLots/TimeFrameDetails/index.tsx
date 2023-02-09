import { parseThousand } from "@/utils/stringHelper";
import { Card, Col, Row, Table } from "antd";
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
    fetch(
      `http://localhost:8088/api/merchant/time-frame/get-list?parkingLotId=${props.idParkingLot}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((res) => {
        console.log(res.data?.data);
        setData(res.data?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);
  return (
    <Row gutter={[20, 20]}>
      <Col span={24}>
        <h3 className=" text-xl">Time frames</h3>
        <Col flex="auto" />
        <Card>
          <Table<TimeFrame>
            bordered
            loading={isLoading}
            columns={columns}
            dataSource={data}
            rowKey={(row) => row.id}
            pagination={{ pageSize: 5 }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default TimeFrameDetails;
