import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const ab = Math.ceil(Math.random() * 7) * Math.ceil(Math.random() * 2 + 2);
console.log(ab);
const Navbar = () => {
  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="" />
      <img
        className="profile"
        src={`https://randomuser.me/api/portraits/men/${ab}.jpg`}
        alt=""
      />
    </div>
  );
};

export default Navbar;
