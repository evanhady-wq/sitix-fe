import React, { useEffect, useState } from "react";
import SidebarCreator from "../components/SidebarCreator";
import HeaderCreator from "../components/HeaderCreator";
import { withLoading } from "../hoc/withLoading";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../service/constants";
import { MdEventAvailable } from "react-icons/md";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  plugins,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend);

const CreatorPage = () => {
  const navigate = useNavigate();
  const [creator, setCreator] = useState([]);
  const [events, setEvents] = useState([]);
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

  const fetchEventByCreator = async () => {
    try {
      const token = localStorage.getItem("token_creator");

      if (!token) {
        throw new Error("Token tidak ditemukan. Harap login terlebih dahulu.");
      }

      const response = await axios.get(`${BASE_URL}/api/event/myevent`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(response.data.data);
      console.log("ini data event by creator  ", response.data.data);
    } catch (error) {
      setError(`Failed to fetch creator profile: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
    fetchEventByCreator();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

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
            <div className="mt-12 ml-6 w-[1200px]">
              <p className="text-3xl font-semibold">Event yang kamu buat</p>
              {events.length > 0 ? (
                events.map((event) => {
                  let totalPendapatan = 0;
                  let tiketPalingLaku = null;
                  let tiketKurangLaku = null;

                  const chartData = event.ticketCategories.map((category) => {
                    const pendapatanPerKategori =
                      (category.quota - category.availableTicket) *
                      category.price;

                    totalPendapatan += pendapatanPerKategori;

                    if (
                      !tiketPalingLaku ||
                      category.quota - category.availableTicket >
                        tiketPalingLaku.terjual
                    ) {
                      tiketPalingLaku = {
                        name: category.name,
                        terjual: category.quota - category.availableTicket,
                      };
                    }

                    if (
                      !tiketKurangLaku ||
                      category.quota - category.availableTicket <
                        tiketKurangLaku.terjual
                    ) {
                      tiketKurangLaku = {
                        name: category.name,
                        terjual: category.quota - category.availableTicket,
                      };
                    }

                    return {
                      name: category.name,
                      terjual: category.quota - category.availableTicket,
                    };
                  });

                  const pieChartData = {
                    labels: chartData.map((data) => data.name),
                    datasets: [
                      {
                        data: chartData.map((data) => data.terjual),
                        backgroundColor: [
                          "#FF6384",
                          "#36A2EB",
                          "#FFCE56",
                          "#4BC0C0",
                          "#9966FF",
                          "#FF9F40",
                        ],
                        hoveroffset: 10,
                      },
                    ],
                  };

                  return (
                    <Accordion key={event.id} className="mb-4" variant="shadow">
                      <AccordionItem title={event.name}>
                        <h4 className="font-light text-4xl">{event.name}</h4>
                        <p className="text-xl">{event.eventCategory}</p>
                        <p className="text-2xl -mt-3">{event.city}</p>
                        <h6>Tiket Kategori:</h6>
                        <div className="flex flex-row gap-32">
                          <div>
                            {event.ticketCategories.map((category) => (
                              <div key={category.id}>
                                <p className="ml-3">{category.name}</p>
                                <div className="ml-4">
                                  <p className="ml-5 -mt-2">
                                    Quota:{" "}
                                    <span className="ml-[203px]">
                                      {category.quota}
                                    </span>
                                  </p>
                                  <p className="ml-5 -mt-2">
                                    Tiket Tersisa:{" "}
                                    <span className="ml-[159px]">
                                      {category.availableTicket}
                                    </span>
                                  </p>
                                  <p className="ml-5 -mt-2">
                                    Harga:{" "}
                                    <span className="ml-[206px]">
                                      Rp {formatPrice(category.price)}
                                    </span>
                                  </p>
                                  <p className="ml-5 -mt-2">
                                    Tiket Terjual:{" "}
                                    <span className="ml-[160px]">
                                      {category.quota -
                                        category.availableTicket}
                                    </span>
                                  </p>
                                  <p className="ml-5 -mt-2">
                                    Pendapatan Per Kategori:{" "}
                                    <span className="ml-[70px]">
                                      Rp{" "}
                                      {formatPrice(
                                        (category.quota -
                                          category.availableTicket) *
                                          category.price
                                      )}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="-mt-7">
                            <h3>Analytic Data</h3>
                            <div>
                              <h5 className="mt-3">Perbandingan tiket terjual</h5>
                              <Pie data={pieChartData} className="mt-2" />
                            </div>
                            <div className="mt-4">
                              <p className="font-semibold text-xl">Performa Penjualan</p>
                              <p className="text-base">
                                Tiket paling laris: <span className="ml-5"></span> {tiketPalingLaku?.name} ({tiketPalingLaku?.terjual} terjual)
                              </p>
                              <p className="text-base">
                                Tiket kurang laku: <span className="ml-3"></span> {tiketKurangLaku?.name} ({tiketKurangLaku?.terjual} terjual)
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-2xl font-bold">
                            Total Pendapatan: Rp {formatPrice(totalPendapatan)}
                          </p>
                        </div>
                      </AccordionItem>
                    </Accordion>
                  );
                })
              ) : (
                <p>Kamu belum membuat event</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default withLoading(CreatorPage);
