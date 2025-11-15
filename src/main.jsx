import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import NavBar from "./Components/NavBar";
import VechicleEntry from "./Components/VehicleEntryComponents/VechicleEntry";
import Weighbridge from "./Components/Weighbridge/Weighbridge";
import Index from "./Components/Admin/index.jsx";
import SavedDrafts from "./Components/SavedDrafts/SavedDrafts.jsx";
import { Toaster } from "./Components/ui/toaster";
import { Toaster as Sonner } from "./Components/ui/sonner";
import { TooltipProvider } from "./Components/ui/tooltip.jsx";
import Analytics from "./Components/Analytics/Analytics.jsx";

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
      { path: "/saved-drafts", element: <SavedDrafts /> },
      { path: "/analytics", element: <Analytics /> },
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
    <Toaster />
    <Sonner />
    <RouterProvider router={routerProvider} />
  </StrictMode>
);
