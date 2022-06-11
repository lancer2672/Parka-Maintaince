import { FaParking } from "react-icons/fa";
import { HiViewGrid } from "react-icons/hi";
import { IoTicket } from "react-icons/io5";

const MenuItems = {
  routes: [
    {
      path: "/",
      name: "Dashboard",
      icon: (
        <span role="img" className="anticon">
          <HiViewGrid />
        </span>
      ),
    },
    {
      path: "/lots",
      name: "Parking lots",
      icon: (
        <span role="img" className="anticon">
          <FaParking />
        </span>
      ),
    },
    {
      path: "/bookings",
      name: "Bookings",
      icon: (
        <span role="img" className="anticon">
          <IoTicket />
        </span>
      ),
    },
  ],
};

export default MenuItems;
