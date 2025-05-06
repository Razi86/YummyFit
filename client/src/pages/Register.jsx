import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import image from "../assets/images/SignIn-SignUp/SignIn-SignUp.png";
import {
  MdOutlineAlternateEmail,
  MdOutlinePassword,
  MdDriveFileRenameOutline,
} from "react-icons/md";
import { HiUser } from "react-icons/hi2";

function Register() {
  const { user,handleRegister, handleChange, navigate } = useContext(AuthContext);

  return (
    <div className="login w-full min-h-[calc(100vh-160px)] flex justify-center items-center gap-30">
      <div className="left">
        <figure>
          <img src={image} alt="register" className="w-[50rem]" />
        </figure>
      </div>
      <div className="right">
      <h1 className="text-5xl text-[#9e3db2] font-medium lato-black text-center tracking-[1px] mb-8">
          Yummy<span className="text-[#FE486E]">Fit</span>
        </h1>
        <div className="w-full flex justify-center items-center">
          <div className="card w-full">
            <div className="card-body p-0">
              <form onSubmit={handleRegister} className="flex flex-col items-center gap-5 mt-5">
                <div className="username relative">
                  <input
                    type="text"
                    name="username"
                    value={user?.username || ""}
                    onChange={handleChange}
                    placeholder="Username"
                    className="input w-[30rem] h-[3rem] text-[1rem] bordered border-gray-700 rounded-full bg-transparent pl-5"
                  />
                  <HiUser className="text-[1.1rem] text-gray-400 absolute top-4 right-7" />
                </div>
                <div className="first_name relative">
                  <input
                    type="text"
                    name="first_name"
                    value={user?.first_name || ""}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="input w-[30rem] h-[3rem] text-[1rem] bordered border-gray-700 rounded-full bg-transparent pl-5"
                  />
                  <MdDriveFileRenameOutline className="text-[1.1rem] text-gray-400 absolute top-4 right-7" />
                </div>
                <div className="last_name relative">
                  <input
                    type="text"
                    name="last_name"
                    value={user?.last_name || ""}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="input w-[30rem] h-[3rem] text-[1rem] bordered border-gray-700 rounded-full bg-transparent pl-5"
                  />
                  <MdDriveFileRenameOutline className="text-[1.1rem] text-gray-400 absolute top-4 right-7" />
                </div>
                <div className="email relative">
                  <input
                    type="email"
                    name="email"
                    value={user?.email || ""}
                    onChange={handleChange}
                    placeholder="Email"
                    className="input w-[30rem] h-[3rem] text-[1rem] bordered border-gray-700 rounded-full bg-transparent pl-5"
                  />
                  <MdOutlineAlternateEmail className="text-[1.1rem] text-gray-400 absolute top-4 right-7" />
                </div>
                <div className="password relative">
                  <input
                    type="password"
                    name="password"
                    value={user?.password || ""}
                    onChange={handleChange}
                    placeholder="Password"
                    className="input w-[30rem] h-[3rem] text-[1rem] bordered border-gray-700 rounded-full bg-transparent pl-5"
                  />
                  <MdOutlinePassword className="text-[1.1rem] text-gray-400 absolute top-4 right-7" />
                </div>
                <button
                  type="submit"
                  className="btn bg-[#FE486E] w-full h-[3rem] text-xl uppercase tracking-[1px] border-none rounded-full mt-3"
                >
                  Register
                </button>
              </form>
              <p className="text-center text-[1rem] mt-3 tracking-[.5px]">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-[#FE486E] font-bold tracking-[.5px] underline cursor-pointer"
                >
                  Login
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
