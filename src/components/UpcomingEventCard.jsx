import { Card, CardBody } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { IoLocation } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../service/constants";
import useAxios from "../hooks/useAxios";

const UpcomingEvent = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const { data, error: fetchError, loading: isLoading, refetch } = useAxios(
    `${BASE_URL}/api/event/allevent/upcoming`,
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
    <div className="mx-16 my-8 hidden md:inline">
      <div>
        <p className="font-bold text-xl text-center">Upcoming Event</p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {events.length > 0 ? (
          events.map((event) => {
            const isEventOver = new Date(event.date) < new Date();
            return (
              <div key={event.id} className="w-48">
                <Card className="w-[200px] cursor-pointer transition-transform transform hover:scale-110 duration-300 relative">
                  <CardBody
                    onClick={() => {
                      handleCardClick(event.id);
                    }}
                    className="relative"
                  >
                    <div className="relative">
                      <img
                        src={event.poster}
                        className="w-full h-48 rounded-md object-cover"
                        alt="Event"
                      />
                      {isEventOver && (
                        <div className="absolute bottom-0 left-0 w-full bg-red-500 text-white text-center py-1 rounded-b-md">
                          Event berakhir
                        </div>
                      )}
                    </div>
                    <div className="pt-3 flex">
                      <IoLocation color="blue" />
                      <p className="text-xs text-gray-500 ml-1 truncate">
                        {event.city}
                      </p>
                    </div>
                    <p className="font-bold text-sm mb-0 truncate">
                      {event.name}
                    </p>
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
            );
          })
        ) : (
          <p>Event yang kamu cari gak ada </p>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvent;
