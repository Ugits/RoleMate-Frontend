import { Button } from "@/app/_global-components/Button";

const page = () => {
  return (
    <div>
      <div>User page</div>
      <Button title="Delete Me" color="crimson" pushPath="/home" />
    </div>
  );
};
export default page;
