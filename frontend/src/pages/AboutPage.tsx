
import React from "react";
import Navbar from "../components/Navbar";
// import { Link } from "react-router-dom";
// import SignOutButton from "../components/SignOutButton";
// import { useAppContext } from "../contexts/AppContext";


const AboutUsPage: React.FC = () => {
  // const { isLoggedIn } = useAppContext();
  return (
    <div>
      <Navbar />
      {/* <span className="flex space-x-2">
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
        </span> */}
      <div
        className="bg-cover bg-center flex items-center  bg-black py-24 2xl:h-[80vh] relative z-0 "
        style={{
          backgroundImage: 'url("https://cf.bstatic.com/xdata/images/hotel/max500/269066299.jpg?k=cf4cb71793e82d45df81c3f8fa202345a924d55dfee708f3c604dec40a0a4be5&o=&hp=1")',
          filter: "blur(0.2px)",
          zIndex: -1,
        }}
      >
        
          <div className="container mx-auto px-4 sm:px-6 md:px-20 lg:px-40 drop-shadow-lg ">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white z-10 relative">
              Tentang Kami - Apartement Gold Coast Bahama PIK Jakarta
            </h1>
            <p className="text-white text-base sm:text-lg md:text-xl font-bold mb-4 pr-0 sm:pr-10 md:pr-20">
              Welcome to Gold Coast Bahamas PIK Jakarta! We are a comfortable and affordable apartment rental place. With a commitment to providing the best service to customers, we strive to be the first choice for those looking for temporary housing. 
              The apartments is first luxury sea view in the area with five stars facilities, Large windows, open balcony and a beautiful view of the java sea and golf island view. Stay cool with central A/C and wind-down comfortably in the King / queen sized bedroom.
            </p>
            <p className="text-white text-base sm:text-lg md:text-xl font-bold pr-0 sm:pr-10 md:pr-20">
              Conveniently located in Pantai Indah Kapuk which is just 8 KM from the Jakarta's Airport (CKG), our apartment will sweep you into the charm and excitements of North of Jakarta facing the Java Sea and Golf Island! Dine at one of our neighbourhood’s 
              many world-renowned restaurants, enjoy beautiful Indonesia's street food with LIVE music along the Golf Island,.
            </p>
          </div>

      </div>
      <section className="bg-gray-100 py-12 ">
        <div className="container mx-auto px-4 md:px-20">
          <h2 className="text-2xl font-bold mb-4">Testimoni Pelanggan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p>"Pelayanan dari Gold Coast Bahama PIK Jakarta sangat memuaskan. Saya merasa betah tinggal di kosan mereka."</p>
              <p className="text-sm mt-2">- John Doe</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p>"Saya sangat senang dengan fasilitas yang disediakan oleh Gold Coast Bahama PIK Jakarta. Sangat recommended!"</p>
              <p className="text-sm mt-2">- Jane Smith</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p>"Gold Coast Bahama PIK Jakarta memberikan harga yang sangat terjangkau tanpa mengorbankan kenyamanan."</p>
              <p className="text-sm mt-2">- Michael Johnson</p>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-blue-800 py-10">
        <div className="container mx-auto flex justify-between items-center ">
          <div className="flex items-center space-x-4 text-white">
            <p>Hak Cipta © {new Date().getFullYear()} Gold Coast Bahama PIK Jakarta. All rights reserved.</p>
          </div>
          
        </div>
      </footer>
    </div>
  );
};

export default AboutUsPage;
