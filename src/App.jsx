import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header/Header";
import LocationList from "./components/Location/LocationList";
import { Route, Routes } from "react-router-dom";
import HotelLayout from "./components/Layout/HotelLayout";
import Hotels from "./components/Hotels/Hotels";
import SingleHotel from "./components/Hotels/SingleHotel";
import HotelProvider from "./components/context/HotelProvider";
import Bookmark from "./components/Bookmark/Bookmark";
import BookmarkLayout from "./components/Layout/BookmarkLayout";
import AddBookmark from "./components/Bookmark/AddBookmark";
import BookmarkProvider from "./components/context/BookmarkProvider";
import SingleBookmark from "./components/Bookmark/SingleBookmark";

function App() {
  return (
    <HotelProvider>
      <BookmarkProvider>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<LocationList />} />
          <Route path="/hotels" element={<HotelLayout />}>
            <Route index element={<Hotels />} />
            <Route path=":id" element={<SingleHotel />} />
          </Route>
          <Route path="/bookmark" element={<BookmarkLayout />}>
            <Route index element={<Bookmark />} />
            <Route path="add" element={<AddBookmark />} />
            <Route path=":id" element={<SingleBookmark />} />
          </Route>
        </Routes>
      </BookmarkProvider>
    </HotelProvider>
  );
}

export default App;
