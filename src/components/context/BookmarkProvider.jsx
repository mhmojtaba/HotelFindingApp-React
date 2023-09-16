import { createContext, useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useFetch from "../../hooks/useFetch";

const BASE_URL = "http://localhost:5000";
const BookmarkContext = createContext();

function BookmarkProvider({ children }) {
  const [isCurrentBookmarkLoading, setIsCurrentBookmarkLoading] =
    useState(false);
  const [currentBookmark, setCurrentBookmark] = useState({});
  const { data: bookmarks, isLoading } = useFetch(`${BASE_URL}/bookmarks`);

  async function getCurrentBookmark(id) {
    try {
      setIsCurrentBookmarkLoading(true);
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrentBookmark(data);
      setIsCurrentBookmarkLoading(true);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        isLoading,
        isCurrentBookmarkLoading,
        currentBookmark,
        getCurrentBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarkProvider;

export function useBookmark() {
  return useContext(BookmarkContext);
}
