import { RegisterUser } from "@/app/_global-components/RegisterUser";

const page = () => {
  return (
    <div>
      <div>ADMIN PAGE</div>
      <RegisterUser role="admin" />
    </div>
  );
};
export default page
