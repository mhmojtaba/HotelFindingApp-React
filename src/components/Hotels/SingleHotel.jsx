import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useEffect } from "react";
import { useHotel } from "../context/HotelProvider";
import BackButton from "../BackButton/BackButton";

function SingleHotel() {
  const { id } = useParams();

  const {
    isCurrentHotelLoading,
    currentHotel: hotel,
    getCurrentHotel,
  } = useHotel();

  useEffect(() => {
    getCurrentHotel(id);
  }, [id, getCurrentHotel]);

  if (isCurrentHotelLoading) <Loader />;
  return (
    <>
      <BackButton />
      <div className="room">
        <div className="roomDetail">
          <h2>{hotel.name}</h2>
          <div>
            {hotel.number_of_reviews} reviews &bull; {hotel.smart_location}
            <img src={hotel.xl_picture_url} alt={hotel.name} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleHotel;
