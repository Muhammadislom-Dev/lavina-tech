import React from "react";
import "./App.css";
import Auth from "./pages/Auth";
import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  const routes = useRoutes([
    { path: "/", element: <Auth /> },
    { path: "/books", element: <Home /> },
  ]);

  return routes;
}

export default App;
