// import { Link, useNavigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
import { useState } from "react";
// import brandLogo from "@/assets/brand.png"

const Header = () => {
  const { isLoggedIn } = useAppContext();
  const  navigate  = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div className="bg-blue-500 py-6">
      <div className="container mx-auto flex items-center justify-between">
        <span className="h-auto text-1xl text-white font-bold tracking-tight">
          <Link to="/">GOLD COAST APARTEMENT</Link>
        </span>

        <div className="block lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>
        <span className={`lg:flex lg:items-center space-x-2 ${isMenuOpen ? "block" : "hidden"} lg:block`}>
          <li className="cursor-pointer flex items-center text-white px-3 font-bold hover:bg-blue-600" onClick={() => navigate("/kontak")}>
            Kontak
          </li>
          <li className="cursor-pointer flex items-center text-white px-3 font-bold hover:bg-blue-600" onClick={() => navigate("/tentang")}>
            Tentang
          </li>
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/my-hotels"
              >
                My Apartement
              </Link>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/getUser/:userId"
              >
                My Profil
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
            >
              Sign In
            </Link>
          )}
        

        {/* <span className="flex space-x-2">
            <li className="cursor-pointer flex items-center text-white px-3 font-bold hover:bg-blue-600" onClick={() => navigate("/kontak")}>
              Kontak
            </li>
            <li className="cursor-pointer flex items-center text-white px-3 font-bold hover:bg-blue-600" onClick={() => navigate("/tentang")}>
              Tentang
            </li>
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/my-hotels"
              >
                My Apartement
              </Link>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/getUser/:userId"
              >
                My Profil
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
            >
              Sign In
            </Link> */}
            
          
          
        </span>
      </div>
    </div>
  );
  };

export default Header;
