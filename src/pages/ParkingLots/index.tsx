import { parkingLotApi } from "@/api";
import AddParkingLotsForm from "@/components/ParkingLots/AddParkingLotsForm";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ParkingLot } from "@/types";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Card, Col, Modal, Popconfirm, Row, Table, Tag, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import Search from "antd/lib/input/Search";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/store";
import { deleteParkingLot, getAllParkingLots } from "@/store/actions/parkingLotActions";
import { parkingLotState$ } from "@/store/selectors";

const ParkingLots: FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<Array<ParkingLot>>();

  const dispatch = useAppDispatch();
  const parkingLotState = useAppSelector(parkingLotState$);

  const columns: ColumnsType<ParkingLot> = [
    {
      title: "Parking lot name",
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
      width: "10%",
      render: (idParkingLot: string, parkingLot) => {
        return (
          <div className="flex gap-2.5 justify-start flex-col md:flex-row">
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
    dispatch(deleteParkingLot(id));
  };

  const handleSearch = (value: string) => {
    if (value) {
      const tmp = parkingLotState.parkingLots.filter(
        (e) => e.name.toLowerCase().search(value.toLowerCase()) >= 0,
      );
      setDataSource(tmp);
    } else {
      setDataSource(parkingLotState.parkingLots);
    }
  };

  useEffect(() => {
    dispatch(getAllParkingLots("93471ac5-0cc1-4c77-8f0f-a9af3b1a7655"));
  }, [dispatch]);

  useEffect(() => {
    setDataSource(parkingLotState.parkingLots);
  }, [parkingLotState.parkingLots]);

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
              onSearch={(e) => handleSearch(e)}
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
              }}>
              Add
            </Button>
          </Col>
          <Col span={24}>
            <Table<ParkingLot>
              bordered
              dataSource={dataSource}
              columns={columns}
              loading={parkingLotState.loading}
              rowKey={(row) => row.idParkingLot}
            />
          </Col>
        </Row>
      </Card>
      <Modal centered closable visible={isVisible} title="Add parking lot" footer={null}>
        <AddParkingLotsForm changeVisible={setIsVisible} />
      </Modal>
    </div>
  );
};

export default ParkingLots;
