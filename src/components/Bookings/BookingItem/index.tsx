import { CurrencyHelper } from "@/utils";
import { Tag } from "antd";
import dayjs from "dayjs";

type Props = {
  reservation: Reservation;
};

const Item = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex flex-row gap-2 justify-start">
      <p className="my-0 font-semibold text-slate-400">{title}</p>
      <p className="my-0">{value}</p>
    </div>
  );
};

const renderTag = (status: string) => {
  switch (status) {
    case "scheduled":
      return <Tag color="gold">Scheduled</Tag>;
    case "ongoing":
      return <Tag color="green">Ongoing</Tag>;
    default:
      return <Tag color="magenta">End </Tag>;
  }
};
const BookingItem = ({ reservation }: Props) => {
  return (
    <div className="border border-slate-300 rounded-lg border-solid p-4">
      <div className="flex flex-row justify-between items-start">
        <h5 className="font-semibold text-base">
          {reservation?.ParkingSlot?.Block?.ParkingLot?.name}
        </h5>
        {renderTag(reservation.status)}
      </div>
      <Item
        title="Slot:"
        value={`${reservation?.ParkingSlot?.Block?.blockCode} - ${reservation?.ParkingSlot?.slotNumber}`}
      />
      <Item title="Date:" value={dayjs(reservation.bookingDate).format("DD/MM/YYYY")} />
      <Item title="Start time:" value={reservation.startTime} />
      <Item title="End time:" value={reservation.endTime} />
      <Item title="Total:" value={CurrencyHelper.formatVND(reservation.total)} />
    </div>
  );
};

export default BookingItem;
