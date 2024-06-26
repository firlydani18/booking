
import React from "react";
import Navbar from "../components/Navbar";

const AboutUsPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div
        className="bg-cover bg-center flex items-center bg-black py-24 2xl:h-[80vh] "
        style={{
          backgroundImage: 'url("https://cf.bstatic.com/xdata/images/hotel/max500/269066299.jpg?k=cf4cb71793e82d45df81c3f8fa202345a924d55dfee708f3c604dec40a0a4be5&o=&hp=1")',
          filter: "blur(0.2px)",
        }}
      >
        <div className="container mx-auto px-20 md:px-40 drop-shadow-lg ">
          <h1 className="text-5xl font-bold mb-4 text-white z-10 relative">Tentang Kami - Apartement Gold Coast Bahama PIK Jakarta</h1>
          <p className="text-white text-6x2 font-bold mb-4 pr-30 ">
          Welcome to Gold Coast Bahamas PIK Jakarta! We are a comfortable and affordable apartment rental place. With a commitment to providing the best service to customers, we strive to be the first choice for those looking for temporary housing. 
            The apartments is first luxury sea view in the area with five stars facilities, Large windows, open balcony and a beautiful view of the java sea and golf island view. Stay cool with central A/C and wind-down comfortably in the King / queen sized bedroom.
          </p>
          <p className="text-white font-bold pr-30 ">
             Conveniently located in Pantai Indah Kapuk which is just 8 KM from the Jakarta's  Airport (CKG), our apartment will sweep you into the charm and excitements of North of Jakarta facing the Java Sea and Golf Island! Dine at one of our neighbourhood’s  
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
      <footer className="bg-lime-600 text-white py-4">
        <div className="container mx-auto text-center">
          <p>Hak Cipta © {new Date().getFullYear()} Gold Coast Bahama PIK Jakarta. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUsPage;
