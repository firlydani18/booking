import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LastestDestinationCard";



const Home = () => {
  const { data: hotels } = useQuery("fetchQuery", () =>
    apiClient.fetchHotels()
  );

  const topRowHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.slice(2) || [];

  return (
    <div className="space-y-2 min-h-screen overflow-hidden ">
      <section
          className="w-full h-[767px] bg-no-repeat bg-cover bg-center relative bg-black/10 bg-blend-soft-light"
          style={{
            backgroundImage: `url('https://res.klook.com/klook-hotel/image/upload/fl_lossy.progressive,c_fill,f_auto,w_750,q_85/trip/200o190000017widnBC12_R_550_412_R5.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
        
        {/* <div className='w-full h-auto text-[0px] absolute top-[32px] left-1/2 translate-x-[-50%] overflow-hidden z-[5]'> */}
        <div className=' w-full h-auto text-[0px] absolute top-[32px] left-1/2 translate-x-[-50%] overflow-hidden z-[5]'>
        <span className="block h-auto font-['Saira_SemiCondensed'] text-[5vw] md:text-[70px] font-medium leading-none text-[#f1f0f0] relative text-center whitespace-nowrap z-[6] mt-[10vw] md:mt-[237px] ml-[5vw] md:ml-[365px]">
        WELCOME GOLD COAST
        </span>
        <span className="block h-auto font-['Saira_SemiCondensed'] text-[5vw] md:text-[70px] font-medium leading-none text-[#f1f0f0] relative text-center whitespace-nowrap z-[7] mt-[1vw] md:mt-[4px] ml-[5vw] md:ml-[365px]">
        PIK BAHAMA JAKARTA
        </span>
        <span className="block h-auto font-['Roboto'] text-[4vw] md:text-[20px] font-medium leading-none text-[#f1f0f0] relative text-center whitespace-nowrap z-[8] ml-[5vw] md:ml-[365px]">
        RT.8/RW.2, Kanal Muara, Penjaringan, North Jakarta, City, Jakarta 14470
        </span>
        <span className="block h-auto font-['Roboto'] text-[4vw] md:text-[20px] font-medium leading-none text-[#f1f0f0] relative text-center whitespace-nowrap z-[8] mt-[2vw] md:mt-[11px] ml-[5vw] md:ml-[365px]">
        Telp: 081519386878
        </span>
        </div>
        </section>
     
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {topRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {bottomRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
