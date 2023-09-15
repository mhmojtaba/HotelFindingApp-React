import { useEffect } from "react";

const useOutsideClick = (ref, exceptId, cbFunc) => {
  useEffect(() => {
    function clickOutside(e) {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        e.target.id !== exceptId
      ) {
        cbFunc();
      }
    }

    document.addEventListener("mousedown", clickOutside);

    // cleanup in unmount
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [ref, cbFunc]);
};

export default useOutsideClick;
