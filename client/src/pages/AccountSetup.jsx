import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoReturnUpBackOutline } from "react-icons/io5";

function AccountSetup() {
  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate("/");
  };
  return (
    <div className="account-setup h-[100vh]">
      <div className="container mx-auto max-w-[80%] pt-40 px-15">
        <h2 className="text-4xl mb-6 lato-black">Set up your account</h2>
        <p className="text-2xl mb-4 w-[65%]">
          Welcome to <b>YummyFit</b>! We're excited to help you on your journey
          to a healthier lifestyle.
          <br />
          <br />
          Let's get started setting up your account!
          <br />
          This will help us tailor your experience and provide you with
          personalized food recommendations.
        </p>
        <Link
          to={"/account-setup/food-preferences"}
          className="yummy-btn mt-10 px-4 py-2 inline-block lato-black text-lg"
        >
          Get Started
        </Link>
        <p onClick={handleBackToHome} className="flex items-center gap-2 tracking-[-.5px] mt-5 cursor-pointer text-md">
          <IoReturnUpBackOutline className="text-[1.3rem] text-[#FE486E]" />
          Back to Home
        </p>
      </div>
    </div>
  );
}

export default AccountSetup;
