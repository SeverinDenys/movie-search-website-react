import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import MyWatchList from "./components/MyWatchList/MyWatchList.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";

//// i need to share the state between movie (the movie i chosed and MyWatchList) to do this is need to use React Context
//// fist to do with localStorage. if it works - create new branch and try to recreate with context or redux

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/myWatchList/",
    element: <MyWatchList/>,
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
