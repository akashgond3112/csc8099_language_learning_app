import React from "react";
import Navbar from "../pages/navbar";
import { Outlet } from "react-router-dom";

type Props = {};

function RootLayout({}: Props) {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
