import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//react icons
import { FaOdysee, FaBarsStaggered, FaXmark } from "react-icons/fa6";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  //toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //navItems here
  const navItems = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Anime List",
      path: "/anime-list",
    },
    {
      label: "Ranking",
      path: "/ranking",
    },
    {
      label: "Social",
      path: "/social",
    },
  ];

  return (
    <header className="w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300">
      <nav className={`py-5 lg:px-24 px-4 ${isSticky? "sticky top-0 left-0 right-0 bg-red-300" : ""}`}>
        <div className="flex justify-between items-center text-base gap-8">
          {/* logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-red-600 flex items-center gap-2"
          >
            <FaOdysee className="inline-block" />
            Anime Widget
          </Link>

          {/* nav links for large device */}

          <ul className="md:flex space-x-12 hidden">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="block text-base text-black uppercase cursor-pointer hover:text-red-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* btn for lg devices */}
          <div className="space-x-12 hidden lg:flex items-center">
            <button>
              <FaBarsStaggered className="w-5 hover:text-red-700" />
            </button>
          </div>

          {/* menu btn for the mobile devices */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className='text-black focus:outline-none'>
              {isMenuOpen ? (
                <FaXmark className="w-5 hover:text-red-700" />
              ) : (
                <FaBarsStaggered className="w-5 hover:text-red-700" />
              )}
            </button>
          </div>

          {/* navItems for mobile devices */}
          <div className={`space-y-4 px-4 mt-16 py-5 bg-red-700 ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"} `}>
          {navItems.map((item, index) => (
              <ul key={index}>
                <Link
                  to={item.path}
                  className="block text-base text-white uppercase cursor-pointer hover:text-black-700"
                >
                  {item.label}
                </Link>
              </ul>
            ))}
          </div>

        </div>
      </nav>
    </header>
  );
};

export default Navbar;
