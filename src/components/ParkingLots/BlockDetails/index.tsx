import { Card, Col, Row, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
interface IProps {
  idParkingLot: string;
}
const BlockDetails = (props: IProps) => {
  const [data, setData] = useState<Array<Block>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const columns: ColumnsType<Block> = [
    {
      title: "Block code",
      dataIndex: "code",
      align: "center",
    },
    {
      title: "Number of slots",
      dataIndex: "slot",
      align: "center",
    },
  ];

  useEffect(() => {
    fetch(`http://localhost:3001/block/get-list?parking_lot_id=${props.idParkingLot}`, {
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
        <h3 className=" text-xl">Blocks</h3>
        <Col flex="auto" />
        <Card>
          <Table<Block>
            bordered
            columns={columns}
            dataSource={data}
            loading={isLoading}
            rowKey={(row) => row.id}
            pagination={{ pageSize: 5 }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default BlockDetails;
