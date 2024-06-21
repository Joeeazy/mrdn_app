import React from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
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
    <nav className="fixed top-2 z-50 w-screen px-4">
      <div className="container flex items-center justify-between rounded-lg bg-slate-200 py-3">
        {/* logo and name div */}
        <div className="flex flex-shrink-0 items-center justify-between">
          <img
            className="mr-2 ml-2"
            src="/logo.jpeg"
            width={60}
            height={30}
            alt="MeridianLogo"
          />
          <span className="text-sm tracking-tight text-white">MERIDIAN</span>
        </div>
        {/* nav items */}
        <div className="hidden lg:flex">
          <ul className="flex items-center gap-4">
            {/* NAV_LINKS = CONSTANTS */}
            {NAV_LINKS.map((item, index) => (
              <li key={index}>
                <Link
                  className="text-sm text-black hover:text-neutral-500"
                  href={item.url}
                >
                  {item.title}{" "}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* butttons div */}
        <div className="hidden lg:flex text-sm text-white">
          <button className="btn btn-active mr-2">Sign In</button>

          <button className="btn btn-active btn-neutral">Sign up</button>
        </div>
        <div className="flex-col justify-end text-white md:flex lg:hidden">
          <button onClick={toggleNavbar}>
            {mobileDrawerOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {mobileDrawerOpen && (
        <div className="rounded-md bg-black lg:hidden text-white">
          <ul className="flex flex-col items-center">
            {NAV_LINKS.map((item, index) => (
              <li key={index} className="py-6 ">
                <Link
                  className="text-sm text-white hover:bg-neutral-500"
                  href={item.url}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-center pb-8 text-white lg:hidden">
            <button className="btn btn-active mr-2">Sign In</button>

            <button className="btn btn-active btn-neutral">Sign up</button>
          </div>
        </div>
      )}
    </nav>
  );
}
