import Card from "../components/Card";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const Profile = () => {
  const userDetails = useSelector((state) => state.userDetails.user);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    photoUrl: "",
    age: "",
    gender: "",
    about: "",
  });
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    if (userDetails) {
      setValue("firstName", userDetails.firstName);
      setValue("lastName", userDetails.lastName || "");
      setValue("photoUrl", userDetails.photoUrl || "");
      setValue("age", userDetails.age);
      setValue("gender", userDetails.gender);
      setValue("about", userDetails.about);
      setUserData({
        firstName: userDetails.firstName,
        lastName: userDetails.lastName || "",
        photoUrl: userDetails.photoUrl || "",
        age: userDetails.age,
        gender: userDetails.gender,
        about: userDetails.about || "",
      });
    }
  }, [userDetails]);

  const onSubmit = (data) => {
    console.log("data hai", data);
  };

  return (
    <div className="flex justify-center gap-8 mt-5">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title">Card Title</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name</legend>
            <input
              type="text"
              maxLength={30}
              className="input"
              placeholder="First Name"
              {...register("firstName", {
                required: "First Name is required",
                minLength: {
                  value: 3,
                  message: "First Name must be at leat 3 characters",
                },
                onChange: (e) => {
                  setUserData((pre) => ({ ...pre, firstName: e.target.value }));
                },
              })}
            />
            {errors.firstName && (
              <p className="text-red-600">{errors.firstName.message}</p>
            )}
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name</legend>
            <input
              type="text"
              className="input"
              placeholder="Last Name"
              {...register("lastName", {
                onChange: (e) => {
                  setUserData((pre) => ({ ...pre, lastName: e.target.value }));
                },
              })}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Photo URL</legend>
            <input
              type="url"
              className="input"
              placeholder="Photo URL"
              {...register("photoUrl", {
                onChange: (e) => {
                  setUserData((pre) => ({ ...pre, photoUrl: e.target.value }));
                },
              })}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Age</legend>
            <input
              type="text"
              className="input"
              placeholder="Age"
              maxLength={2}
              {...register("age", {
                required: "Age is required",
                onChange: (e) => {
                  setValue("age", e.target.value.replace(/[^0-9]/g, ""));
                  setUserData((pre) => ({ ...pre, age: e.target.value }));
                },
                validate: (value) =>
                  Number(value) >= 18 || "age must be at least 18 years old",
              })}
            />
            {errors.age && <p className="text-red-600">{errors.age.message}</p>}
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Gender</legend>
            <select
              defaultValue="Pick a browser"
              className="select"
              {...register("gender", {
                required: "Gender is required",
                onChange: (e) => {
                  setUserData((pre) => ({ ...pre, gender: e.target.value }));
                },
              })}
            >
              <option disabled={true} value="">
                Select a Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <p className="text-red-600">{errors.gender.message}</p>
            )}
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">About</legend>
            <textarea
              className="textarea h-24"
              placeholder="About"
              {...register("about", {
                onChange: (e) => {
                  setUserData((pre) => ({ ...pre, about: e.target.value }));
                },
              })}
            ></textarea>
          </fieldset>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={handleSubmit(onSubmit)}
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
      {userDetails && <Card data={userData} />}
    </div>
  );
};

export default Profile;
