import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";

function LocationList() {
  const { data, isLoading } = useFetch("http://localhost:5000/hotels", "");
  // console.log(data);
  if (isLoading) <Loader />;

  return (
    <div className="nearbyLocation">
      <h2>nearby Location</h2>
      <div className="locationList">
        {data.map((item) => {
          return (
            <Link
              key={item.id}
              to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div className="locationItem" key={item.id}>
                <img src={item.picture_url.url} alt={item.name} />
                <div className="locationItemDesc">
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
    </div>
  );
}

export default LocationList;
