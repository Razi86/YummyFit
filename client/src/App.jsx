import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Food from "./pages/Food";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import RecipeDetail from "./pages/RecipeDetail";
import FoodType from "./pages/FoodType";
import EditProfile from "./pages/EditProfile";
import ScrollToTop from "./components/ScrollToTop";
import AccountSetup from "./components/AccountSetup";
import FoodPreferences from "./components/FoodPreferences";
import FoodAvoid from "./components/FoodAvoid";
import UserInfo from "./components/UserInfo";
import MainLayout from "./layouts/MainLayout";
import BlankLayout from "./layouts/BlankLayout";
import AdminPanel from "./pages/AdminPanel";
import "./i18n";
import LiveChatWidget from "./components/LiveChatWidget";

function App() {
  return (
    <div className="w-full bg-[#fcfcfc] relative">
      <ScrollToTop />
      <LiveChatWidget />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/food" element={<Food />} />
          <Route path="/food/:id" element={<RecipeDetail />} />
          <Route path="/foodType/:type" element={<FoodType />} />
        </Route>

        <Route element={<BlankLayout />}>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account-setup" element={<AccountSetup />} />
          <Route
            path="/account-setup/food-preferences"
            element={<FoodPreferences />}
          />
          <Route path="/account-setup/food-avoid" element={<FoodAvoid />} />
          <Route path="/account-setup/user-info" element={<UserInfo />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
