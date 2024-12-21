export default function Home() {
  return (
    <div className="flex flex-col justify-center bg-black h-screen w-screen">
      <div className="flex flex-row justify-center items-center">
        <div
          className=" 
          rounded-sm
          h-80 w-1/3 m-6
        border-yellow-500 border-4 
        shadow-yellow-700 shadow-strong"
        >
          <div
            className="
             rounded-sm
           h-full w-full
        shadow-white shadow-saberglow"
          >
            <div
              className="
            
           h-full w-full
        shadow-yellow-700 shadow-innerStrong"
            ></div>
          </div>
        </div>
        <div
          className=" 
          rounded-sm
          h-80 w-1/3 m-6
        border-pink-500 border-4 
        shadow-pink-700 shadow-strong"
        >
          <div
            className="
             rounded-sm
           h-full w-full
        shadow-white shadow-saberglow"
          >
            <div
              className="
            
           h-full w-full
        shadow-pink-700 shadow-innerStrong"
            ></div>
          </div>
        </div>
        <div
          className=" 
          rounded-sm
          h-80 w-1/3 m-6
        border-emerald-500 border-4 
        shadow-emerald-700 shadow-strong"
        >
          <div
            className="
             rounded-sm
           h-full w-full
        shadow-white shadow-saberglow"
          >
            <div
              className="
            
           h-full w-full
        shadow-emerald-700 shadow-innerStrong"
            ></div>
          </div>
        </div>
      </div>

      <div
        className="flex flex-col justify-center
     bg-blue-500 h-3 my-20 
     border-blue-500 border-y-4 
     shadow-blue-700 shadow-strong"
      >
        <div
          className="
          bg-white h-[1px]
        shadow-white shadow-saberglow"
        ></div>
      </div>

      <div
        className="flex flex-col justify-center
     bg-red-500 h-3 my-20 
     border-red-500 border-y-4 
     shadow-red-700 shadow-strong"
      >
        {" "}
        <div
          className="
      bg-white h-[1px]
      shadow-white shadow-saberglow"
        ></div>
      </div>

      <div
        className="flex flex-col justify-center
     bg-green-500 h-3 my-20 
     border-green-500 border-y-4 
     shadow-green-700 shadow-strong"
      >
        {" "}
        <div
          className="
      bg-white h-[1px]
      shadow-white shadow-saberglow"
        ></div>
      </div>
      <div className="flex flex-row justify-center items-center">
        <div
          className=" 
          rounded-sm rounded-tr-full
          h-80 w-1/3 mx-6
        border-blue-500 border-4 
        shadow-blue-700 shadow-strong"
          
        >
          <div
            className="         
             rounded-sm
             rounded-es-full
           h-full w-full
        shadow-white shadow-saberglow"
          >
            <div
            className="
             rounded-md rounded-es-full
           h-full w-full
        shadow-blue-700 shadow-innerStrong"
          >
          </div>
          </div>
          
        </div>
        <div
          className=" 
          rounded-sm rounded-tr-full
          h-80 w-1/3 mx-6
        border-fuchsia-500 border-4 
        shadow-fuchsia-700 shadow-strong"
          
        >
          <div
            className="         
             rounded-sm
             rounded-es-full
           h-full w-full
        shadow-white shadow-saberglow"
          >
            <div
            className="
             rounded-md rounded-es-full
           h-full w-full
        shadow-fuchsia-700 shadow-innerStrong"
          >
          </div>
          </div>
          
        </div>
        <div
          className=" 
          rounded-sm rounded-tr-full
          h-80 w-1/3 mx-6
        border-orange-500 border-4 
        shadow-orange-700 shadow-strong"
          
        >
          <div
            className="         
             rounded-sm
             rounded-es-full
           h-full w-full
        shadow-white shadow-saberglow"
          >
            <div
            className="
             rounded-md rounded-es-full
           h-full w-full
        shadow-orange-700 shadow-innerStrong"
          >
          </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
