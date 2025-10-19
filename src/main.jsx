import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import NavBar from "./Components/NavBar";
import VechicleEntry from "./Components/VehicleEntryComponents/VechicleEntry";
import Weighbridge from "./Components/Weighbridge/Weighbridge";
import Index from "./Components/Admin/index.jsx";

const routerProvider = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/entry", element: <VechicleEntry /> },
      { path: "/weigh", element: <Weighbridge /> },
      { path: "/projects", element: <div>Projects Page</div> },
      { path: "/consultation", element: <App /> },
      { path: "/admin", element: <Index /> },
    ],
  },
]);

function App() {
  return (
    <div className="h-full w-full flex flex-col items-center gap-7 bg-gray-50">
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
