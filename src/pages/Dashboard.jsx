import Card from "../components/Card";
import { useSelector } from "react-redux";
import useFetchFeed from "../hooks/useFetchFeed";

const Dashboard = () => {
  const feedData = useSelector((state) => state.feed.feedData);
  const { loading } = useFetchFeed();
  console.log("loading hai", loading);

  if (!feedData) return;

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent" />
        </div>
      )}
      {feedData && feedData.length > 0 ? (
        <div className="flex justify-center mt-16">
          {feedData && <Card data={feedData[0]} />}
        </div>
      ) : (
        <p className="text-center mt-6 text-2xl font-bold">No Feed Found</p>
      )}
    </div>
  );
};

export default Dashboard;
