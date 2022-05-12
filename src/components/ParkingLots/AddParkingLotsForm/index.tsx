import { createParkingLot, updateParkingLot } from "@/store/actions/parkingLotActions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectAuth, selectParkingLot } from "@/store/selectors";
import { ParkingLot } from "@/types";
import { Button, Col, Form, Input, message, Row } from "antd";
import { useEffect } from "react";
const { TextArea } = Input;

interface IProps {
  changeVisible: Function;
  editData: ParkingLot | undefined;
}

const AddParkingLotsForm = (props: IProps) => {
  const [form] = Form.useForm();
  const authState = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const parkingLotState = useAppSelector(selectParkingLot);

  const handleSubmit = () => {
    const formValues = { ...form.getFieldsValue(), idCompany: authState.auth?.idCompany };
    if (props.editData) {
      const edited = { ...formValues, idParkingLot: props.editData.idParkingLot };
      dispatch(updateParkingLot(edited));
    } else {
      dispatch(createParkingLot(formValues));
    }
    props.changeVisible(false);
    form.resetFields();
  };

  useEffect(() => {
    message.error(parkingLotState.error);
  }, [parkingLotState.error]);

  useEffect(() => {
    const tmp = props.editData;
    if (tmp) {
      form.setFieldsValue({
        name: tmp.name,
        address: tmp.address,
        lat: tmp.lat,
        long: tmp.long,
        description: tmp.description,
      });
    } else {
      form.resetFields();
    }
  }, [props.editData]);
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
      <Form.Item>
        <Button block size="large" type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddParkingLotsForm;
