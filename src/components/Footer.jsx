import React from "react";
import playstore from "../assets/playstore.jpg";
import appstore from "../assets/appstore.jpg";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";
import { BiLogoWhatsapp } from "react-icons/bi";
import { BiMailSend } from "react-icons/bi";

const Footer = () => {
  return (
    <>
      <div >
        <div className="md:flex justify-around mt-4">
          <div>
            <p className="font-bold">SiTix Corps</p>
            <a href="https://maps.app.goo.gl/mADRYGBDTanwKJWK6" className="no-underline text-black" target="_blank">
            <p className="w-52">
              Jl Topaz No. 7, Tlogomas, Lowokwaru, Kota Malang
            </p>
            </a>
            <a
              href="https://wa.me/6289648573922"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline text-black"
            >
              <div className="flex flex-row">
                <BiLogoWhatsapp size={34} color="green" />
                <p className="mt-1">+62 896-4857-3922</p>
              </div>
            </a>
            <div className="flex flex-row">
                <BiMailSend size={32} color="green" />
                <p className="mt-1">Helpcare@sitix.co.id</p>
              </div>
             
          </div>

          <div>
            <p className="font-bold">Company</p>
            <p>
              <a
                href="/aboutus"
                className="text-black no-underline hover:text-blue-500"
              >
                About Us
              </a>
            </p>
            <p>
              <a href="/term" className="text-black no-underline">
                Terms & Condition
              </a>
            </p>
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
        <hr />
        <div className="mt-3">
        <p className="text-center text-xl text-gray-500">PT SiTix Indonesia Tbk © 2024. All right Reserved</p>
      </div>
      </div>
    </>
  );
};

export default Footer;
