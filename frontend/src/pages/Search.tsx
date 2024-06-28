import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);


  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
    apiClient.searchHotels(searchParams)
  );

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  const handleHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelType = event.target.value;

    setSelectedHotelTypes((prevHotelTypes) =>
      event.target.checked
        ? [...prevHotelTypes, hotelType]
        : prevHotelTypes.filter((hotel) => hotel !== hotelType)
    );
  };

  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;

    setSelectedFacilities((prevFacilities) =>
      event.target.checked
        ? [...prevFacilities, facility]
        : prevFacilities.filter((prevFacility) => prevFacility !== facility)
    );
  };

  return (

    <div className="relative">
    {/* Button for opening filter on mobile */}
    <button
      className="lg:hidden p-3 bg-blue-600 text-white rounded-md"
      onClick={() => setIsFilterOpen(!isFilterOpen)}
    >
      Filter
    </button>

    <div className="grid grid-cols-1 lg:grid-cols-[minmax(250px,300px)_1fr] gap-5 mt-5">
      {/* Filter sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 w-full lg:w-auto h-full lg:h-auto bg-white lg:bg-transparent p-5 lg:p-0 border border-slate-300 lg:border-none transition-transform transform ${
          isFilterOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-50 lg:z-auto`}
      >
        <div className="space-y-5">
          <div className="flex justify-between items-center lg:hidden">
            <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
              Filter by:
            </h3>
            <button
              className="text-red-600 font-bold"
              onClick={() => setIsFilterOpen(false)}
            >
              Close
            </button>
          </div>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleHotelTypeChange}
          />
          <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityChange}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          />
        </div>
      </div>

      {/* Hotel results */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} Apartement found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
            className="mt-2 sm:mt-0 p-2 border rounded-md"
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">
              Price Per Night (low to high)
            </option>
            <option value="pricePerNightDesc">
              Price Per Night (high to low)
            </option>
          </select>
        </div>
        {hotelData?.data.map((hotel) => (
          <SearchResultsCard hotel={hotel} />
         ))}
        <div>
         <Pagination
          page={hotelData?.pagination.page || 1}
          pages={hotelData?.pagination.pages || 1}
          onPageChange={(page) => setPage(page)}
           />
         </div>
       
      </div>
    </div>

    {/* Overlay for filter on mobile */}
    {isFilterOpen && (
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={() => setIsFilterOpen(false)}
      ></div>
    )}
  </div>
);
};
//     <div className="grid grid-cols-1 lg:grid-cols-[minmax(250px,300px)_1fr] gap-5">
//   <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
//     <div className="space-y-5">
//       <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
//         Filter by:
//       </h3>
//       <StarRatingFilter
//         selectedStars={selectedStars}
//         onChange={handleStarsChange}
//       />
//       <HotelTypesFilter
//         selectedHotelTypes={selectedHotelTypes}
//         onChange={handleHotelTypeChange}
//       />
//       <FacilitiesFilter
//         selectedFacilities={selectedFacilities}
//         onChange={handleFacilityChange}
//       />
//       <PriceFilter
//         selectedPrice={selectedPrice}
//         onChange={(value?: number) => setSelectedPrice(value)}
//       />
//     </div>
//   </div>
//   <div className="flex flex-col gap-5">
//     <div className="flex flex-col sm:flex-row justify-between items-center">
//       <span className="text-xl font-bold">
//         {hotelData?.pagination.total} Apartement found
//         {search.destination ? ` in ${search.destination}` : ""}
//       </span>
//       <select
//         value={sortOption}
//         onChange={(event) => setSortOption(event.target.value)}
//         className="mt-2 sm:mt-0 p-2 border rounded-md"
//       >
//         <option value="">Sort By</option>
//         <option value="starRating">Star Rating</option>
//         <option value="pricePerNightAsc">Price Per Night (low to high)</option>
//         <option value="pricePerNightDesc">Price Per Night (high to low)</option>
//       </select>
//     </div>

//     {/* // <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
//     //   <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
//     //     <div className="space-y-5">
//     //       <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
//     //         Filter by:
//     //       </h3>
//     //       <StarRatingFilter
//     //         selectedStars={selectedStars}
//     //         onChange={handleStarsChange}
//     //       />
//     //       <HotelTypesFilter
//     //         selectedHotelTypes={selectedHotelTypes}
//     //         onChange={handleHotelTypeChange}
//     //       />
//     //       <FacilitiesFilter
//     //         selectedFacilities={selectedFacilities}
//     //         onChange={handleFacilityChange}
//     //       />
//     //       <PriceFilter
//     //         selectedPrice={selectedPrice}
//     //         onChange={(value?: number) => setSelectedPrice(value)}
//     //       />
//     //     </div>
//     //   </div>
//     //   <div className="flex flex-col gap-5">
//     //     <div className="flex justify-between items-center">
//     //       <span className="text-xl font-bold">
//     //         {hotelData?.pagination.total} Apartement found
//     //         {search.destination ? ` in ${search.destination}` : ""}
//     //       </span>
//     //       <select
//     //         value={sortOption}
//     //         onChange={(event) => setSortOption(event.target.value)}
//     //         className="p-2 border rounded-md"
//     //       >
//     //         <option value="">Sort By</option>
//     //         <option value="starRating">Star Rating</option>
//     //         <option value="pricePerNightAsc">
//     //           Price Per Night (low to high)
//     //         </option>
//     //         <option value="pricePerNightDesc">
//     //           Price Per Night (high to low)
//     //         </option>
//     //       </select>
//     //     </div> */}
//         {hotelData?.data.map((hotel) => (
//           <SearchResultsCard hotel={hotel} />
//         ))}
//         <div>
//           <Pagination
//             page={hotelData?.pagination.page || 1}
//             pages={hotelData?.pagination.pages || 1}
//             onPageChange={(page) => setPage(page)}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

export default Search;
