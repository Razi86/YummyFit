import React, { useContext, useState, useRef, useEffect } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { AuthContext } from "../context/authContext";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo/logo.png";
import { ImProfile } from "react-icons/im";
import { TbLogout2, TbLogin2 } from "react-icons/tb";
import { GiArchiveRegister } from "react-icons/gi";
import { BiFoodMenu } from "react-icons/bi";
import { BsBook } from "react-icons/bs";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { MdWifiProtectedSetup } from "react-icons/md";
import avatar from "../assets/images/avatar/avatar.png";
import { useTranslation } from "react-i18next";
import { FaGlobe } from "react-icons/fa";
import englandFlag from "../assets/images/flags/england.png";
import turkeyFlag from "../assets/images/flags/turkey.png";
import spainFlag from "../assets/images/flags/spain.png";
import italyFlag from "../assets/images/flags/italy.png";
import franceFlag from "../assets/images/flags/france.png";
import chinaFlag from "../assets/images/flags/china.png";
import germanyFlag from "../assets/images/flags/germany.png";


function Navbar() {
  const { t } = useTranslation();
  const { changeLanguage, language } = useContext(LanguageContext);
  const { handleLogout, user } = useContext(AuthContext);
  const isLoggedIn = user && user.email;
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const languageDropdownRef = useRef(null);

  const handleLanguageSelect = (lang) => {
    changeLanguage(lang);
    setIsLanguageDropdownOpen(false); 
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target)
      ) {
        setIsLanguageDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [languageDropdownRef]);

  return (
    <div className="flex justify-between items-center w-full max-w-[1600px] px-10  py-4 z-5 fixed top-0 bg-white shadow-md ">
      <div className="left w-full flex-1/2 flex-wrap flex items-center">
        <div className="">
          <NavLink to="/">
            <img src={logo} alt="YummyFit Logo" className="h-25 w-30" />
          </NavLink>
        </div>
        <div className="ml-25">
          <ul className="menu menu-horizontal px-1 gap-2 nunito text-lg font-bold">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "active-link" : "menu-link"
                }
              >
                <span className="navber-icon text-lg">🏠</span>
                {t("navbar.home")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/food"
                className={({ isActive }) =>
                  isActive ? "active-link" : "menu-link"
                }
              >
                <span className="navber-icon text-lg">🍴</span>{" "}
                {t("navbar.recipes")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "active-link" : "menu-link"
                }
              >
                <span className="navber-icon text-lg">ℹ️</span>{" "}
                {t("navbar.about")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "active-link" : "menu-link"
                }
              >
                <span className="navber-icon text-lg">📞</span>{" "}
                {t("navbar.contact")}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="right flex items-center gap-5">
        <div className="welcome">
          {isLoggedIn ? (
            <p className="text-lg font-medium text-[#1A1A1A]">
              {t("navbar.welcome")}, {user.username}🍃
            </p>
          ) : (
            <p></p>
          )}
        </div>
        <div className="relative" ref={languageDropdownRef}>
          <button
            onClick={toggleLanguageDropdown}
            className="p-2 rounded-full bg-gray-100 border border-[#E3F5ED] text-black flex items-center justify-center focus:outline-none hover:bg-gray-200 transition-colors duration-200"
          >
            <FaGlobe className="text-2xl text-[#326C56] cursor-pointer" />
          </button>

          {isLanguageDropdownOpen && (
            <div className="absolute right-0 mt-2 w-33 bg-white border border-gray-200 rounded-md shadow-lg transform origin-top-right transition-all duration-300 opacity-100 scale-100 z-50">
              <div className="py-1">
                <button
                  onClick={() => handleLanguageSelect("en")}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-[#E3F5ED] hover:text-[#326C56] transition-colors duration-200 cursor-pointer"
                >
                  <span
                    role="img"
                    aria-label="United Kingdom flag"
                    className="mr-2"
                  >
                    <img src={englandFlag} alt="" className="w-6" />
                  </span>
                  {t("navbar.english")}
                </button>
                <button
                  onClick={() => handleLanguageSelect("tr")}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-[#E3F5ED] hover:text-[#326C56] transition-colors duration-200 cursor-pointer"
                >
                  <span role="img" aria-label="Turkey flag" className="mr-2">
                    <img src={turkeyFlag} alt="" className="w-6" />
                  </span>
                  {t("navbar.turkish")}
                </button>
                <button
                  onClick={() => handleLanguageSelect("es")}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-[#E3F5ED] hover:text-[#326C56] transition-colors duration-200 cursor-pointer"
                >
                  <span role="img" aria-label="Turkey flag" className="mr-2">
                    <img src={spainFlag} alt="" className="w-6" />
                  </span>
                  {t("navbar.spanish")}
                </button>
                <button
                  onClick={() => handleLanguageSelect("it")}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-[#E3F5ED] hover:text-[#326C56] transition-colors duration-200 cursor-pointer"
                >
                  <span role="img" aria-label="Italy flag" className="mr-2">
                    <img src={italyFlag} alt="Italy flag" className="w-6" />
                  </span>
                  {t("navbar.italian")}
                </button>
                <button
                  onClick={() => handleLanguageSelect("fr")}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-[#E3F5ED] hover:text-[#326C56] transition-colors duration-200 cursor-pointer"
                >
                  <span role="img" aria-label="France flag" className="mr-2">
                    <img src={franceFlag} alt="France flag" className="w-6" />
                  </span>
                  {t("navbar.french")}
                </button>
                <button
                  onClick={() => handleLanguageSelect("de")}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-[#E3F5ED] hover:text-[#326C56] transition-colors duration-200 cursor-pointer"
                >
                  <span role="img" aria-label="Germany flag" className="mr-2">
                    <img src={germanyFlag} alt="Germany flag" className="w-6" />
                  </span>
                  {t("navbar.german")}
                </button>
                <button
                  onClick={() => handleLanguageSelect("zh")}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-[#E3F5ED] hover:text-[#326C56] transition-colors duration-200 cursor-pointer"
                >
                  <span role="img" aria-label="China flag" className="mr-2">
                    <img src={chinaFlag} alt="China flag" className="w-5" />
                  </span>
                  {t("navbar.chinese")}
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn w-15 h-15 flex justify-center items-center rounded-full bg-gray-100 border border-[#E3F5ED] text-black p-0"
          >
            {isLoggedIn ? (
              <div className="avatar">
                <div className="w-10 h-10 rounded-full ring ring-[#E3F5ED] ring-offset-4">
                  {user.image && (
                    <img
                      src={user.image}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
            ) : (
              <img src={avatar} alt="" />
            )}
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content w-[25rem] min-h-[100vh] flex flex-col items-center justify-start gap-4 absolute top-[-2.5rem] right-[-2.5rem] bg-[#326C56] text-white p-2 pt-20 mt-1 shadow-sm"
          >
            <div className="welcome">
              {isLoggedIn ? (
                <div className="flex flex-col items-center justify-center gap-2">
                  <img
                    src={user?.image}
                    alt=""
                    className="w-[7rem] h-[7rem] rounded-[50%] border-3 border-white"
                  />
                  <p className="text-lg font-medium text-white mb-5 underline tracking-[.5px]">
                    {t("navbar.welcome")}, {user.username}
                  </p>
                </div>
              ) : (
                <p></p>
              )}
            </div>
            {isLoggedIn ? (
              <>
                <li className="w-full flex justify-center items-center text-[#326C56] tracking-[1px] relative">
                  <NavLink
                    to={"/account-setup"}
                    className={"w-full flex justify-center items-center"}
                  >
                    <button className="w-[70%] h-[3rem] bg-white cursor-pointer text-[.9rem] text-[#326C56] uppercase rounded-md shadow-md hover:bg-[#FFC649] hover:text-white transition duration-300 ease-in-out flex items-center justify-center gap-2">
                      <MdWifiProtectedSetup className="text-inherit text-xl transition duration-300 ease-in-out" />
                      {t("navbar.account-setup")}
                    </button>
                  </NavLink>
                </li>
                <li className="w-full flex justify-center items-center text-[#326C56] tracking-[1px] relative">
                  <NavLink
                    to={"/profile"}
                    className={"w-full flex justify-center items-center"}
                  >
                    <button className="w-[70%] h-[3rem] bg-white cursor-pointer text-[1rem] text-[#326C56] uppercase rounded-md shadow-md hover:bg-[#FFC649] hover:text-white transition duration-300 ease-in-out flex items-center justify-center gap-2">
                      <ImProfile className="text-inherit text-xl transition duration-300 ease-in-out" />
                      {t("navbar.profile")}
                    </button>
                  </NavLink>
                </li>
                <li className="w-full flex justify-center items-center text-[#326C56] tracking-[1px] relative">
                  <NavLink
                    to={"/food"}
                    className={"w-full flex justify-center items-center"}
                  >
                    <button className="w-[70%] h-[3rem] bg-white cursor-pointer text-[1rem] text-[#326C56] uppercase rounded-md shadow-md hover:bg-[#FFC649] hover:text-white transition duration-300 ease-in-out flex items-center justify-center gap-2">
                      <BiFoodMenu className="text-inherit text-xl transition duration-300 ease-in-out" />
                      {t("navbar.recipes")}
                    </button>
                  </NavLink>
                </li>
                <li className="w-full flex justify-center items-center text-[#326C56] tracking-[1px] relative">
                  <NavLink
                    to={"/about"}
                    className={"w-full flex justify-center items-center"}
                  >
                    <button className="w-[70%] h-[3rem] bg-white cursor-pointer text-[1rem] text-[#326C56] uppercase rounded-md shadow-md hover:bg-[#FFC649] hover:text-white transition duration-300 ease-in-out flex items-center justify-center gap-2">
                      <BsBook className="text-inherit text-xl transition duration-300 ease-in-out" />
                      {t("navbar.about")}
                    </button>
                  </NavLink>
                </li>
                <li className="w-full flex justify-center items-center text-[#326C56] tracking-[1px] relative">
                  <NavLink
                    to={"/contact"}
                    className={"w-full flex justify-center items-center"}
                  >
                    <button className="w-[70%] h-[3rem] bg-white cursor-pointer text-[1rem] text-[#326C56] uppercase rounded-md shadow-md hover:bg-[#FFC649] hover:text-white transition duration-300 ease-in-out flex items-center justify-center gap-2">
                      <HiOutlineChatBubbleBottomCenterText className="text-inherit text-xl transition duration-300 ease-in-out" />
                      {t("navbar.contact")}
                    </button>
                  </NavLink>
                </li>
                <li className="w-full flex justify-center items-center text-[#326C56] tracking-[1px] relative">
                  <NavLink
                    onClick={handleLogout}
                    className={"w-full flex justify-center items-center"}
                  >
                    <button className="w-[70%] h-[3rem] bg-white cursor-pointer text-[1rem] text-[#326C56] uppercase rounded-md shadow-md hover:bg-[#FFC649] hover:text-white transition duration-300 ease-in-out flex items-center justify-center gap-2">
                      <TbLogout2 className="text-inherit text-xl transition duration-300 ease-in-out" />
                      {t("navbar.logout")}
                    </button>
                  </NavLink>
                </li>
                <NavLink to={"/"}>
                  <figure className="w-full flex justify-center items-center mb-5 absolute bottom-20 left-0 right-0">
                    <img src={logo} alt="" className="w-[55%]" />
                  </figure>
                </NavLink>
              </>
            ) : (
              <>
                <li className="w-full flex justify-center items-center text-[#326C56] tracking-[1px] relative">
                  <NavLink
                    to={"/register"}
                    className={"w-full flex justify-center items-center"}
                  >
                    <button className="w-[70%] h-[3rem] bg-white cursor-pointer text-[1rem] text-[#326C56] uppercase rounded-md shadow-md hover:bg-[#FFC649] hover:text-white transition duration-300 ease-in-out flex items-center justify-center gap-2">
                      <GiArchiveRegister />
                      {t("navbar.register")}
                    </button>
                  </NavLink>
                </li>
                <li className="w-full flex justify-center items-center text-[#326C56] tracking-[1px] relative">
                  <NavLink
                    to={"/login"}
                    className={"w-full flex justify-center items-center"}
                  >
                    <button className="w-[70%] h-[3rem] bg-white cursor-pointer text-[1rem] text-[#326C56] uppercase rounded-md shadow-md hover:bg-[#FFC649] hover:text-white transition duration-300 ease-in-out flex items-center justify-center gap-2">
                      <TbLogin2 className="text-inherit text-xl transition duration-300 ease-in-out" />
                      {t("navbar.login")}
                    </button>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
<nav></nav>;

export default Navbar;
