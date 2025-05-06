import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import FoodContextProvider from "./context/foodContext.jsx";
import AuthContextProvider from "./context/authContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <FoodContextProvider>
          <App />
        </FoodContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
