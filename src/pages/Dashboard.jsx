import Card from "../components/Card";
import { useSelector } from "react-redux";
import useFetchFeed from "../hooks/useFetchFeed";

const Dashboard = () => {
  const feedData = useSelector((state) => state.feed.feedData);
  useFetchFeed();

  if (!feedData) return;

  return feedData && feedData.length > 0 ? (
    <div className="flex justify-center mt-16">
      {feedData && <Card data={feedData[0]} />}
    </div>
  ) : (
    <p className="text-center mt-6 text-2xl font-bold">No Feed Found</p>
  );
};

export default Dashboard;
