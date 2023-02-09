import { Button, Col, Form, Input, Row, TimePicker, notification } from "antd";
import moment from "moment";
import { useEffect } from "react";

const { TextArea } = Input;

interface IProps {
  id: string | undefined;
}

const ParkingLotsForm = (props: IProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    if (props.id) {
      fetch(`http://localhost:8088/api/merchant/parking-lot/get-one/${props.id}`, {
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
          const tmp = res.data;
          form.setFieldsValue({
            name: tmp.name,
            address: tmp.address,
            lat: tmp.lat,
            long: tmp.long,
            description: tmp.description,
            startTime: moment(tmp.startTime, "HH:mm"),
            endTime: moment(tmp.endTime, "HH:mm"),
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [props.id]);

  const handleSubmit = () => {
    const idCompany = localStorage.getItem("COMPANY_ID");
    let { name, address, lat, long, description, startTime, endTime } = form.getFieldsValue();
    startTime = moment(startTime).subtract(20, "hours");
    endTime = moment(endTime).subtract(20, "hours");

    if (props.id) {
      fetch(`http://localhost:8088/api/v1/parking-lot/update/${props.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          address,
          lat: parseFloat(lat),
          long: parseFloat(long),
          description,
          startTime,
          endTime,
          companyID: idCompany,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(res);
        })
        .then((res) => {
          console.log(res.data);
          notification.success({ message: "success" });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      fetch(`http://localhost:8088/api/v1/parking-lot/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          address,
          lat: parseFloat(lat),
          long: parseFloat(long),
          description,
          startTime,
          endTime,
          companyID: idCompany,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(res);
        })
        .then((res) => {
          console.log(res.data);
          notification.success({ message: "success" });
        })
        .catch((error) => {
          console.log(error);
        });
      form.resetFields();
    }
  };
  return (
    <div>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input parking lot name!" }]}>
          <Input />
        </Form.Item>
        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item
              label="Start time"
              name="startTime"
              rules={[{ required: true, message: "Please input start time!" }]}>
              <TimePicker format={"HH:mm"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="End time"
              name="endTime"
              rules={[{ required: true, message: "Please input end time!" }]}>
              <TimePicker format={"HH:mm"} />
            </Form.Item>
          </Col>
        </Row>
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
        <Form.Item>
          <Button block type="primary" size="large" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ParkingLotsForm;
