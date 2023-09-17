import ReactCountryFlag from "react-country-flag";
import Loader from "../Loader/Loader";
import { useBookmark } from "../context/BookmarkProvider";
import { Link } from "react-router-dom";
import { HiTrash } from "react-icons/hi";

function Bookmark() {
  const { bookmarks, isLoading, currentBookmark, deleteBookmark } =
    useBookmark();

  // useEffect(() => {
  //   getBookmarks();
  // }, []);

  const deleteHandler = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };

  if (isLoading) <Loader />;
  if (!bookmarks.length) return <strong>There is no Bookmark</strong>;

  return (
    <div className="">
      <h2>Bookmark Results - {bookmarks.length}</h2>
      <div className="bookmarkList ">
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
                <div>
                  <ReactCountryFlag countryCode={item.countryCode} svg />
                  &nbsp;<strong>{item.cityName}</strong>&nbsp;
                  <span>{item.country}</span>
                </div>
                <button>
                  <HiTrash
                    className="trash"
                    onClick={(e) => deleteHandler(e, item.id)}
                  />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Bookmark;
