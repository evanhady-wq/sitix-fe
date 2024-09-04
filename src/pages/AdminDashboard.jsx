import React, { useEffect, useState } from "react";
import { withLoading } from "../hoc/withLoading";
import HeaderAdmin from "../components/HeaderAdmin";
import SidebarAdmin from "../components/SidebarAdmin";
import { Button } from "@nextui-org/react";
import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../service/constants";
const AdminDashboard = () =>{
const navigate = useNavigate();
  const [admin, setAdmin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token_admin");

      if (!token) {
        // throw new Error("Token tidak ditemukan. Harap login terlebih dahulu.");
        navigate('/signin');
        return;
      }

      const response = await axios.get(`${BASE_URL}/api/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdmin(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setError(`Failed to fetch admin profile: ${error.message}`);
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
            <SidebarAdmin />
          </div>
          <div className="flex flex-col flex-grow">
          <HeaderAdmin />
          <div className=" mx-4 mt-4 text-2xl">
          <p className="font-bold">Selamat Datang, {admin.username}</p>
          <p className="font-bold">Anda Berada Dalam Halaman Admin SiTix</p>
          </div>
          <div className="flex flex-row flex-wrap">
            <div className="w-[270px] md:w-[550px] flex-col bg-custom-blue-1 bg-opacity-80 text-white mx-4 mt-4 rounded-xl p-3">
              <div className="flex-row md:flex">
                <div className="mt-1">
                  <p className="text-xl">
                    Anda dapat melihat data customer disini
                  </p>
                </div>
                <div className="w-[200px] -mt-4">
                  <img
                    src={Logo}
                    className="transform scale-150 hidden md:inline"
                    alt="Logo"
                  />{" "}
                </div>
              </div>

              <Button
                className="bg-custom-blue-2 text-white font-bold"
                onClick={() => navigate("/admin/customers")}
              >
                Lihat Data Customer
              </Button>
            </div>
            <div className="w-[270px] md:w-[550px] flex-col bg-custom-blue-1 bg-opacity-80 text-white mx-4 mt-4 rounded-xl p-3">
              <div className="flex-row md:flex">
                <div className="mt-1">
                  <p className="text-xl">
                    Anda dapat melihat data creator disini
                  </p>
                </div>
                <div className="w-[200px] -mt-4">
                  <img
                    src={Logo}
                    className="transform scale-150 hidden md:inline"
                    alt="Logo"
                  />{" "}
                </div>
              </div>

              <Button
                className="bg-custom-blue-2 text-white font-bold"
                onClick={() => navigate("/admin/creators")}
              >
                Lihat Data Creator
              </Button>
            </div>
            <div className="w-[270px] md:w-[550px] flex-col bg-custom-blue-1 bg-opacity-80 text-white mx-4 mt-4 rounded-xl p-3">
              <div className="flex-row md:flex">
                <div className="mt-1">
                  <p className="text-xl">
                    Anda dapat menambahkan kategori event disini
                  </p>
                </div>
                <div className="w-[200px] -mt-4">
                  <img
                    src={Logo}
                    className="transform scale-150 hidden md:inline"
                    alt="Logo"
                  />{" "}
                </div>
              </div>

              <Button
                className="bg-custom-blue-2 text-white font-bold"
                onClick={() => navigate("/admin/eventcategory")}
              >
                Tambah Kategori Event
              </Button>
            </div>
            </div>
          </div>
        </div>
      )}
        </>
    )
}

export default withLoading(AdminDashboard);