
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SignOutButton from "../components/SignOutButton";
import { useAppContext } from "../contexts/AppContext";


const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between ">
       
        <ul className="flex items-right gap-x-10">
          <li
            className={`cursor-pointer flex items-center text-white px-3 font-bold hover:bg-blue-600 ${location.pathname === "/" && "font-medium"}`}
            onClick={() => navigate("/")}
          >
            Beranda
          </li>
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
          
        </ul>
      </div>
      <span className="flex space-x-2 ">
          
        </span>
    </div>
  );
};

export default Navbar;
