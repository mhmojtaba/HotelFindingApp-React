import { Outlet } from "react-router-dom";
import MapComponent from "../Map/MapComponent";
import { useHotel } from "../context/HotelProvider";

function HotelLayout() {
  const { hotels, isLoading } = useHotel();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>

      <MapComponent markerPosition={hotels} isMapLoading={isLoading} />
    </div>
  );
}

export default HotelLayout;
