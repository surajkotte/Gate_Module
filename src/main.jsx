import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import NavBar from "./Components/NavBar";
import VechicleEntry from "./Components/VehicleEntryComponents/VechicleEntry";
import Weighbridge from "./Components/Weighbridge/Weighbridge";

const routerProvider = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/entry", element: <VechicleEntry /> },
      { path: "/weigh", element: <Weighbridge /> },
      { path: "/projects", element: <div>Projects Page</div> },
      { path: "/consultation", element: <App /> },
    ],
  },
]);

function App() {
  return (
    <div className="h-full w-full flex flex-col items-center gap-7">
      <NavBar />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routerProvider} />
  </StrictMode>
);
