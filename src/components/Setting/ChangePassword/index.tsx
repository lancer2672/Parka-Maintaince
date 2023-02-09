import { Button, Col, Form, Input, notification, Row } from "antd";
import { useState } from "react";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    const { currentPassword, newPassword, confirmPassword } = form.getFieldsValue();
    if (newPassword != confirmPassword) {
      notification["error"]({
        message: "Error",
        description: `The confirm password must be the same as the new password `,
      });
      setLoading(false);
      return;
    }
    if (currentPassword == newPassword) {
      notification["error"]({
        message: "Error",
        description: `The new password must be different from the current password `,
      });
      setLoading(false);
      return;
    }

    let idCompany = localStorage.getItem("COMPANY_ID");
    fetch(`http://localhost:8088/api/merchant/company/update-password/${idCompany}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ old: currentPassword, new: newPassword }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((res) => {
        console.log(res.data);
        notification["success"]({
          message: "Successfully",
          description: `Updated successfully `,
        });
        form.resetFields();
      })
      .catch((error) => {
        console.log(error);
      });

    setLoading(false);
  };
  return (
    <Form layout="vertical" onFinish={handleSubmit} form={form}>
      <Row>
        <Col xs={24} sm={24} md={10}>
          <Form.Item
            label="Current password"
            name="currentPassword"
            rules={[
              { required: true, message: "Please input your current password!" },
              { min: 6, message: "Password must be minimum 6 characters." },
            ]}>
            <Input.Password />
          </Form.Item>
        </Col>
        <Col md={12} />
        <Col xs={24} sm={24} md={10}>
          <Form.Item
            label="New password"
            name="newPassword"
            rules={[
              { required: true, message: "Please input new password!" },
              { min: 6, message: "Password must be minimum 6 characters." },
            ]}>
            <Input.Password />
          </Form.Item>
        </Col>
        <Col md={12} />
        <Col xs={24} sm={24} md={10}>
          <Form.Item
            label="Confirm password"
            name="confirmPassword"
            rules={[
              { required: true, message: "Please input confirm password!" },
              { min: 6, message: "Password must be minimum 6 characters." },
            ]}>
            <Input.Password />
          </Form.Item>
        </Col>
        <Col md={12} />
        <Col xs={24} sm={24} md={10}>
          <Button block type="primary" htmlType="submit" size="large" loading={loading}>
            Change password
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ChangePassword;
