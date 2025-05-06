import { Link } from "react-router-dom"

function AccountSetup() {
  return (
    <div className="account-setup h-[100vh]">
        <div className="container mx-auto max-w-[80%] py-20 px-15">
            <h2 className="text-3xl mb-6 lato-black">
            Set up your account
            </h2>
            <p className="text-lg mb-4 w-[65%]">
                Welcome to <b>YummyFit</b>! We're excited to help you on your journey to a healthier lifestyle.
                <br />
                <br />
               
            Let's get started setting up your account!
            <br />
             This will help us tailor your experience and provide you with personalized food recommendations.
            </p>
            <Link to={"/account-setup/food-preferences"} className="yummy-btn mt-10 px-4 py-2 inline-block lato-black">
                Get Started
            </Link>
        </div>
        
    </div>
  )
}

export default AccountSetup