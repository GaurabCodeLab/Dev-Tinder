import Card from "../components/Card";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../redux/slices/feedSlice";
import { API_BASE_URL } from "../utils/constants";

const Dashboard = () => {
  const feedData = useSelector((state) => state.feed.feedData);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchFeed();
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
    }
  };

  return (
    <div className="flex justify-center mt-16">
      {feedData && <Card data={feedData[0]} />}
    </div>
  );
};

export default Dashboard;
