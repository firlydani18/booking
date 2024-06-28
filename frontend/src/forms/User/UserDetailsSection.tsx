import { useFormContext } from "react-hook-form";
import { UserFormData } from "./UserForm";
//import { RegisterFormData } from "../../pages/Register";

const UserDetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<UserFormData>();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">View Profile</h1>
      <label className="text-gray-700 text-sm font-bold flex-1">
        First Name
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("firstName", { required: "This field is required" })}
        ></input>
        {errors.firstName && (
          <span className="text-red-500">{errors.firstName.message}</span>
        )}
      </label>

        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "This field is required" })}
          ></input>
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          email
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("email", { required: "This field is required" })}
          ></input>
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </label>
      
      <label className="text-gray-700 text-sm font-bold flex-1">
          phone
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("phone", { required: "This field is required" })}
          ></input>
          {errors.phone && (
            <span className="text-red-500">{errors.phone.message}</span>
          )}
        </label>
      
    
</div>
  );
};

export default UserDetailsSection;
