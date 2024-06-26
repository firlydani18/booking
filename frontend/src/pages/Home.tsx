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
    <div className="space-y-3 min-h-screen overflow-hidden ">
      <section
          className="w-full h-[767px] bg-no-repeat bg-cover bg-center relative bg-black/10 bg-blend-soft-light"
          style={{
            backgroundImage: `url('https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20025804-3b976a46feb9aacbdcb85a04c09265fe.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-280,pr-true,q-80,w-412')`,
          }}
        >
        
        <div className='w-[1386px] h-[727px] text-[0px] absolute top-[32px] left-1/2 translate-x-[-50.9%] translate-y-0 overflow-hidden z-[5]'>
            <span className="block h-[75px] font-['Saira_SemiCondensed'] text-[70px] font-medium leading-[75px] text-[#f1f0f0] relative text-center whitespace-nowrap z-[6] mt-[237px] mr-0 mb-0 ml-[365px]">
              WELCOME GOLD COAST
            </span>
            <span className="block h-[110px] font-['Saira_SemiCondensed'] text-[70px] font-medium leading-[110px] text-[#f1f0f0] relative text-center whitespace-nowrap z-[7] mt-[4px] mr-0 mb-0 ml-[365px]">
              PIK BAHAMA  JAKARTA
            </span>
            <span className="block h-[32px] font-['Roboto'] text-[20px] font-medium leading-[23.438px] text-[#f1f0f0] relative text-center whitespace-nowrap z-[8] mt-0 mr-0 mb-0 ml-[365px]">
              RT.8/RW.2, Kanal Muara, Penjaringan, Nort Jakarta, City, Jakarta 14470
            </span>
            <span className="block h-[23px] font-['Roboto'] text-[20px] font-medium leading-[23px] text-[#f1f0f0] relative text-center whitespace-nowrap z-[8] mt-[11px] mr-0 mb-0 ml-[365px]">
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
