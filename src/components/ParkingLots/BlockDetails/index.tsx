import { Block } from "@/types";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Row,
  Table,
  Tooltip,
} from "antd";
import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { blockApi } from "@/api";

const BlockDetails = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [data, setData] = useState<Array<Block>>();
  const [form] = Form.useForm();

  const columns: ColumnsType<Block> = [
    {
      title: "ID",
      dataIndex: "idBlock",
      align: "center",
    },
    {
      title: "Block code",
      dataIndex: "blockCode",
      align: "center",
    },
    {
      title: "",
      dataIndex: "idBlock",
      align: "center",
      render: (idBlock: string, block) => (
        <div style={{ display: "flex", justifyContent: "flex-start", gap: "10px" }}>
          <Tooltip title="Edit">
            <Button type="default" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              okText="Yes"
              cancelText="No"
              title="Are you sure to delete this parking lot?"
              onConfirm={() => {}}>
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  useEffect(() => {
    blockApi
      .getAll()
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = () => {
    console.log(form.getFieldsValue());
  };
  return (
    <Row gutter={[20, 20]}>
      <Col span={12}>
        <h3>Blocks</h3>
      </Col>
      <Col flex="auto" />
      <Col>
        <Button type="primary" onClick={() => setIsVisible(true)}>
          Add
        </Button>
      </Col>
      <Col span={24}>
        <Card>
          <Table<Block>
            bordered
            columns={columns}
            dataSource={data}
            rowKey={(row) => row.idBlock}
          />
        </Card>
      </Col>
      <Modal
        title="Add block"
        visible={isVisible}
        onCancel={() => setIsVisible(false)}
        footer={
          <>
            <Button type="default" onClick={() => setIsVisible(false)}>
              Cancel
            </Button>
            <Button htmlType="submit" type="primary" onClick={form.submit}>
              Submit
            </Button>
          </>
        }>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Block code"
            name="blockCode"
            rules={[{ required: true, message: "Please input block code!" }]}>
            <Input />
          </Form.Item>
          <h4>Slot numbers</h4>
          <Row gutter={[20, 20]}>
            <Col span={8}>
              <Form.Item
                label="From"
                name="from"
                rules={[{ required: true, message: "Please input slot number!" }]}>
                <InputNumber min={0} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="To"
                name="to"
                rules={[{ required: true, message: "Please input slot number!" }]}>
                <InputNumber min={0} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Step"
                name="step"
                rules={[{ required: true, message: "Please input slot number step!" }]}>
                <InputNumber min={0} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </Row>
  );
};

export default BlockDetails;
