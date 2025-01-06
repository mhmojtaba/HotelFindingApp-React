import { useParams } from "react-router-dom";
import { useBookmark } from "../context/BookmarkProvider";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";
import BackButton from "../BackButton/BackButton";

function SingleBookmark() {
  const currentData = [];

  const { id } = useParams();
  const {
    getCurrentBookmark,
    isCurrentBookmarkLoading: isLoading,
    currentBookmark,
  } = useBookmark();

  const { data, isLoading: Loading } = useFetch(
    "http://localhost:5000/hotels",
    ""
  );

  const getCurrentData = (id) => {
    console.log(data.filter((item) => item.id === id));
    currentData.push(data.filter((item) => item.id === id));
  };
  //   console.log(currentBookmark);
  useEffect(() => {
    getCurrentBookmark(id);
    if (Object.keys(currentBookmark).length === 0) getCurrentData(id);
  }, [id]);

  console.log(currentData);

  if (isLoading || Loading) <Loader />;
  return (
    <div>
      <div>
        <div>
          <BackButton />
          <h2>{currentBookmark.name}</h2>
          <div>
            <ReactCountryFlag countryCode={currentBookmark.countryCode} svg />
            &nbsp;<strong>{currentBookmark.cityName}</strong>&nbsp;
            <span>{currentBookmark.country}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleBookmark;
