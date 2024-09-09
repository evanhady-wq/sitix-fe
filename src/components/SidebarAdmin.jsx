import React, { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, sidebarClasses } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../service/constants";
const SidebarAdmin = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchAdmin = async () => {
    try {
      const token = localStorage.getItem("token_admin");

      if (!token) {
        navigate("/signin");
        return;
      }

      const response = await axios.get(`${BASE_URL}/api/user`, {
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
    fetchAdmin();
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
          <p className="font-bold pl-4 pt-4">SiTix Admin</p>
          <div className="flex gap-2 pl-4 mx-2 mb-4 border-1 items-center rounded-xl h-16">
            <img
              src="https://static.vecteezy.com/system/resources/previews/000/290/610/non_2x/administration-vector-icon.jpg"
              className="w-10 h-10 rounded-full"
            />
            <div className="pt-2">
              <p className="text-sm mb-0">{admin.username}</p>
              <p className="text-sm font-bold">Admin</p>
            </div>
          </div>
          <MenuItem
            className="hover:text-custom-blue-3"
            component={<Link to="/admin/dashboard" />}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            className="hover:text-custom-blue-3"
            component={<Link to="/admin/customers" />}
          >
            View Customers
          </MenuItem>
          <MenuItem
            className="hover:text-custom-blue-3"
            component={<Link to="/admin/creators" />}
          >
            View Creators
          </MenuItem>
          <MenuItem
            className="hover:text-custom-blue-3"
            component={<Link to="/admin/eventcategory" />}
          >
            Manage Event Category
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

export default SidebarAdmin;
