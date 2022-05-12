import { FaParking } from "react-icons/fa";
import { HiViewGrid } from "react-icons/hi";

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
  ],
};

export default MenuItems;
