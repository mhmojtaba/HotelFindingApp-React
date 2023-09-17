import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5000";
const BookmarkContext = createContext();

const initialState = {
  isLoading: false,
  currentBookmark: {},
  bookmarks: [],
  error: null,
};

const bookmarkReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_BOOKMARKS":
      return {
        ...state,
        isLoading: false,
        bookmarks: action.payload,
        currentBookmark: {},
      };
    case "GET_BOOKMARK":
      return {
        ...state,
        isLoading: false,
        currentBookmark: action.payload,
      };
    case "CREATE_BOOKMARK":
      return {
        ...state,
        isLoading: false,
        bookmarks: [...state.bookmarks, action.payload],
        currentBookmark: action.payload,
      };
    case "DELETE_BOOKMARK":
      return {
        ...state,
        isLoading: false,
        currentBookmark: {},
        bookmarks: state.bookmarks.filter((item) => item.id !== action.payload),
      };
    case "REJECTED":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

function BookmarkProvider({ children }) {
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentBookmark, setCurrentBookmark] = useState({});
  // const [bookmarks, setBookmarks] = useState([]);

  const [{ isLoading, currentBookmark, bookmarks, error }, dispatch] =
    useReducer(bookmarkReducer, initialState);

  useEffect(() => {
    async function getBookmarks() {
      dispatch({ type: "LOADING" });
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        dispatch({ type: "GET_BOOKMARKS", payload: data });
      } catch (err) {
        toast.error(err.message);
        dispatch({ type: "REJECTED", payload: err.message });
      }
    }
    getBookmarks();
  }, []);

  async function getCurrentBookmark(id) {
    if (id === currentBookmark.id) return;
    dispatch({ type: "LOADING" });
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "GET_BOOKMARK", payload: data });
    } catch (err) {
      toast.error(err.message);
      dispatch({ type: "REJECTED", payload: err.message });
    }
  }

  async function postNewBookmark(newBookmark) {
    dispatch({ type: "LOADING" });
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
      dispatch({ type: "CREATE_BOOKMARK", payload: data });
    } catch (err) {
      toast.error(err.message);
      dispatch({ type: "REJECTED", payload: err.message });
    }
  }

  async function deleteBookmark(id) {
    dispatch({ type: "LOADING" });
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "DELETE_BOOKMARK", payload: id });
    } catch (err) {
      toast.error(err.message);
      dispatch({ type: "REJECTED", payload: err.message });
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        isLoading,
        currentBookmark,
        error,
        getCurrentBookmark,
        postNewBookmark,
        deleteBookmark,
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
