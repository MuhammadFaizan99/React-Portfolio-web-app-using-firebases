import React, { useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

export default function PortfolioRoot() {
  const [color, setColor] = useState(true);
  const changeTheme = () => {
    setColor(!color);
  };
  return (
    <div
      style={
        color
          ? { color: "black", backgroundColor: "white" }
          : { color: "white", backgroundColor: "black" }
      }
    >
      <Header changeTheme={changeTheme} color={color} />
      <Outlet />
      <Footer />
    </div>
  );
}
