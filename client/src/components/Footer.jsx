import React from "react";
import background from "../assets/images/footer/footer.png";
import logo from "../assets/images/logo/logo.png";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa6";

function Footer() {
  return (
    <div className="footer w-full min-h-[15rem] flex justify-center items-center relative bg-[#326c56] text-white py-10 px-10">
      <img
        src={background}
        alt=""
        className="absolute w-[75%] h-full object-fit top-0"
      />
      <div className="content w-full min-h-[13rem] flex justify-center items-center relative z-10 gap-5">
        <div className="logo w-full min-h-[13rem] flex flex-1/4 justify-start items-start">
          <figure>
            <img src={logo} alt="" className="w-30" />
          </figure>
        </div>
        <div className="heading-extra flex flex-2/4 flex-col justify-center items-center gap-4">
          <h1 className="text-6xl text-[#FFC649] lato-bold tracking-[1px]">YummyFit</h1>
          <p className="text-center text-[.9rem] lato-regular tracking-[.5px] leading-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            eos temporibus vero officiis nam odit laborum reprehenderit
            voluptates dolores? Accusantium recusandae rerum molestiae id
            quisquam sequi adipisci in quam aperiam excepturi.
          </p>
          <div className="copyright text-[.9rem] lato-bold tracking-[.5px] mt-1">
            <p>© 2025 YummyFit. All content is protected by copyright.</p>
          </div>
        </div>
        <div className="url-social w-full min-h-[13rem] flex flex-1/4 flex-col text-end justify-end gap-1">
          <p className="text-[1rem] tracking-[1px] lato-bold">www.yummyfit.com</p>
          <div className="social-icons w-full text-[1.1rem] flex justify-end gap-2 mt-1">
            <FaInstagram />
            <RiTwitterXLine />
            <FaWhatsapp />
            <FaFacebook />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
