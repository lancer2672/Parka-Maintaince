import { parkingLotApi } from "@/api";
import { ParkingLot } from "@/types";
import { Button, Col, Form, Input, Row } from "antd";
import { useEffect, useState } from "react";
const { TextArea } = Input;

interface Props {
  changeVisible: Function;
}

const AddParkingLotsForm = (props: Props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState<ParkingLot>();
  const handleSubmit = () => {
    const tmp = { ...form.getFieldsValue(), idCompany: "93471ac5-0cc1-4c77-8f0f-a9af3b1a7655" };
    if (data) {
      console.log({ data });
      parkingLotApi
        .update(data.idParkingLot, tmp)
        .then((res) => {
          props.changeVisible(false);
        })
        .catch((err) => console.log(err));
    } else {
      console.log({ data });
      parkingLotApi
        .create(tmp)
        .then((res) => {
          props.changeVisible(false);
        })
        .catch((err) => console.log(err));
    }
    form.resetFields();
  };

  // useEffect(() => {
  //   const tmp = props.editData;
  //   if (tmp) {
  //     setData(tmp);
  //     form.setFieldsValue({
  //       name: tmp.name,
  //       address: tmp.address,
  //       lat: tmp.lat,
  //       long: tmp.long,
  //       description: tmp.description,
  //     });
  //   } else {
  //     form.resetFields();
  //   }
  // }, [props.editData]);
  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input parking lot name!" }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: "Please input address!" }]}>
        <TextArea rows={2} />
      </Form.Item>
      <Row gutter={[20, 0]}>
        <Col span={12}>
          <Form.Item
            label="Lat"
            name="lat"
            rules={[{ required: true, message: "Please input lat!" }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Long"
            name="long"
            rules={[{ required: true, message: "Please input long!" }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Description" name="description">
        <TextArea rows={2} />
      </Form.Item>
      <Row gutter={[20, 0]}>
        <Col span={6}>
          <Button block size="large" type="default" onClick={() => props.changeVisible(false)}>
            Cancel
          </Button>
        </Col>
        <Col span={18}>
          <Form.Item>
            <Button block size="large" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AddParkingLotsForm;
