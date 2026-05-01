import { API_BASE_URL } from "../utils/constants";
import axios from "axios";
import { useState, useEffect } from "react";

const Premium = () => {
  const [isPremium, setIsPremium] = useState("");

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(API_BASE_URL + "/view", {
        withCredentials: true,
      });
      setIsPremium(response.data.user.isPremium);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleBuyClick = async (type) => {
    try {
      const order = await axios.post(
        API_BASE_URL + "/payment/create",
        { membershipType: type },
        { withCredentials: true },
      );
      console.log("order hai", order);
      const options = {
        key: order.data.key,
        amount: order.data.amount,
        currency: order.data.currency,
        name: `${order.data.notes.membershipType} subscription type`,
        description: `Amount to be paid for the ${order.data.notes.membershipType} subscription`,
        order_id: order.data.orderId,
        prefill: {
          name: order.data.notes.firstName + " " + order.data.notes.lastName,
          email: order.data.notes.email,
          contact: "8448044698",
        },
        theme: {
          color: "#F37254",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error.message);
    }
  };

  return isPremium ? (
    <h1>You are a premium user</h1>
  ) : (
    <div className="m-10 flex-1">
      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
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
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
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
