import React from "react";
import Navbar from "../pages/navbar";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <main>
        <Navbar />
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
