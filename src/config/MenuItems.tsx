import { FaParking } from "react-icons/fa";
import { HiCog } from "react-icons/hi";
import { IoTicket } from "react-icons/io5";

const MenuItems = {
  routes: [
    // {
    //   path: "/",
    //   name: "Dashboard",
    //   icon: (
    //     <span role="img" className="anticon">
    //       <HiViewGrid />
    //     </span>
    //   ),
    // },
    {
      path: "/parking-lot",
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
    {
      path: "/setting",
      name: "Setting",
      icon: (
        <span role="img" className="anticon">
          <HiCog />
        </span>
      ),
    },
  ],
};

export default MenuItems;
