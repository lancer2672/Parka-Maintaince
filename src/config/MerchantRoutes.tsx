import AboutPage from "@/pages/AboutPage";
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
];

export default MerchantRoutes;
