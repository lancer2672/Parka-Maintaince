import { blockApi, timeFrameApi } from "@/api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { parkingLotActions } from "@/store/reducers/parkingLotSlice";
import { selectAuth } from "@/store/selectors";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Form, message, Modal, Steps } from "antd";
import React, { useState } from "react";
import AddBlockForm from "./AddBlockForm";
import ParkingLotsForm from "./AddParkingLotsForm";
import TimeFrameForm from "./AddTimeFrameForm";
import styles from "./index.module.less";

const { Step } = Steps;
interface IProps {
  editData: ParkingLot | undefined;
  isVisible: boolean;
  onCancel: Function;
}

const AddParkingLot = (props: IProps) => {
  const authState = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const steps = [
    {
      title: `${props.editData ? "Change paring lot" : "Add parking lot"}`,
      description: "Enter information of your parking",
      content: <ParkingLotsForm form={form} editData={props.editData} />,
    },
    {
      title: "Set up block",
      description: "",
      content: <AddBlockForm form={form} idParkingLot={props.editData?.idParkingLot} />,
    },
    {
      title: "Set up time and price",
      description: "",
      content: <TimeFrameForm form={form} idParkingLot={props.editData?.idParkingLot} />,
    },
    {
      title: "Submit",
      description: "",
      content: (
        <div className=" text-xl text-center">
          <QuestionCircleOutlined
            style={{ fontSize: "40px", color: "#08c", marginBottom: "10px" }}
          />
          <h3>Are you sure about your parking information?</h3>
        </div>
      ),
    },
  ];

  const handleSubmit = () => {
    if (!props.editData) {
      handleAdd();
    } else {
      handleUpdate();
    }
  };

  const handleAdd = async () => {
    setIsLoading(true);
    try {
      const data = form.getFieldValue;
      if (current == 0) {
        setCurrent(current + 1);
      } else if (current == 1 && data("blocks")) {
        setCurrent(current + 1);
      } else if (current == 2 && data("durations")) {
        setCurrent(current + 1);
      } else if (current == 3) {
        const parkingLot = {
          name: data("name"),
          address: data("address"),
          description: data("description") ?? "",
          long: data("long"),
          lat: data("lat"),
          idCompany: authState.auth?.idCompany,
        };
        //add parking lot
        const newParkingLot = await dispatch(
          parkingLotActions.createParkingLot(parkingLot),
        ).unwrap();

        if (!newParkingLot) {
          setIsLoading(false);
          message.error("You have failed. Please try again");
        }

        //add block and slot
        const blocks = data("blocks").map((e: any) => {
          return {
            ...e,
            numOfSlot: e.to - e.from + 1,
            idParkingLot: newParkingLot.idParkingLot,
          };
        });
        const res = await blockApi.create(blocks);
        if (!res.data.data) {
          message.error("You have failed. Please try again");
        }
        //add time frame
        const timeFrames = data("durations").map((e: any) => {
          return {
            duration: e.time,
            cost: e.price,
            idParkingLot: newParkingLot.idParkingLot,
          };
        });

        const newTimeFrames = await timeFrameApi.create(timeFrames);
        if (newTimeFrames.data.data) {
          message.success("You have successfully added a new parking lot.");
        } else {
          message.error("You have failed. Please try again");
        }
        setIsLoading(false);
        props.onCancel();
        form.resetFields();
        setCurrent(0);
      }
    } catch (error) {
      message.error(`${error}`);
    }
    setIsLoading(false);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const data = form.getFieldValue;
      if (current == 0) {
        //load block, when click next
        const blocks = form.getFieldValue("blocks");
        if (!blocks) {
          const res = await blockApi.getAll(props.editData?.idParkingLot);
          if (res.data.data) {
            const blocks = res.data.data.map((e: Block) => {
              return {
                blockCode: e.blockCode,
                from: e.ParkingSlots[0].slotNumber,
                to: e.ParkingSlots[e.ParkingSlots.length - 1].slotNumber,
              };
            });
            form.setFieldsValue({ blocks });
          }
        }
        setCurrent(current + 1);
      } else if (current == 1 && data("blocks").length > 0) {
        //load timeframe, when click next
        const durations = form.getFieldValue("durations");
        if (!durations) {
          const res = await timeFrameApi.getAll(props.editData?.idParkingLot);
          if (res.data.data) {
            const durations = res.data.data.map((e: TimeFrame) => {
              return {
                time: e.duration,
                price: e.cost,
              };
            });
            form.setFieldsValue({ durations });
          }
        }
        setCurrent(current + 1);
      } else if (current == 2 && data("durations").length > 0) {
        setCurrent(current + 1);
      } else if (current == 3) {
        const parkingLot: ParkingLot = {
          name: data("name"),
          address: data("address"),
          description: data("description") ?? "",
          long: data("long"),
          lat: data("lat"),
          idParkingLot: props.editData?.idParkingLot ?? "",
          isDeleted: false,
          idCompany: authState.auth?.idCompany ?? "",
        };
        //update parking lot
        const isUpdated = await dispatch(parkingLotActions.updateParkingLot(parkingLot)).unwrap();

        if (!isUpdated) {
          setIsLoading(false);
          message.error("You have failed. Please try again");
        }

        //update block and slot
        const blocks = data("blocks").map((e: any) => {
          return {
            ...e,
            numOfSlot: e.to - e.from + 1,
            idParkingLot: props.editData?.idParkingLot,
          };
        });
        const res = await blockApi.update(props.editData?.idParkingLot, blocks);
        if (!res.data.data) {
          message.error("You have failed. Please try again");
        }
        //update time frame
        const timeFrames = data("durations").map((e: any) => {
          return {
            duration: e.time,
            cost: e.price,
            idParkingLot: props.editData?.idParkingLot,
          };
        });

        const updatedTimeFrames = await timeFrameApi.update(
          props.editData?.idParkingLot,
          timeFrames,
        );
        if (updatedTimeFrames.data.data) {
          message.success("You have successfully updated this parking lot.");
        } else {
          message.error("You have failed. Please try again");
        }
        setIsLoading(false);
        props.onCancel();
        form.resetFields();
        setCurrent(0);
      }
    } catch (error) {
      message.error(`${error}`);
    }
    setIsLoading(false);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <Modal
      title={props.editData ? "Update paring lot" : "Add parking lot"}
      centered
      closable
      width={800}
      footer={null}
      visible={props.isVisible}
      onCancel={() => {
        props.onCancel();
        form.resetFields();
        setCurrent(0);
      }}>
      <div className=" px-5">
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} description={item.description} />
          ))}
        </Steps>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div className={styles["steps-content"]}>{steps[current].content}</div>
          <div className={styles["steps-action"]}>
            {current > 0 && (
              <Button className=" w-[100px] mx-2" onClick={() => prev()}>
                Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              <Form.Item>
                <Button className=" w-[100px]" type="primary" htmlType="submit" loading={isLoading}>
                  Next
                </Button>
              </Form.Item>
            )}
            {current === steps.length - 1 && (
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  Submit
                </Button>
              </Form.Item>
            )}
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddParkingLot;
