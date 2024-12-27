import { RegisterUser } from "@/app/_global-components/RegisterUser";
import { DeleteUser } from "./_components/DeleteUser";
import { UpdateUserStatus } from "./_components/UpdateUserStatus";

const page = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center m-6">
        <div className="m-4">
          <RegisterUser role="admin" />
        </div>
        <div className="m-4">
          <DeleteUser />
        </div>
        <div className="m-4">
          <UpdateUserStatus />
        </div>
      </div>
    </div>
  );
};
export default page;
