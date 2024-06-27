import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";


const MyProfilUser = () => {
  const { data: userData } = useQuery(
    "getUser",
    apiClient.fetchCurrentUser,
    {
      onError: () => {},
    }
  );

  if (!userData) {
    return <span>No Users found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <Link
          to="/get-user"
          className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
        >
          Profile
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {userData.map((user) => (
          <div
            data-testid="user-card"
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
          >
            <h2 className="text-2xl font-bold">{user.firstName}</h2>
            <h2 className="text-2xl font-bold">{user.lastName}</h2>
            <h2 className="text-2xl font-bold">{user.email}</h2>
            <h2 className="text-2xl font-bold">{user.password}</h2>
            <h2 className="text-2xl font-bold">{user.phone}</h2>
            
            <span className="flex justify-end">
              <Link
                to={`/edit-user/${user._id}`}
                className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProfilUser;
