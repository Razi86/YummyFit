import "./index.css";
import App from "./App.jsx";
import "./i18n";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import FoodContextProvider from "./context/foodContext.jsx";
import AuthContextProvider from "./context/authContext.jsx";
import UsersContextProvider from "./context/usersContext.jsx";
import CommentContextProvider from "./context/commentContext.jsx";
import LanguageProvider from "./context/LanguageContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <AuthContextProvider>
          <UsersContextProvider>
            <CommentContextProvider>
              <FoodContextProvider>
                <App />
              </FoodContextProvider>
            </CommentContextProvider>
          </UsersContextProvider>
        </AuthContextProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
);
