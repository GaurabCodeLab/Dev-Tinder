import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../redux/slices/feedSlice";
import { API_BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const useFetchFeed = () => {
  const feedData = useSelector((state) => state.feed.feedData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!feedData) {
      fetchFeed();
    }
  }, []);

  const fetchFeed = async () => {
    try {
      const response = await axios.get(API_BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(response.data?.data));
    } catch (error) {
      const errorMessgae =
        error instanceof Error ? error.message : "something went wrong";
      console.error(errorMessgae);
      Swal.fire({
        icon: "error",
        text: errorMessgae,
      });
    }
  };
  return { fetchFeed };
};

export default useFetchFeed;
