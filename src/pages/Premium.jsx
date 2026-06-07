import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { useState, useEffect } from "react";

const Premium = () => {
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(API_BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      setIsPremium(response.data.user.isPremium);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBuyClick = async (type) => {
    try {
      const response = await axios.post(
        API_BASE_URL + "/payment/create",
        { membershipType: type },
        { withCredentials: true },
      );
      const options = {
        key: response.data.data.key,
        amount: response.data.data.amount,
        currency: response.data.data.currency,
        name: `${response.data.data.notes.membershipType} membership type payment`,
        order_id: response.data.data.orderId,
        prefill: {
          name: `${response.data.data.notes.firstName}+" "+${response.data.data.notes.lastName}`,
          email: response.data.data.notes.email,
          contact: "8448044698",
        },
        theme: {
          color: "#F37254",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
    }
  };

  return isPremium ? (
    <h1>You are a premium user</h1>
  ) : (
    <div className="m-10 flex-1">
      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
          <h1 className="font-bold text-3xl">Silver Membership</h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - 100 connection Requests per day</li>
            <li> - Blue Tick</li>
            <li> - 3 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("silver")}
            className="btn btn-secondary"
          >
            Buy Silver
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
          <h1 className="font-bold text-3xl">Gold Membership</h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - Inifiniye connection Requests per day</li>
            <li> - Blue Tick</li>
            <li> - 6 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("gold")}
            className="btn btn-primary"
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
