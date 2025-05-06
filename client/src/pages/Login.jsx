import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import image from "../assets/images/SignIn-SignUp/SignIn-SignUp.png";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";

function Login() {
  const { user, handleLogin, handleChange } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="login w-full min-h-[calc(100vh-160px)] flex justify-center items-center gap-30">
      <div className="left">
        <figure>
          <img src={image} alt="login-register" className="w-[50rem]" />
        </figure>
      </div>
      <div className="right">
        <h1 className="text-5xl text-[#9e3db2] font-medium lato-black text-center tracking-[1px] mb-8">
          Yummy<span className="text-[#FE486E]">Fit</span>
        </h1>
        <div className="w-full flex justify-center items-center">
          <div className="card w-full">
            <div className="card-body p-0">
              <form onSubmit={handleLogin} className="flex flex-col gap-5 mt-5">
                <div className="email relative">
                  <input
                    name="email"
                    value={user?.email || ""}
                    onChange={handleChange}
                    type="email"
                    placeholder="Email"
                    className="input w-[30rem] h-[3rem] text-[1rem] bordered border-gray-700 rounded-full bg-transparent pl-5"
                  />
                  <MdOutlineAlternateEmail className="text-[1.1rem] text-gray-400 absolute top-4 right-7" />
                </div>
                <div className="password relative">
                  <input
                    name="password"
                    value={user?.password || ""}
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    className="input w-[30rem] h-[3rem] text-[1rem] bordered border-gray-700 rounded-full bg-transparent pl-5"
                  />
                  <MdOutlinePassword className="text-[1.1rem] text-gray-400 absolute top-4 right-7" />
                </div>
                <button className="btn bg-[#FE486E] w-full h-[3rem] text-xl uppercase tracking-[1px] border-none rounded-full mt-3">
                  Login
                </button>
              </form>
              <p className="text-center text-[1rem] mt-3 tracking-[.5px]">
                Don't have an account?{" "}
                <span
                  onClick={() => {
                    navigate("/register");
                  }}
                  className="text-[#FE486E] font-bold tracking-[.5px] underline cursor-pointer"
                >
                  Register
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
