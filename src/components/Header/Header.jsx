import { useRef, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import {
  HiCalendar,
  HiLogout,
  HiMinus,
  HiPlus,
  HiSearch,
} from "react-icons/hi";
import useOutsideClick from "../../hooks/useOutsideClick";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import {
  NavLink,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Header() {
  let [searchParams] = useSearchParams();
  // getting the destination from userSearchField
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );

  // toggling the guest options list
  const [isShow, setIsShow] = useState(false);

  // toggling the date option list
  const [isDateOpen, setIsDateOpen] = useState(false);

  // options state
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  // selection range
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  //

  // navigation user
  const navigate = useNavigate();

  // handler to increment and decrement of options state
  const optionHandler = (name, operation) => {
    setOptions((prevOption) => {
      return {
        ...prevOption,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const searchHandler = () => {
    const params = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });
    navigate({
      pathname: "/hotels",
      search: params.toString(),
    });
  };

  const dateRef = useRef();
  useOutsideClick(dateRef, "dateDropDown", () => setIsDateOpen(false));

  return (
    <div className="header">
      <NavLink to="/bookmark">Bookmarks</NavLink>
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            type="text"
            placeholder="Where to go?"
            className="headerSearchInput"
            name="destination"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <span className="separator"></span>
        </div>
        <div className="headerSearchItem" ref={dateRef}>
          <HiCalendar className="headerIcon dateIcon" />
          <div
            id="dateDropDown"
            className="dateDropDown"
            onClick={() => setIsDateOpen((prev) => !prev)}
          >
            {`${date.startDate.toLocaleDateString()} to ${date.endDate.toLocaleDateString()}`}
          </div>
          {isDateOpen && (
            <DateRange
              ranges={[date]}
              className="date"
              onChange={(item) => setDate(item.selection)}
              minDate={new Date()}
              moveRangeOnFirstSelection={true}
            />
          )}
          <span className="separator"></span>
        </div>
        <div className="headerSearchItem">
          <div id="optionDropDown" onClick={() => setIsShow((prev) => !prev)}>
            {options.adult} adult &bull; {options.children} children &bull;
            {options.room} room
          </div>
          {isShow && (
            <GuestOptionList
              options={options}
              setIsShow={setIsShow}
              optionHandler={optionHandler}
            />
          )}
          <span className="separator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn" onClick={searchHandler}>
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
      <User />
    </div>
  );
}

export default Header;

// user login

function User() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <div>
          <span>{user.name}</span>
          <button onClick={logout} className="btn">
            logout
            <HiLogout />
          </button>
        </div>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </>
  );
}

//@dev items of options to map on them in the GuestOptionList component
const GuestOptionItems = [
  {
    id: 1,
    title: "adult",
    minLimit: 1,
  },
  {
    id: 2,
    title: "children",
    minLimit: 0,
  },
  {
    id: 3,
    title: "room",
    minLimit: 1,
  },
];

// option list component
const GuestOptionList = ({ options, optionHandler, setIsShow }) => {
  const optionRef = useRef();
  useOutsideClick(optionRef, "optionDropDown", () => setIsShow(false));
  return (
    <div className="guestOptions" ref={optionRef}>
      {GuestOptionItems.map((item) => (
        <GuestOptionItem
          key={item.id}
          type={item.title}
          options={options}
          optionHandler={optionHandler}
          minLimit={item.minLimit}
        />
      ))}
    </div>
  );
};

// option Items Component
const GuestOptionItem = ({ type, options, minLimit, optionHandler }) => {
  // console.log(options);
  return (
    <>
      <div className="guestOptionItem">
        <span className="optionText">{type}</span>
        <div className="optionCounter">
          <button
            className="optionCounterBtn"
            onClick={() => optionHandler(type, "inc")}
            disabled={options[type] < minLimit}
          >
            <HiPlus className="icon" />
          </button>
          <span className="">{options[type]}</span>
          <button
            className="optionCounterBtn"
            onClick={() => optionHandler(type, "dec")}
            disabled={options[type] <= minLimit}
          >
            <HiMinus className="icon" />
          </button>
        </div>
      </div>
    </>
  );
};
