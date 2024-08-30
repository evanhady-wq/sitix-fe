import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import React, { useState } from "react";
import { VscListSelection } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const HeaderCreator = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    const confirmLogout = window.confirm("Log out?");
    if (confirmLogout) {
      localStorage.removeItem("token_creator");
      navigate("/signin");
    }
  };

  return (
    <>
      <header className="flex items-center sticky top-0 w-full bg-white border-b border-gray-200 z-50">
        <div
          className="container mx-0 md:mx-4 py-2 
        flex items-center justify-start md:justify-between"
        >
          <div className="inline md:hidden">
            <Dropdown>
              <DropdownTrigger>
                <Button className="h-12 p-1 bg-transparent" size="sm">
                  <VscListSelection color="#1F316F" size={20} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem onClick={() => navigate('/creator/dashboard')}>Dashboard</DropdownItem>
                <DropdownItem onClick={() => navigate('/creator/profile')}>Profile</DropdownItem>
                <DropdownItem onClick={() => navigate('/creator/create-event')}>Buat Event</DropdownItem>
                <DropdownItem onClick={() => navigate('/creator/event-saya')}>Event Saya</DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  onClick={handleSignOut}
                >
                  Sign Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="flex items-center space-x-4 cursor-pointer">
            <div className="text-custom-blue-3 font-bold text-3xl">
              Si
              <span className="text-custom-blue-1">Tix</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              className="bg-transparent border-2 border-custom-blue-2 
              text-custom-blue-2 font-bold text-md hidden md:inline"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderCreator;
