import React, { useState } from "react";
import emailjs from "emailjs-com";
import rightImage from "../assets/images/contactPage/contact.png";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdAlternateEmail } from "react-icons/md";
import { MdOutlineSubject } from "react-icons/md";
import { LuMessageSquare } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export default function ContactUs() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

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
          alert("Thank you for reaching out! We will get back to you soon.");
          setForm({ name: "", email: "", subject: "", message: "" });
        },
        (error) => {
          console.error("FAILED...", error.text);
          alert("Something went wrong. Please try again later.");
        }
      );
  };

  return (
    <div className="w-full min-h-[calc(100vh-160px)] flex flex-wrap justify-between items-center p-12">
      <div className="left flex flex-col justify-center items-start flex-1/2 gap-10">
        <h1 className="w-[85%] text-black text-5xl tracking-[0.2rem] font-medium lato-regular leading-[4rem]">
          Have Questions About Your Journey? Reach Out!
        </h1>
        <form onSubmit={sendEmail} className="w-[40rem] flex flex-col gap-4">
          <input
            type="hidden"
            name="time"
            value={new Date().toLocaleString()}
          />
          <div className="relative">
            <label className="block mb-1 font-medium text-black">Name</label>
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
            <label className="block mb-1 font-medium text-black">Email</label>
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
            <label className="block mb-1 font-medium text-black">Subject</label>
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
            <label className="block mb-1 font-medium text-black">Message</label>
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
          <button
            type="submit"
            className="bg-green-600 text-white text-[1.25rem] tracking-[.1rem] px-4 py-3 rounded hover:bg-green-700 transition"
          >
            Send Message
          </button>
        </form>
        <p className="w-[90%] text-black text-xl font-normal leading-normal">
          "Need help with your diet journey? Want to know more about healthy
          recipes or tracking your progress? Send us your questions,
          suggestions, or feedback. We're excited to hear from you!"
        </p>
        <p onClick={() => {navigate("/login")}} className="w-[100%] text-black text-2xl underline uppercase font-normal leading-normal cursor-pointer">
          "Start your healthy lifestyle today — sign up now!"
        </p>
      </div>
      <div className="right flex flex-1/2 justify-center items-center">
        <figure className="w-[45rem] ">
          <img src={rightImage} alt="image" />
        </figure>
      </div>
    </div>
  );
}
