import logo from "@/assets/images/logo.png";
import { signup } from "@/store/actions/authAction";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectAuth } from "@/store/selectors";
import { LockTwoTone, MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, notification, Row } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./index.module.less";

const SignUp = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authState = useAppSelector(selectAuth);

  const handleSignUp = async () => {
    const { email, password, companyName, phoneNumber } = form.getFieldsValue();
    const res = await dispatch(signup({ email, password, companyName, phoneNumber })).unwrap();
    if (res) {
      notification.success({ message: "Sign up successfully!!" });
    } else {
      notification.error({ message: "Fail!" });
      navigate(-1);
    }
  };

  if (authState.auth) {
    return <Navigate to="/" replace />;
  }

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
                          loading={authState.loading}>
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
