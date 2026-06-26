import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";

import API from "../../api/axios";

const History = () => {

  const [detections, setDetections] = useState([]);

  useEffect(() => {

    const loadHistory = async () => {

      try {

        const response = await API.get("/history");

        setDetections(response.data);

      } catch (error) {

        console.log(error);

      }

    };

    loadHistory();

  }, []);

  return (

    <div className="flex bg-slate-950 min-h-screen">

      <Sidebar />

      <div className="ml-64 w-full">

        <Navbar />

        <div className="p-8 text-white">

          <h1 className="text-4xl font-bold mb-8">
            Detection History
          </h1>

          <table className="w-full bg-slate-900 rounded-xl overflow-hidden">

            <thead className="bg-cyan-600">

              <tr>

                <th className="p-4 text-left">
                  Object
                </th>

                <th className="p-4 text-left">
                  Confidence
                </th>

                <th className="p-4 text-left">
                  Timestamp
                </th>

                <th className="p-4 text-left">
                  Image
                </th>

              </tr>

            </thead>

            <tbody>

              {detections.map((item, index) => (

                <tr
                  key={index}
                  className="border-b border-slate-700"
                >

                  <td className="p-4">
                    {item.object_name}
                  </td>

                  <td className="p-4">
                    {(item.confidence * 100).toFixed(2)}%
                  </td>

                  <td className="p-4">
                    {item.timestamp}
                  </td>

                  <td className="p-4">

                    <img
                      src={`http://127.0.0.1:5000/detections/${item.image}`}
                      alt="Detection"
                      className="
                        w-32
                        h-20
                        object-cover
                        rounded-lg
                        border
                        border-cyan-400
                      "
                    />

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
};

export default History;