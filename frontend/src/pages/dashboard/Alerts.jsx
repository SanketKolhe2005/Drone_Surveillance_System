import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";

import API from "../../api/axios";

const Alerts = () => {

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {

    const fetchAlerts = async () => {

      try {

        const response = await API.get("/alerts");

        setAlerts(response.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchAlerts();

    const interval = setInterval(fetchAlerts, 2000);

    return () => clearInterval(interval);

  }, []);

  return (

    <div className="flex bg-slate-950 min-h-screen">

      <Sidebar />

      <div className="ml-64 w-full">

        <Navbar />

        <div className="p-8 text-white">

          <h1 className="text-4xl font-bold mb-8">
            Live Alerts
          </h1>

          <div className="space-y-4">

            {alerts.length === 0 ? (

              <div className="
                bg-slate-800
                p-6
                rounded-xl
              ">
                No Alerts Yet
              </div>

            ) : (

              alerts.map((alert, index) => (

                <div
                  key={index}
                  className="
                    bg-red-600
                    p-5
                    rounded-xl
                    shadow-lg
                  "
                >

                  <h2 className="text-xl font-bold">
                    ⚠ {alert.message}
                  </h2>

                  <p className="mt-2 text-sm">
                    {alert.time}
                  </p>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </div>

  );
};

export default Alerts;
