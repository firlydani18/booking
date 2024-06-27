// import { Link, useNavigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
// import brandLogo from "@/assets/brand.png"

const Header = () => {
  const { isLoggedIn } = useAppContext();
  const  navigate  = useNavigate();

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="h-auto text-3xl text-white font-bold tracking-tight">
          <Link to="/">GOLD COAST</Link>
        </span>

        <span className="flex space-x-2">
            <li className="cursor-pointer flex items-center text-white px-3 font-bold hover:bg-blue-600" onClick={() => navigate("/kontak")}>
              Kontak
            </li>
            <li className="cursor-pointer flex items-center text-white px-3 font-bold hover:bg-blue-600" onClick={() => navigate("/tentang")}>
              Tentang
            </li>
            {/* <ul className="flex items-center gap-x-10">
            
            </ul> */}

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
        </span>
      </div>
    </div>
  );
  };

export default Header;
