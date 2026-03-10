import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../redux/slices/feedSlice";
import { API_BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const useFetchFeed = () => {
  const feedData = useSelector((state) => state.feed.feedData);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!feedData) {
      fetchFeed();
    }
  }, []);

  const fetchFeed = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      setLoading(false);
      dispatch(addFeed(response.data?.data));
    } catch (error) {
      setLoading(false);
      const errorMessgae =
        error?.response?.data?.message || "something went wrong";
      console.error(errorMessgae);
      Swal.fire({
        icon: "error",
        text: errorMessgae,
      });
    }
  };
  return { fetchFeed, loading };
};

export default useFetchFeed;
