import { Card, CardBody } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import DummyCard from "../assets/DummyCard.jpeg";
import { IoLocation } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../service/constants";
import useAxios from "../hooks/useAxios";

const EventCard = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const { data, error: fetchError, loading: isLoading, refetch } = useAxios(
    `${BASE_URL}/api/event/allevent`,
    "GET",
    null 
  );

  useEffect(() => {
    if (data) {
      setEvents(data); 
    }
  }, [data]);
  
  const handleCardClick = (eventid) => {
    navigate(`/event/${eventid}`);
  };

  return (
    <div className="mx-16 my-8">
      <div>
        <p className="font-bold text-xl">Rekomendasi Event</p>
      </div>
      <div className="flex flex-wrap gap-4 ">
        {events.map((event) => (
          <div key={event.id} className="w-48">
            <Card className="w-[200px] cursor-pointer">
              <CardBody
                onClick={() => {
                  handleCardClick(event.id);
                }}
              >
                <img
                  src={DummyCard}
                  className="w-full h-48 rounded-md object-cover"
                  alt="Event"
                />
                <div className="pt-3 flex">
                  <IoLocation color="blue" />
                  <p className="text-xs text-gray-500 ml-1 truncate">
                    {event.city}
                  </p>
                </div>
                <p className="font-bold text-sm mb-0 truncate">{event.name}</p>
                <p className="text-xs text-gray-600 mb-0">
                  Date: {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  Creator: {event.creatorName}
                </p>
                <p className="font-bold text-sm mt-2">
                  {event.ticketCategories.length > 0
                    ? `Rp. ${event.ticketCategories[0].price.toLocaleString()}`
                    : "Price not available"}
                </p>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCard;
