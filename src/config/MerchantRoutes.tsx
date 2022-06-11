import AboutPage from "@/pages/AboutPage";
import Bookings from "@/pages/Bookings";
import Dashboard from "@/pages/Dashboard";
import ParkingLots from "@/pages/ParkingLots";
import ParkingLotDetails from "@/pages/ParkingLots/ParkingLotDetails";

interface IRoute {
  path: string;
  page: JSX.Element;
}

const MerchantRoutes: IRoute[] = [
  {
    path: "/",
    page: <Dashboard />,
  },
  {
    path: "/about",
    page: <AboutPage />,
  },
  {
    path: "/lots",
    page: <ParkingLots />,
  },
  {
    path: "/lots/:id",
    page: <ParkingLotDetails />,
  },
  {
    path: "/bookings",
    page: <Bookings />,
  },
];

export default MerchantRoutes;