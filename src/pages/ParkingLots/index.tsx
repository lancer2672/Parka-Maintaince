import AddParkingLot from "@/components/ParkingLots/AddParkingLot";
import ParkingLotsForm from "@/components/ParkingLots/AddParkingLot/AddParkingLotsForm";
import { deleteParkingLot } from "@/store/actions/parkingLotActions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { parkingLotActions } from "@/store/reducers/parkingLotSlice";
import { selectAuth, selectParkingLot } from "@/store/selectors";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Card, Col, Modal, Popconfirm, Row, Table, Tag, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import Search from "antd/lib/input/Search";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ParkingLots: FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<Array<ParkingLot>>();
  const [idParkingLot, setIdParkingLot] = useState<string>();
  const dispatch = useAppDispatch();
  const parkingLotState = useAppSelector(selectParkingLot);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      dataIndex: "id",
      align: "center",
      width: "10%",
      render: (id: string, parkingLot) => {
        return (
          <div className="flex gap-2.5 justify-start flex-col md:flex-row">
            <Tooltip title="View details">
              <Button
                type="primary"
                ghost
                icon={<EyeOutlined />}
                onClick={() => navigate(`/parking-lot/${id}`, { state: parkingLot })}
              />
            </Tooltip>
            <Tooltip title="Edit">
              <Button
                type="default"
                icon={<EditOutlined />}
                onClick={() => {
                  setIsVisible(true);
                  setIdParkingLot(id);
                }}
              />
            </Tooltip>
            {parkingLot.isDeleted ? null : (
              <Tooltip title="Delete">
                <Popconfirm
                  okText="Yes"
                  cancelText="No"
                  title="Are you sure to delete this parking lot?"
                  //   onConfirm={() => handleDelete(id)}
                >
                  <Button danger icon={<DeleteOutlined />} />
                </Popconfirm>
              </Tooltip>
            )}
          </div>
        );
      },
    },
  ];

  //   const handleDelete = (id: string) => {
  //     dispatch(deleteParkingLot(id));
  //   };

  //   const handleEdit = (parkingLot: ParkingLot) => {
  //     setIsVisible(true);
  //     setEditData(parkingLot);
  //   };

  //   const handleSearch = (value: string) => {
  //     if (value) {
  //       const tmp = parkingLotState.parkingLots.filter(
  //         (e) => e.name.toLowerCase().search(value.toLowerCase()) >= 0,
  //       );
  //       setDataSource(tmp);
  //     } else {
  //       setDataSource(parkingLotState.parkingLots);
  //     }
  //   };

  //   useEffect(() => {
  //     const idCompany = authState.auth?.idCompany;
  //     dispatch(parkingLotActions.getAllParkingLots(idCompany));
  //   }, [dispatch]);

  //   useEffect(() => {
  //     setDataSource(parkingLotState.parkingLots);
  //   }, [parkingLotState.parkingLots]);

  useEffect(() => {
    let idCompany = localStorage.getItem("COMPANY_ID");
    fetch(`http://localhost:3001/parking-lot/get-list?company_id=${idCompany}`, {
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
        setDataSource(res.data);
        setIsSuccess(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

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
              //   onSearch={(e) => handleSearch(e)}
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
                setIdParkingLot(undefined);
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
              rowKey={(row) => row.id}
            />
          </Col>
        </Row>
      </Card>
      <Modal
        title={idParkingLot ? "Update paring lot" : "Add parking lot"}
        centered
        closable
        width={800}
        visible={isVisible}
        footer={null}
        onCancel={() => setIsVisible(false)}>
        <ParkingLotsForm id={idParkingLot} />
      </Modal>
    </div>
  );
};

export default ParkingLots;
