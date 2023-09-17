import ReactCountryFlag from "react-country-flag";
import Loader from "../Loader/Loader";
import { useBookmark } from "../context/BookmarkProvider";
import { Link } from "react-router-dom";

function Bookmark() {
  const { bookmarks, isLoading, currentBookmark } = useBookmark();
  //   console.log(bookmarks);
  if (isLoading) <Loader />;
  return (
    <div className="">
      <h2>Bookmark Results - {bookmarks.length}</h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`/bookmark/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`bookmarkItem ${
                  item.id === currentBookmark.id ? "current-bookmark" : ""
                }`}
              >
                <ReactCountryFlag countryCode={item.countryCode} svg />
                &nbsp;<strong>{item.cityName}</strong>&nbsp;
                <span>{item.country}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Bookmark;
