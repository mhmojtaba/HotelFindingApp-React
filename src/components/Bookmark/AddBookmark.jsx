import { useNavigate } from "react-router-dom";
import useUrlLatLng from "../../hooks/useUrlLatLng";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../context/BookmarkProvider";

const BASE_URL_REVERSEGEOCODE =
  "https://api.bigdatacloud.net/data/reverse-geocode";

function AddBookmark() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlLatLng();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { postNewBookmark } = useBookmark();

  // fetching data based on lat and lng queries from url to get the data from bigdata api
  useEffect(() => {
    if (!lat || !lng) return;
    async function getDataLocation() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `${BASE_URL_REVERSEGEOCODE}?latitude=${lat}&longitude=${lng}`
        );
        if (!data.countryCode)
          throw new Error("wrong Location. please select a city!!");
        setIsLoading(false);
        setCityName(data.city || "");
        setCountry(data.country || "");
        setCountryCode(data.countryCode || "");
      } catch (err) {
        setError(err.message);
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    getDataLocation();
  }, [lat, lng]);
  // console.log([lat, lng]);

  const handleAddBookmark = async (e) => {
    e.preventDefault();
    if (!cityName || !country) return;
    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + " " + country,
    };
    const { data } = await postNewBookmark(newBookmark);
    // console.log(data);
    navigate("/bookmark");
  };

  if (isLoading) return <Loader />;
  return (
    <div>
      <h2>Add a bookmark</h2>
      <form className="form" onSubmit={handleAddBookmark}>
        <div className="formControl">
          <label htmlFor="cityName">CityName</label>
          <input
            type="text"
            name="cityName"
            id="cityName"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <ReactCountryFlag className="flag" svg countryCode={countryCode} />
        </div>
        <div className="buttons">
          <button
            className="btn btn--back"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            &larr; Back
          </button>
          <button className="btn btn--primary">Add &rarr;</button>
        </div>
      </form>
    </div>
  );
}

export default AddBookmark;
