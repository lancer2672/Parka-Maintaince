import { blockApi } from "@/api";
import { Card, Col, message, Row, Table, Tag } from "antd";
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
      dataIndex: "blockCode",
      align: "center",
    },
    {
      title: "Number of slots",
      dataIndex: "numOfSlot",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "isFull",
      render: () => <Tag color={"blue"}>isFull</Tag>,
      align: "center",
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await blockApi.getAll(props.idParkingLot);
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
        <h3 className=" text-xl">Blocks</h3>
        <Col flex="auto" />
        <Card>
          <Table<Block>
            bordered
            columns={columns}
            dataSource={data}
            loading={isLoading}
            rowKey={(row) => row.idBlock}
            pagination={{ pageSize: 5 }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default BlockDetails;