import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";

const Settings = () => {

  return (

    <div className="flex bg-slate-950 min-h-screen">

      <Sidebar />

      <div className="ml-64 w-full">

        <Navbar />

        <div className="p-8 text-white">

          <h1 className="text-4xl font-bold mb-8">
            Settings
          </h1>

          <div className="
            bg-slate-900
            p-8
            rounded-2xl
            w-[500px]
          ">

            <div className="
              flex
              justify-between
              items-center
              mb-6
            ">

              <h2 className="text-xl">
                Camera Status
              </h2>

              <button className="
                bg-green-500
                px-4
                py-2
                rounded-lg
              ">
                Active
              </button>

            </div>

            <div className="
              flex
              justify-between
              items-center
              mb-6
            ">

              <h2 className="text-xl">
                AI Model
              </h2>

              <button className="
                bg-cyan-500
                px-4
                py-2
                rounded-lg
              ">
                YOLOv8
              </button>

            </div>

            <div className="
              flex
              justify-between
              items-center
            ">

              <h2 className="text-xl">
                Detection System
              </h2>

              <button className="
                bg-red-500
                px-4
                py-2
                rounded-lg
              ">
                Running
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default Settings;