import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import { CourseContextProvider } from "./context/CourseContext.jsx";

<<<<<<< HEAD
export const server = " http://localhost:5000";
=======
export const server = "https://upskill-mnqd.onrender.com";
>>>>>>> a84fe58cee9ab35ae75a81cf44526805485f2dfc

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <CourseContextProvider>
        <App />
      </CourseContextProvider>
    </UserContextProvider>
  </StrictMode>,
);
