import logo from "@/assets/images/logo.png";
import { LockTwoTone, MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, notification, Row } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.less";
import { useEffect, useState } from "react";

const SignUp = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = () => {
    setIsLoading(true);
    const { email, password, companyName, phoneNumber } = form.getFieldsValue();
    fetch("http://localhost:3001/company/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, companyName, phoneNumber, password }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((res) => {
        localStorage.setItem("COMPANY_ID", res.data?.id);
        console.log(res.data);
        notification.success({ message: "Sign up successfully!!" });
        setIsSuccess(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        notification.error({ message: "Fail!" });
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess]);

  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <Row justify="center">
          <Col xs={20} sm={12}>
            <Card>
              <div style={{ margin: "1.5rem 0" }}>
                <div style={{ textAlign: "center" }}>
                  <img src={logo} style={{ height: "5rem" }} />
                  <h2 className=" text-[24px] font-semibold">Sign up </h2>
                </div>
                <Row justify="center">
                  <Col span={24}></Col>
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <Form
                      form={form}
                      layout="vertical"
                      onFinish={handleSignUp}
                      // onFinishFailed={noticeFailed}
                      initialValues={{
                        remember: true,
                      }}>
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          { required: true, message: "Please input your email!" },
                          { type: "email", message: "Invalid email!" },
                        ]}>
                        <Input
                          size="large"
                          placeholder="Enter email"
                          prefix={<MailOutlined style={{ color: "#3e79f7" }} />}></Input>
                      </Form.Item>
                      <Form.Item
                        label="Company name"
                        name="companyName"
                        rules={[{ required: true, message: "Please input your company name!" }]}>
                        <Input
                          size="large"
                          placeholder="Enter company name"
                          prefix={<UserOutlined style={{ color: "#3e79f7" }} />}></Input>
                      </Form.Item>
                      <Form.Item
                        label="Phone number"
                        name="phoneNumber"
                        rules={[{ required: true, message: "Please input your phone number!" }]}>
                        <Input
                          size="large"
                          placeholder="Enter phone number"
                          prefix={<PhoneOutlined style={{ color: "#3e79f7" }} />}></Input>
                      </Form.Item>
                      <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                          { required: true, message: "Please input your password!" },
                          { min: 6, message: "Password must be minimum 6 characters." },
                        ]}>
                        <Input.Password
                          size="large"
                          placeholder="Password"
                          prefix={<LockTwoTone />}></Input.Password>
                      </Form.Item>
                      <Form.Item>
                        <Button
                          size="large"
                          type="primary"
                          block
                          htmlType="submit"
                          loading={isLoading}>
                          Sign up
                        </Button>
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SignUp;
