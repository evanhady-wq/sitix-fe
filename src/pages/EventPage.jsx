import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { withLoading } from "../hoc/withLoading";
import axios from "axios";
import { BASE_URL } from "../service/constants";
import { useNavigate, useParams } from "react-router-dom";
import DummyCard from "../assets/DummyCard.jpeg";
import { IoLocation } from "react-icons/io5";
import { Button, Input, Select } from "@nextui-org/react";
import useAxios from "../hooks/useAxios";

const EventPage = () => {
  const [event, setEvent] = useState(null);
  const { eventid } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const { data, error: fetchError, loading: isLoading, refetch } = useAxios(
    `${BASE_URL}/api/event/allevent/${eventid}`,
    "GET",
    null 
  );

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
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin'); 
      return; 
    }
    
    navigate(`/event/order/${eventid}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Header />
          <div className="flex mt-12 mx-24">
            <div className="w-1/3 flex justify-center ">
              <img
                src={data.poster}
                className="w-80 h-80 rounded-md object-cover"
              />
            </div>
            <div className="ml-8">
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
                <div className="bg-slate-200 rounded-xl p-2 h-[60px] w-[250px]">
                  <p className="text-sm mb-1">Tanggal</p>
                  <p className="font-bold text-sm">
                    {new Date(event.date)
                      .toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                  </p>
                  <div className="flex">
                    <IoLocation color="blue" className="pt-1" />
                    <p>{event.location}</p>
                  </div>
                </div>
                <div className="bg-slate-200 rounded-xl p-2 h-[60px] w-[250px]">
                  <p className="text-sm mb-1">Waktu Mulai </p>
                  <p className="font-bold text-sm">
                    {new Date(event.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="items-center justify-around my-4 p-2 w-[770px]">
                  <p className="font-bold">Description</p>
                  <p className="text-justify">
                    {event.description}
                  </p>
                  <Button
                    className="text-white font-bold bg-custom-blue-2 w-[150px]"
                    onClick={() => {
                      handleOrderClick(event.id);
                    }}
                  >
                    Beli Tiket Event
                  </Button>
                </div>
              </div>
              <div className="items-center justify-around  my-4 p-2 w-[770px]">
                <p className="font-bold">Description</p>
                <p className="text-justify">
                  {event.description}
                </p>
                <Button
                  className="text-white font-bold bg-custom-blue-2 w-[150px]"
                  onClick={() => {
                    handleOrderClick(event.id);
                  }}
                >
                  Beli Tiket Event
                </Button>
              </div>
            </div>
          </div>
          <div className="mb-2">
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default withLoading(EventPage);
