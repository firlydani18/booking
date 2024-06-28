import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import UserForm from "../forms/User/UserForm";


const MyProfilUser = () => {
  const { userId } = useParams();
  const {showToast} = useAppContext();

  const { data: user } = useQuery(
    "getUser",
   () => apiClient.getUser( userId || ""),
    {
      enabled: !!userId,
    }
  );

  const { mutate, isLoading } = useMutation(apiClient.putUser, {
    onSuccess: () => {
      showToast({ message: "Profile Saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error Saving Profile", type: "ERROR" });
    },
  });
  const handleSave = (UserFormData: FormData) => {
    mutate(UserFormData);
  };
  return (
    <UserForm user={user} onSave={handleSave} isLoading={isLoading} />
  );
};

//   return (
//     <div className="space-y-5">
//       <span className="flex justify-between">
//         <h1 className="text-3xl font-bold">My Profile</h1>
//         <Link
//           to="/get-user"
//           className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
//         >
//           Profile
//         </Link>
//       </span>
//       <div className="grid grid-cols-1 gap-8">
//         {userData.map((user) => (
//           <div
//             data-testid="user-card"
//             className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
//           >
//             <h2 className="text-2xl font-bold">{user.firstName}</h2>
//             <h2 className="text-2xl font-bold">{user.lastName}</h2>
//             <h2 className="text-2xl font-bold">{user.email}</h2>
//             <h2 className="text-2xl font-bold">{user.password}</h2>
//             <h2 className="text-2xl font-bold">{user.phone}</h2>
            
//             <span className="flex justify-end">
//               <Link
//                 to={`/edit-user/${user._id}`}
//                 className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
//               >
//                 Edit User
//               </Link>
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

export default MyProfilUser;
