import React from "react";
import SidebarCreator from "../components/SidebarCreator";
import HeaderCreator from "../components/HeaderCreator";

const CreatorCreateEvent = () => {
  return (
    <>
      <>
        <div className="flex h-screen ">
          <div className="hidden md:inline">
            <SidebarCreator />
          </div>

          <div className="flex flex-col flex-grow">
            <HeaderCreator />
            
            <div className="mx-2 mt-4">
            <div className="flex-col bg-custom-blue-1 bg-opacity-80 text-white rounded-xl p-3">
              <p className="font-bold">Create Event</p>
            </div>
            <div>
              tes
            </div>
          </div>

          </div>
        </div>
      </>
    </>
  );
};

export default CreatorCreateEvent;
