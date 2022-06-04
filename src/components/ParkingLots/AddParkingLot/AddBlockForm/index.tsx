import { blockApi } from "@/api";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { isFulfilled } from "@reduxjs/toolkit";
import { Button, Col, Form, FormInstance, Input, InputNumber, message, Row, Space } from "antd";
import React, { useEffect, useState } from "react";

type Props = {
  form: FormInstance;
  idParkingLot: string | undefined;
};

const AddBlockForm = (props: Props) => {
  const [clickAdd, setClickAdd] = useState<number>(0);

  const SlotNumberValidator = (rule: any, value: any, callback: any) => {
    const index = rule.field.split(".")[1];
    const range = props.form.getFieldValue("blocks")[index];
    if (value != null && parseInt(range.from) > parseInt(range.to)) {
      callback("From <= to");
    } else {
      callback();
    }
  };

  const BlockCodeValidator = (rule: any, value: any, callback: any) => {
    const index = rule.field.split(".")[1];
    if (value != null) {
      const res = props.form
        .getFieldsValue()
        .blocks.find((x: any, i: number) => x.blockCode == value && i != index);
      if (res) callback("Block code is being duplicated!");
      else callback();
    } else {
      callback();
    }
  };

  return (
    <div>
      <Row gutter={[20, 20]}>
        <Col span={12} offset={12}>
          {clickAdd > 0 && <h4 className=" text-base ">Slot numbers</h4>}
        </Col>
      </Row>
      <Form.List name="blocks">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }: any) => (
              <Row key={key} gutter={[20, 20]}>
                <Col span={12}>
                  <Form.Item
                    label="Block code"
                    {...restField}
                    name={[name, "blockCode"]}
                    fieldKey={[fieldKey, "blockCode"]}
                    rules={[
                      { required: true, message: "Please input block code!" },
                      { validator: BlockCodeValidator },
                    ]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item
                    style={{ width: "120px" }}
                    {...restField}
                    name={[name, "from"]}
                    fieldKey={[fieldKey, "from"]}
                    label="From"
                    className="mr-5"
                    rules={[
                      { required: true, message: "Enter slot number!" },
                      { validator: SlotNumberValidator },
                    ]}>
                    <InputNumber min={0} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item
                    {...restField}
                    style={{ width: "120px" }}
                    name={[name, "to"]}
                    fieldKey={[fieldKey, "to"]}
                    label="To"
                    rules={[
                      { required: true, message: "Enter slot number!" },
                      { validator: SlotNumberValidator },
                    ]}>
                    <InputNumber min={0} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={2} className=" flex items-center">
                  <MinusCircleOutlined
                    className=" ml-5"
                    onClick={() => {
                      remove(name);
                      setClickAdd(clickAdd - 1);
                    }}
                  />
                </Col>
              </Row>
            ))}
            <Form.Item className="mt-5">
              <Button
                onClick={() => {
                  add();
                  setClickAdd(clickAdd + 1);
                }}
                block
                icon={<PlusOutlined />}
              />
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
};

export default AddBlockForm;
