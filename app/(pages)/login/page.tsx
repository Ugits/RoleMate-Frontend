import Login from "./_components/Login";

const page = () => {
  return (
    <div className="flex flex-col items-center p-4">
      <p className="text-3xl">Login</p>
      <div className="flex flex-col justify-center items-center m-4">
        <Login />
      </div>
    </div>
  );
};

export default page;