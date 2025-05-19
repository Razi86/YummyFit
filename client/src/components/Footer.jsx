import React from "react";
import background from "../assets/images/footer/footer.png";
import logo from "../assets/images/logo/logo.png";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <div className="footer w-full min-h-[15rem] flex justify-center items-center relative bg-[#326c56] text-white py-10 px-10">
      <img
        src={background}
        alt=""
        className="absolute w-[75%] h-full object-fit top-0"
      />
      <div className="content w-full min-h-[13rem] flex justify-center items-center relative z-2 gap-5">
        <div className="logo w-full min-h-[13rem] flex flex-1/4 justify-start items-start">
          <figure>
            <img src={logo} alt={t("footer.logo_alt")} className="w-30" />
          </figure>
        </div>
        <div className="heading-extra flex flex-2/4 flex-col justify-center items-center gap-4">
          <h1 className="text-6xl text-[#FFC649] lato-bold tracking-[1px]">
            {t("footer.brand_name")}
          </h1>
          <p className="text-center text-[1rem] lato-regular tracking-[.5px] leading-5">
            {t("footer.description")}
          </p>
          <div className="copyright text-[1rem] lato-bold tracking-[.5px] mt-1">
            <p>{t("footer.copyright")}</p>
          </div>
        </div>
        <div className="url-social w-full min-h-[13rem] flex flex-1/4 flex-col text-end justify-end gap-1 -z-5">
          <p className="text-[1rem] tracking-[1px] lato-bold">
            {t("footer.website")}
          </p>
          <div className="social-icons w-full text-[1.1rem] flex justify-end gap-2 mt-1">
            <a href="#" aria-label={t("footer.instagram")}>
              <FaInstagram />
            </a>
            <a href="#" aria-label={t("footer.twitter")}>
              <RiTwitterXLine />
            </a>
            <a href="#" aria-label={t("footer.whatsapp")}>
              <FaWhatsapp />
            </a>
            <a href="#" aria-label={t("footer.facebook")}>
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
