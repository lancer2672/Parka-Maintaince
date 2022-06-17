import { updateCompany } from "@/store/actions/authAction";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectAuth } from "@/store/selectors";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Col, Form, Input, message, notification, Row, Select } from "antd";
import { useState } from "react";

const { TextArea } = Input;
const { Option } = Select;

const EditProfile = () => {
  const [form] = Form.useForm();
  const companyState = useAppSelector(selectAuth).auth;
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const defaultFormValue = {
    companyName: companyState?.companyName,
    email: companyState?.email,
    phoneNumber: companyState?.phoneNumber,
  };

  const handleSubmit = () => {
    setIsLoading(true);
    const formData = form.getFieldsValue();
    dispatch(updateCompany({ idCompany: companyState?.idCompany, data: formData }))
      .then(unwrapResult)
      .then(() => {
        notification.success({
          message: "Successfully",
          description: `Updated successfully `,
        });
      })
      .catch((err) => {
        notification.error({
          message: "Error",
          description: err,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Form
      form={form}
      layout="vertical"
      labelAlign="left"
      onFinish={handleSubmit}
      initialValues={defaultFormValue}>
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
