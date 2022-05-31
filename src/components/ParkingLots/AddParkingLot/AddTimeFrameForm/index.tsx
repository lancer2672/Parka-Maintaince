import React, { useEffect } from "react";
import "antd/dist/antd.css";
import { Form, Button, Space, TimePicker, Input, InputNumber, FormInstance, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { numberValidator } from "@/utils/validator";
import { timeFrameApi } from "@/api";

interface IProps {
  form: FormInstance;
  idParkingLot: string | undefined;
}

const TimeFrameForm = (props: IProps) => {
  const DurationValidator = (rule: any, value: any, callback: any) => {
    const index = rule.field.split(".")[1];
    if (value != null) {
      const res = props.form
        .getFieldsValue()
        .durations.find((x: any, i: number) => x.time == value && i != index);
      if (res) callback("Duration is being duplicated!");
      else callback();
    } else {
      callback();
    }
  };

  return (
    <div className=" overflow-y-scroll max-h-[300px]">
      <Form.List name="durations">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }: any) => (
              <Space key={key} align="baseline" className="flex px-10 justify-start items-center">
                <Form.Item
                  {...restField}
                  style={{ marginRight: "60px" }}
                  label="Duration"
                  name={[name, "time"]}
                  fieldKey={[fieldKey, "time"]}
                  className=""
                  rules={[
                    { required: true, message: "Please, enter duration." },
                    { validator: DurationValidator },
                  ]}>
                  <InputNumber
                    min={0}
                    maxLength={18}
                    step={100000}
                    addonAfter="minute"
                    placeholder="Duration"
                  />
                </Form.Item>
                <Form.Item
                  {...restField}
                  label="Price"
                  name={[name, "price"]}
                  fieldKey={[fieldKey, "price"]}
                  rules={[
                    { required: true, message: "Please, enter price." },
                    { validator: numberValidator },
                  ]}>
                  <InputNumber
                    min={0}
                    maxLength={18}
                    step={100000}
                    addonAfter="₫"
                    placeholder="Price"
                    formatter={(value: any) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  />
                </Form.Item>
                <MinusCircleOutlined className=" ml-10" onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item className="px-10 mt-5">
              <Button onClick={() => add()} block icon={<PlusOutlined />} />
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
};

export default TimeFrameForm;
