import React, { useState } from "react";
import emailjs from "emailjs-com";
import rightImage from "../assets/images/contactPage/contact.png";
import { MdDriveFileRenameOutline, MdAlternateEmail, MdOutlineSubject } from "react-icons/md";
import { LuMessageSquare } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ContactUs() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_qfnfn36",
        "template_xjdy6zp",
        e.target,
        "1vziUxMWWjHuBFgX5"
      )
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
          setSuccess("Email sent successfully!");
          // alert(t("contact.success"));
          setForm({ name: "", email: "", subject: "", message: "" });
        },
        (error) => {
          console.error("FAILED...", error.text);
          setSuccess("Failed to send email. Please try again later.");
          // alert(t("contact.error"));
        }
      );
  };

  return (
    <div className="w-full min-h-[100vh] pt-[140px] flex flex-wrap justify-between items-center p-12">
      <div className="left flex flex-col justify-center items-start flex-1/2 gap-5 pl-[3rem]">
        <h1 className="w-[85%] text-black text-[2.5rem] tracking-[0.2rem] font-medium lato-regular leading-[4rem]">
          {t("contact.title")}
        </h1>
        <form onSubmit={sendEmail} className="w-[40rem] flex flex-col gap-4">
          <input type="hidden" name="time" value={new Date().toLocaleString()} />
          <div className="relative">
            <label className="block mb-1 font-medium text-black">{t("contact.name")}</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-black rounded p-2 text-black pl-10"
              required
            />
            <MdDriveFileRenameOutline className="text-gray-500 absolute top-10 left-4" />
          </div>
          <div className="relative">
            <label className="block mb-1 font-medium text-black">{t("contact.email")}</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-black rounded p-2 text-black pl-10"
              required
            />
            <MdAlternateEmail className="text-gray-500 absolute top-10 left-4" />
          </div>
          <div className="relative">
            <label className="block mb-1 font-medium text-black">{t("contact.subject")}</label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full border border-black rounded p-2 text-black pl-10"
              required
            />
            <MdOutlineSubject className="text-gray-500 absolute top-10 left-4" />
          </div>
          <div className="relative">
            <label className="block mb-1 font-medium text-black">{t("contact.message")}</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              className="w-full border border-black rounded p-2 text-black pl-10"
              required
            ></textarea>
            <LuMessageSquare className="text-gray-500 absolute top-10 left-4" />
          </div>
          {success && (
            <div className="text-white bg-green-500 text-lg font-semibold mb-4 px-4 py-2 rounded">
              {success}
            </div>
          )}
          <button
            type="submit"
            className="bg-green-600 text-white text-[1.25rem] tracking-[.1rem] px-4 py-3 rounded hover:bg-green-700 transition"
          >
            {t("contact.send")}
          </button>
        </form>
        <p className="w-[90%] text-black text-xl font-normal leading-normal">
          {t("contact.footer")}
        </p>
        <p
          onClick={() => navigate("/login")}
          className="w-[100%] text-black text-2xl underline uppercase font-normal leading-normal cursor-pointer"
        >
          {t("contact.cta")}
        </p>
      </div>
      <div className="right flex flex-1/2 justify-center items-center">
        <figure className="w-[40rem]">
          <img src={rightImage} alt="contact" />
        </figure>
      </div>
    </div>
  );
}
