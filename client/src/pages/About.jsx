import React from 'react';
import { Link } from "react-router-dom";
import AboutTacosImage from '../assets/images/aboutPage/about.png';
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex justify-center items-center py-10 pt-[140px]">
      <div className="w-11/12 md:w-3/4 flex flex-col md:flex-row items-center overflow-hidden rounded-lg">

        <div className="flex-1 p-5">
          <h1 className="text-7xl font-light mb-8 text-green-600">{t("about.brand")}</h1>
          <h2 className="text-6xl font-bold mb-8 leading-tight">
            {t("about.slogan_line1")}<br />
            <span className="border-l-4 border-orange-500 pl-4">{t("about.slogan_line2")}</span>
          </h2>

          <p className="mb-1 text-2xl leading-relaxed text-gray-700 pl-4">
            {t("about.description")}
          </p>

          <h3 className="text-3xl font-semibold text-green-600 mt-10 mb-4">{t("about.offer_title")}</h3>
          <ul className="list-disc list-inside mb-6 text-2xl text-gray-700 pl-8 leading-relaxed">
            <li>
              <strong>{t("about.offer1.title")}</strong> {t("about.offer1.desc")}
            </li>
            <li>
              <strong>{t("about.offer2.title")}</strong> {t("about.offer2.desc")}
            </li>
            <li>
              <strong>{t("about.offer3.title")}</strong> {t("about.offer3.desc")}
            </li>
          </ul>

          <Link
            to="/register"
            className=" yummy-btn bg-green-500 text-white text-2xl font-bold px-8 py-4 rounded-lg hover:bg-green-600 transition inline-block"
          >
            {t("about.register_button")}
          </Link>
        </div>

        <div className="flex-1 relative flex items-center justify-center p-6 w-full aspect-[4/5]">
          <div
            className="w-full h-full rounded-xl overflow-hidden shadow-md"
            style={{
              backgroundImage: `url(${AboutTacosImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
