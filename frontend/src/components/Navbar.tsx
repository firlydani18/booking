
import { useLocation, useNavigate } from "react-router-dom";



const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  

  return (
    <div className="p-3 shadow">
      <div className="container flex items-center justify-between ">
       
        <ul className="flex items-center gap-x-10">
          <li
            className={`cursor-pointer ${location.pathname === "/" && "font-medium"}`}
            onClick={() => navigate("/")}
          >
            Beranda
          </li>
          <li className="cursor-pointer" onClick={() => navigate("/kontak")}>
            Kontak
          </li>
          <li className="cursor-pointer" onClick={() => navigate("/tentang")}>
            Tentang
          </li>
         
          
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
