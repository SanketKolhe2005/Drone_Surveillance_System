import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";

import API from "../../api/axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const Dashboard = () => {

  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState([]);

  useEffect(() => {

    const loadData = async () => {

      try {

        const statsResponse = await API.get("/stats");

        setStats(statsResponse.data);

        const chartResponse = await API.get("/chart-data");

        setChartData(chartResponse.data);

      } catch (error) {

        console.log(error);

      }

    };

    loadData();

  }, []);

  return (

    <div className="flex bg-slate-950 min-h-screen">

      <Sidebar />

      <div className="ml-64 w-full">

        <Navbar />

        <div className="p-8 text-white">

          <h1 className="text-4xl font-bold mb-8">
            AI Surveillance Dashboard
          </h1>

          <div className="grid grid-cols-4 gap-6 mb-10">

            <div className="bg-slate-900 p-6 rounded-2xl">

              <h2 className="text-cyan-400 text-xl">
                Total Detections
              </h2>

              <p className="text-4xl font-bold mt-4">
                {stats.total_detections}
              </p>

            </div>

            <div className="bg-slate-900 p-6 rounded-2xl">

              <h2 className="text-red-400 text-xl">
                Total Alerts
              </h2>

              <p className="text-4xl font-bold mt-4">
                {stats.total_alerts}
              </p>

            </div>

            <div className="bg-slate-900 p-6 rounded-2xl">

              <h2 className="text-green-400 text-xl">
                Camera Status
              </h2>

              <p className="text-3xl font-bold mt-4">
                {stats.camera_status}
              </p>

            </div>

            <div className="bg-slate-900 p-6 rounded-2xl">

              <h2 className="text-yellow-400 text-xl">
                AI Model
              </h2>

              <p className="text-3xl font-bold mt-4">
                {stats.model}
              </p>

            </div>

          </div>

          <div className="bg-slate-900 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold mb-6">
              Detection Analytics
            </h2>

            <div style={{ width: "100%", height: 400 }}>

              <ResponsiveContainer>

                <BarChart data={chartData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="count"
                    fill="#06b6d4"
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default Dashboard;