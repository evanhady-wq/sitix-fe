import React from "react";
import playstore from "../assets/playstore.jpg";
import appstore from "../assets/appstore.jpg";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";

const Footer = () => {
  return (
    <>
      <div>
        <div className="md:flex justify-around mt-4">
          <div>
            <p className="font-bold">SiTix Corps</p>
            <p className="w-52">
              Jl Topaz No. 7, Tlogomas, Lowokwaru, Kota Malang
            </p>
          </div>

          <div>
            <p className="font-bold">Company</p>
            <p>About Us</p>
            <p>Terms & Condition</p>
          </div>

          <div>
            <p className="font-bold">Follow Us</p>
            <div className="flex gap-2">
            <FaInstagram />
            <FaFacebookSquare />
            <FaTwitterSquare />
            <CiYoutube />
            </div>
          </div>

          <div>
            <p className="font-bold">Download App</p>
            <div className="flex">
              <img src={playstore} className="w-22 h-12" />
              <img src={appstore} className="w-22 h-12" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
