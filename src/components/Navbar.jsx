import React from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function Navbar() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  //function to toggle mobile navbar
  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const NAV_LINKS = [
    { title: "Popular", url: "#" },
    { title: "Trending", url: "#" },
    { title: "Most Watched", url: "#" },
    { title: "Movies", url: "#" },
    { title: "Music", url: "#" },
  ];

  return (
    <nav className="fixed top-2 z-50 w-full px-4">
      <div className="mx-auto max-w-screen-xl flex items-center justify-between rounded-lg bg-base-200 py-3">
        {/* logo and name div */}
        <div className="flex items-center">
          <img
            className="mr-2 ml-2"
            src="/logo.jpeg"
            width={60}
            height={30}
            alt="MeridianLogo"
          />
          <span className="text-sm tracking-tight text-black">MERIDIAN</span>
        </div>
        {/* nav items */}
        <div className="hidden lg:flex">
          <ul className="flex items-center gap-4">
            {/* NAV_LINKS = CONSTANTS */}
            {NAV_LINKS.map((item, index) => (
              <li key={index}>
                <Link
                  className="text-sm text-black hover:text-neutral-500"
                  to={item.url}
                >
                  {item.title}{" "}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* buttons div */}
        <div className="hidden lg:flex text-sm text-white">
          {/* {login} */}
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <Login />

          {/* <button className="btn btn-active mr-2"></button> */}
          <Signup />
        </div>
        <div className="flex lg:hidden">
          <button onClick={toggleNavbar}>
            {mobileDrawerOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {mobileDrawerOpen && (
        <div className="rounded-md bg-gray-400 lg:hidden text-white">
          <ul className="flex flex-col items-center">
            {NAV_LINKS.map((item, index) => (
              <li key={index} className="py-6 ">
                <Link
                  className="text-sm text-white hover:bg-neutral-500"
                  to={item.url}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-center pb-8 text-white">
            <Login />
            <Signup />
          </div>
        </div>
      )}
    </nav>
  );
}
