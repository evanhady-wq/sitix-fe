import React, { useEffect, useState } from "react";
import SidebarCreator from "../components/SidebarCreator";
import HeaderCreator from "../components/HeaderCreator";
import { withLoading } from "../hoc/withLoading";
import { Button } from "@nextui-org/react";
import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../service/constants";

const CreatorPage = () => {
  const navigate = useNavigate();
  const [creator, setCreator] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token_creator");

      if (!token) {
        throw new Error("Token tidak ditemukan. Harap login terlebih dahulu.");
      }

      const response = await axios.get(`${BASE_URL}/api/creator/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCreator(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setError(`Failed to fetch creator profile: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <>
      {loading ? (
        <p></p>
      ) : (
        <div className="flex h-screen ">
          <div className="hidden md:inline">
            <SidebarCreator />
          </div>

          <div className="flex flex-col flex-grow">
            <HeaderCreator />
            <div className="w-[270px] md:w-[550px] flex-col bg-custom-blue-1 bg-opacity-80 text-white mx-4 mt-4 rounded-xl p-3">
              <div className="flex-row md:flex">
                <div className="mt-1 md:mt-8">
                  <p className="font-bold">Selamat Datang, {creator.name}</p>
                  <p className="text-sm">
                    Kamu berada di SiTix Creator. Di sini kamu dapat membuat
                    event, menjual tiketnya, hingga melihat performa penjualan
                    setiap event kamu.
                  </p>
                </div>
                <div className="w-[500px]">
                  <img
                    src={Logo}
                    className="transform scale-150 hidden md:inline"
                    alt="Logo"
                  />{" "}
                </div>
              </div>

              <Button
                className="bg-custom-blue-2 text-white font-bold"
                onClick={() => navigate("/creator/create-event")}
              >
                Buat Event
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default withLoading(CreatorPage);
