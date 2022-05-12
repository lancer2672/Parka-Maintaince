import logo from "@/assets/images/logo.png";
import { login } from "@/store/actions/authAction";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectAuth } from "@/store/selectors";
import { LockTwoTone, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row } from "antd";
import { Link, Navigate } from "react-router-dom";
import styles from "./index.module.less";

const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuth);

  const handleLogin = () => {
    const { email, password } = form.getFieldsValue();
    dispatch(login({ email, password }));
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
                  <p>Welcom to Parka merchant!</p>
                </div>
                <Row justify="center">
                  <Col span={24}></Col>
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <Form
                      form={form}
                      layout="vertical"
                      onFinish={handleLogin}
                      // onFinishFailed={noticeFailed}
                      initialValues={{
                        remember: true,
                      }}>
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Please input your email!" }]}>
                        <Input
                          size="large"
                          placeholder="Email"
                          prefix={<UserOutlined style={{ color: "#3e79f7" }} />}></Input>
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
                        <Link to={`./forgot-password`}>
                          <Button className={styles["btn-forgot"]} type="link">
                            Forgot password?
                          </Button>
                        </Link>
                      </Form.Item>
                      <Form.Item>
                        <Button
                          size="large"
                          type="primary"
                          block
                          htmlType="submit"
                          loading={authState.loading}>
                          Login
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

export default Login;
