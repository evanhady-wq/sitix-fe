import React, { useEffect, useState } from "react";
import HeaderWithoutInput from "../components/HeaderWithoutInput";
import Footer from "../components/Footer";
import { withLoading } from "../hoc/withLoading";
import axios from "axios";
import { BASE_URL } from "../service/constants";
import { useNavigate, useParams } from "react-router-dom";
import DummyCard from "../assets/DummyCard.jpeg";
import { IoLocation } from "react-icons/io5";
import { Button, Input, Select } from "@nextui-org/react";
import useAxios from "../hooks/useAxios";
import { FaSpinner } from "react-icons/fa";

const EventPage = () => {
  const [event, setEvent] = useState(null);
  const { eventid } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {
    data,
    error: fetchError,
    loading: isLoading,
    refetch,
  } = useAxios(`${BASE_URL}/api/event/allevent/${eventid}`, "GET", null);

  useEffect(() => {
    if (data) {
      setEvent(data);
      setError(null);
    } else if (fetchError) {
      setError(fetchError);
    }
    setLoading(isLoading);
  }, [data, fetchError, isLoading]);

  const handleOrderClick = (eventid) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    navigate(`/event/order/${eventid}`);
  };

  const isEventOver = event ? new Date(event.date) < new Date() : false;
  
  return (
    <div className="flex flex-col min-h-screen">
      {loading ? (
        <div> </div>
      ) : (
        <>
          <HeaderWithoutInput />
          <div className="md:flex md:mt-12 mx-3 md:mx-24">
            <div className="md:w-1/3 flex justify-center relative">
              <img
                src={data.poster}
                className="w-96 h-96 rounded-md object-cover"
              />
              {isEventOver && (
                <div className="absolute bottom-0 w-96 bg-red-500 text-white text-center py-2 rounded-b-md">
                  Event berakhir
                </div>
              )}
            </div>
            <div className="md:ml-8">
              <h1 className="text-3xl">{event.name}</h1>
              <div className="flex space-x-24">
                <p>
                  oleh <span className="font-bold">{event.creatorName} </span>
                </p>
                <div className="flex">
                  <IoLocation color="blue" className="pt-1" />
                  <p className="">{event.city}</p>
                </div>
              </div>

              <div className="flex space-x-2">
              <div className="bg-slate-200 rounded-xl p-2 md:h-[80px] w-[250px]">
                  <p className="text-sm mb-1">Tanggal</p>
                  <p className="font-bold text-lg">
                    {new Date(event.date).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="bg-slate-200 rounded-xl p-2 md:h-[80px] w-[250px]">
                  <p className="text-sm mb-1">Waktu Mulai </p>
                  <p className="font-bold text-lg">
                    {new Date(event.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="bg-slate-200 rounded-xl p-2 md:h-[80px] w-[250px]">
                  <p className="text-sm mb-1">Tipe Event </p>
                  <p className="font-bold text-lg">
                    {event.eventCategory}  
                  </p>
                </div>
              </div>
              <div className="items-center justify-around  my-4 p-2 md:w-[770px]">
                <p className="font-bold">Description</p>
                <p className="text-justify">{event.description}</p>
                {isEventOver ? (
                  <Button
                  size="lg"
                  isDisabled>
                    Event Berakhir
                  </Button>
                ):(<Button
                  className="text-white font-bold bg-custom-blue-2 w-[150px]"
                  onClick={() => {
                    handleOrderClick(event.id);
                  }}
                  size="lg"
                >
                  Beli Tiket Event
                </Button>)}
              </div>
            </div>
          </div>
          <div className="mt-auto">
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default withLoading(EventPage);
