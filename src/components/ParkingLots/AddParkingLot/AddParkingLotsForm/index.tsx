import { createParkingLot, updateParkingLot } from "@/store/actions/parkingLotActions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectAuth, selectParkingLot } from "@/store/selectors";
import { Button, Col, Form, Input, message, Row } from "antd";
import { useEffect } from "react";

const { TextArea } = Input;

interface IProps {
  editData: ParkingLot | undefined;
  form: any;
}

const ParkingLotsForm = (props: IProps) => {
  const parkingLotState = useAppSelector(selectParkingLot);

  const ParkingLotNamValidator = (rule: any, value: any, callback: any) => {
    if (value != null) {
      const isExist = parkingLotState.parkingLots.find((e) => e.name == value);
      if (isExist && value != props.editData?.name) {
        callback("This name is already in use!");
      } else {
        callback();
      }
    } else {
      callback();
    }
  };
  // useEffect(() => {
  //   message.error(parkingLotState.error);
  // }, [parkingLotState.error]);

  useEffect(() => {
    const tmp = props.editData;
    if (tmp) {
      props.form.setFieldsValue({
        name: tmp.name,
        address: tmp.address,
        lat: tmp.lat,
        long: tmp.long,
        description: tmp.description,
      });
    }
  }, [props.editData]);

  return (
    <div>
      <Form.Item
        label="Name"
        name="name"
        rules={[
          { required: true, message: "Please input parking lot name!" },
          { validator: ParkingLotNamValidator },
        ]}>
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
    </div>
  );
};

export default ParkingLotsForm;
