import React from "react";
import { NavLink } from "react-router-dom";
function Navbar() {
  return (
    <nav className="h-15 text-xl ">
      <div className="flex h-full border justify-between items-center p-2">
        <div>
          <h2 className="font-semibold">MOVECUT</h2>
        </div>

        <ul className="flex justify-between items-center font-semibold gap-12 ">
          <NavLink
            to="/"
            className="hover:underline hover:underline-offset-6 font-semibold"
          >
            <li>Home</li>
          </NavLink>
          <NavLink
            to="/dashboard"
            className="hover:underline hover:underline-offset-6 font-semibold"
          >
            <li>Dashboard</li>
          </NavLink>

          <NavLink to="/movies" className="hover:underline underline-offset-6">
            <li>Movies</li>
          </NavLink>

          <NavLink to="/about" className="hover:underline underline-offset-6">
            <li>About</li>
          </NavLink>
        </ul>

        <ul className="flex justify-between items-center font-semibold gap-6">
          <NavLink to="/login" className="hover:underline underline-offset-6">
            <li>Login</li>
          </NavLink>

          <NavLink
            to="/register"
            className="hover:underline underline-offset-6"
          >
            <li>SignUp </li>
          </NavLink>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
