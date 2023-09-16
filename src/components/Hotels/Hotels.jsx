import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useHotel } from "../context/HotelProvider";

function Hotels() {
  const { hotels, isLoading, currentHotel } = useHotel();
  //   console.log(hotels);
  if (isLoading) <Loader />;

  return (
    <div className="searchList">
      <h2>Search Results - {hotels.length}</h2>
      {hotels.map((item) => {
        return (
          <Link
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            key={item.id}
          >
            <div
              className={`searchItem ${
                item.id === currentHotel.id ? "current-hotel" : ""
              }`}
            >
              <img src={item.picture_url.url} alt={item.name} />
              <div className="searchItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price">
                  €&nbsp;{item.price}&nbsp;
                  <span>per night</span>
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Hotels;
