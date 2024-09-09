import React, { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, sidebarClasses } from "react-pro-sidebar";
import { FaFacebookSquare, FaInstagram, FaTwitterSquare } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../service/constants";

const SidebarCreator = () => {
  const [creator, setCreator] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCreator = async () => {
    try {
      const token = localStorage.getItem("token_creator");

      const response = await axios.get(`${BASE_URL}/api/creator/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCreator(response.data.data);
    } catch (error) {
      setError(`Failed to fetch creator profile: ${error.message}`);
     
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchCreator();
  }, []);
  
  return (
    <>
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "#1F316F",
            height: "100vh",
            position: "fixed",
            width: "250px",
          },
        }}
      >
        <Menu className="text-white">
          <p className="font-bold pl-4 pt-4">SiTix Creator</p>
          <div className="flex gap-2 pl-4 mx-2 mb-4 border-1 items-center rounded-xl h-16">
            {creator.profilePicture ? (
              <img src={creator.profilePicture} className="w-10 h-10 rounded-full" />
            ) : (
              <img src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png" className="w-10 h-10 rounded-full"/>
            )}
            
            <div className="pt-2">
              <p className="text-sm mb-0">{creator.name}</p>
              <p className="text-sm font-bold">Creator</p>
            </div>
          </div>
          <MenuItem
            className="hover:text-custom-blue-3"
            component={<Link to="/creator/dashboard" />}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            className="hover:text-custom-blue-3"
            component={<Link to="/creator/profile" />}
          >
            Profile
          </MenuItem>
          <MenuItem
            className="hover:text-custom-blue-3"
            component={<Link to="/creator/create-event" />}
          >
            Create Event
          </MenuItem>
          <MenuItem
            className="hover:text-custom-blue-3"
            component={<Link to="/creator/myevent" />}
          >
            My Event
          </MenuItem>

          <div className="mt-4">
            <MenuItem
              className="hover:text-custom-blue-3"
              component={<Link to="/aboutus" />}
            >
              <p className="font-bold mb-2">About Us</p>
            </MenuItem>
            <MenuItem
              className="hover:text-custom-blue-3"
              component={<Link to="/term" />}
            >
              <p className="font-bold mb-2">Term & Conditions</p>
            </MenuItem>
          </div>
        </Menu>
      </Sidebar>
    </>
  );
};

export default SidebarCreator;
