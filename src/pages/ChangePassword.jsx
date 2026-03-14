import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [toggle, setToggle] = useState({
    oldPassword: "hide",
    password: "hide",
    confirmPassword: "hide",
  });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setErrorMessage("");
      setLoading(true);
      const { oldPassword: currentPassword, password: newPassword } = data;
      const response = await axios.post(
        API_BASE_URL + "/profile/reset-password",
        { currentPassword, newPassword },
        { withCredentials: true },
      );
      setLoading(false);
      reset({
        oldPassword: "",
        password: "",
        confirmPassword: "",
      });
      Swal.fire({
        icon: "success",
        text: response.data.message,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/dashboard");
        }
      });
    } catch (error) {
      setLoading(false);
      const errorDetails =
        error?.response?.data?.message || "something went wrong";
      console.error(errorDetails);
      setErrorMessage(errorDetails);
    }
  };

  return (
    <div className="flex justify-center flex-1 px-4 md:px-0">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Change Password</h2>
          <fieldset className="fieldset relative">
            <legend className="fieldset-legend">Old Password</legend>
            <input
              type={toggle.oldPassword === "hide" ? "password" : "text"}
              className="input"
              disabled={loading}
              placeholder="Old Password"
              {...register("oldPassword", {
                required: "old password is required",
                onChange: () => {
                  setErrorMessage("");
                },
              })}
            />
            {toggle.oldPassword === "hide" ? (
              <FaRegEyeSlash
                className="text-xl absolute right-5 cursor-pointer top-3"
                onClick={() =>
                  setToggle((pre) => ({ ...pre, oldPassword: "show" }))
                }
              />
            ) : (
              <FaRegEye
                className="text-xl absolute right-5 cursor-pointer top-3"
                onClick={() =>
                  setToggle((pre) => ({ ...pre, oldPassword: "hide" }))
                }
              />
            )}
            {errors.oldPassword && (
              <p className="text-red-600">{errors.oldPassword.message}</p>
            )}
          </fieldset>
          <fieldset className="fieldset relative">
            <legend className="fieldset-legend">New Password</legend>
            <input
              type={toggle.password === "hide" ? "password" : "text"}
              className="input"
              placeholder="New Password"
              disabled={loading}
              {...register("password", {
                required: "password is required",
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
                  message:
                    "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
                },
                onChange: () => {
                  setErrorMessage("");
                },
              })}
            />
            {toggle.password === "hide" ? (
              <FaRegEyeSlash
                className="text-xl absolute right-5 cursor-pointer top-3"
                onClick={() =>
                  setToggle((pre) => ({ ...pre, password: "show" }))
                }
              />
            ) : (
              <FaRegEye
                className="text-xl absolute right-5 cursor-pointer top-3"
                onClick={() =>
                  setToggle((pre) => ({ ...pre, password: "hide" }))
                }
              />
            )}
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </fieldset>
          <fieldset className="fieldset relative">
            <legend className="fieldset-legend">Confirm New Password</legend>
            <input
              type={toggle.confirmPassword === "hide" ? "password" : "text"}
              className="input"
              placeholder="Confirm New Password"
              disabled={loading}
              {...register("confirmPassword", {
                required: "confirm password is required",
                validate: (value) =>
                  watch("password") === value ||
                  "password & confirm password must match",
                onChange: () => {
                  setErrorMessage("");
                },
              })}
            />
            {toggle.confirmPassword === "hide" ? (
              <FaRegEyeSlash
                className="text-xl absolute right-5 cursor-pointer top-3"
                onClick={() =>
                  setToggle((pre) => ({ ...pre, confirmPassword: "show" }))
                }
              />
            ) : (
              <FaRegEye
                className="text-xl absolute right-5 cursor-pointer top-3"
                onClick={() =>
                  setToggle((pre) => ({ ...pre, confirmPassword: "hide" }))
                }
              />
            )}
            {errors.confirmPassword && (
              <p className="text-red-600">{errors.confirmPassword.message}</p>
            )}
          </fieldset>
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
          <div className="card-actions mt-5">
            <button
              className="btn btn-primary w-full"
              disabled={loading}
              onClick={handleSubmit(onSubmit)}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
