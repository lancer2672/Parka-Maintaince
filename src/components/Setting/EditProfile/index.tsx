import { useAppDispatch } from "@/store/hooks";
import { Button, Col, Form, Input, Row, notification } from "antd";
import { useEffect, useState } from "react";

const EditProfile = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let idCompany = localStorage.getItem("COMPANY_ID");
    fetch(`http://localhost:3001/company/get-one/${idCompany}`, {
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
        form.setFieldsValue({
          companyName: res.data?.name,
          email: res.data?.email,
          phoneNumber: res.data?.phoneNumber,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const handleSubmit = () => {
    let idCompany = localStorage.getItem("COMPANY_ID");
    let { companyName, email, phoneNumber } = form.getFieldsValue();
    fetch(`http://localhost:3001/company/update/${idCompany}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ companyName, email, phoneNumber }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((res) => {
        console.log(res.data);
        notification.success({ message: "Successfully!" });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  return (
    <Form form={form} layout="vertical" labelAlign="left" onFinish={handleSubmit}>
      <Row gutter={[20, 0]}>
        <Col span={14}>
          <Form.Item name="companyName" label="Company name" rules={[{ required: true }]}>
            <Input placeholder="Company name" />
          </Form.Item>
        </Col>
        <Col span={14}>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input placeholder="Email" />
          </Form.Item>
        </Col>
        <Col span={14}>
          <Form.Item name="phoneNumber" label="Phone number" rules={[{ required: true }]}>
            <Input placeholder="Phone number" />
          </Form.Item>
        </Col>
        <Col span={14}>
          <Form.Item>
            <Button type="primary" block size="large" htmlType="submit" loading={isLoading}>
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default EditProfile;
