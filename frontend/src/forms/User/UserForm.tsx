import { FormProvider, useForm } from "react-hook-form";
import UserDetailsSection from "./UserDetailsSection";
// import ImagesSection from "./ImagesSection";
import { UserType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";

export type UserFormData = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phone: string;
  password: string;
 // passwordConfirmation: string;
 
};

type Props = {
  user?: UserType;
  onSave: (RegisterFormData: FormData) => void;
  isLoading: boolean;
};

const UserFormData = ({ onSave, isLoading, user }: Props) => {
  const formMethods = useForm<UserFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(user);
  }, [user, reset]);

  const onSubmit = handleSubmit((formDataJson: UserFormData) => {
    const formData = new FormData();
    if (user) {
      formData.append("userId", user._id);
    }
    formData.append("firstName", formDataJson.firstName);
    formData.append("lastName", formDataJson.lastName);
    formData.append("role", formDataJson.role);
    formData.append("email", formDataJson.email);
    formData.append("password", formDataJson.password);

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        {/* <ImagesSection /> */}
        <UserDetailsSection />
        
        <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );


};

export default UserFormData;
