import { parkingLotApi } from "@/api";
import AddParkingLotsForm from "@/components/ParkingLots/AddParkingLotsForm";
import { ParkingLot } from "@/types";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Card, Col, Modal, Popconfirm, Row, Table, Tag, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import Search from "antd/lib/input/Search";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ParkingLots: FC = () => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState<Array<ParkingLot>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTrigger, setIsTrigger] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [editData, setEditData] = useState<ParkingLot>();

  useEffect(() => {
    if (isTrigger) {
      setIsLoading(true);
      setEditData(undefined);
      parkingLotApi
        .getAll()
        .then((res) => {
          setDataSource(res.data.data);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [isTrigger]);
  const columns: ColumnsType<ParkingLot> = [
    {
      title: "ID",
      dataIndex: "idParkingLot",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "30%",
    },
    {
      title: "Status",
      dataIndex: "isDeleted",
      align: "center",
      render: (isDeleted: boolean) =>
        isDeleted ? <Tag color="red">Deleted</Tag> : <Tag color="green">Available</Tag>,
    },
    {
      title: "",
      dataIndex: "idParkingLot",
      align: "center",
      render: (idParkingLot: string, parkingLot) => {
        return (
          <div style={{ display: "flex", justifyContent: "flex-start", gap: "10px" }}>
            <Tooltip title="View details">
              <Button
                type="primary"
                ghost
                icon={<EyeOutlined />}
                onClick={() => navigate(`/lots/${idParkingLot}`, { state: parkingLot })}
              />
            </Tooltip>
            <Tooltip title="Edit">
              <Button
                type="default"
                icon={<EditOutlined />}
                // onClick={() => onClickEdit(parkingLot)}
              />
            </Tooltip>
            {parkingLot.isDeleted ? null : (
              <Tooltip title="Delete">
                <Popconfirm
                  okText="Yes"
                  cancelText="No"
                  title="Are you sure to delete this parking lot?"
                  onConfirm={() => handleDelete(idParkingLot)}>
                  <Button danger icon={<DeleteOutlined />} />
                </Popconfirm>
              </Tooltip>
            )}
          </div>
        );
      },
    },
  ];

  const handleDelete = (id: string) => {
    parkingLotApi
      .delete(id)
      .then((res) => {
        const deleted: ParkingLot = res.data.data[0];
        const tmp = dataSource?.map((e) => (e.idParkingLot == deleted.idParkingLot ? deleted : e));
        setDataSource(tmp);
      })
      .catch((err) => console.log(err));
  };

  const onClickEdit = (data: ParkingLot) => {
    setIsVisible(true);
    setEditData(data);
    setIsTrigger(false);
  };
  return (
    <div>
      <h1>Parking lots</h1>
      <Card>
        <Row gutter={[20, 20]}>
          <Col span={8}>
            <Search
              className="full"
              size="large"
              placeholder="Search"
              allowClear
              enterButton
              // onSearch={(e) => handleSearch(e)}
            />
          </Col>
          <Col flex="auto" />
          <Col span={4}>
            <Button
              type="primary"
              size="large"
              block
              onClick={() => {
                setIsVisible(true);
                setIsTrigger(false);
                setEditData(undefined);
              }}>
              Add
            </Button>
          </Col>
          <Col span={24}>
            <Table<ParkingLot>
              bordered
              dataSource={dataSource}
              columns={columns}
              loading={isLoading}
              rowKey={(row) => row.idParkingLot}
            />
          </Col>
        </Row>
      </Card>
      <Modal
        centered
        closable
        visible={isVisible}
        title="Add parking lot"
        footer={null}
        afterClose={() => setEditData(undefined)}>
        <AddParkingLotsForm
          changeVisible={setIsVisible}
          trigger={setIsTrigger}
          editData={editData}
        />
      </Modal>
    </div>
  );
};

export default ParkingLots;
