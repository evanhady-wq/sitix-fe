import React from "react";
import Logo3 from "../assets/Logo3.png";
import event1 from "../assets/event1.jpeg";
import event2 from "../assets/event2.jpeg";
import event3 from "../assets/event3.jpg";
import ewallet1 from "../assets/ewallet1.png";
import share1 from "../assets/share1.png";
import topCreator from "../assets/topCreator.png";
import everyone from "../assets/everyone.png";
import creatorPreneur from "../assets/creatorPreneur.png";
import dinokuning from "../assets/dinokuning.jpg";
import dinokuning2 from "../assets/dinokuning2.jpeg";
import customer from "../assets/customer.png";
import person1 from "../assets/person1.png";
import person2 from "../assets/person2.png";
import person3 from "../assets/person3.png";
import person4 from "../assets/person4.png";
import person5 from "../assets/person5.png";
import { Button } from "@nextui-org/react";
import Footer from "../components/Footer";

const goToSignIn = () => {
  window.location.href = "/signup";
};
const AboutUs = () => {
  return (
    <div>
      <div className="flex flex-row items-center sticky top-0 bg-white z-50">
        <a href="/" className="flex flex-row no-underline">
          <img
            src={Logo3}
            alt="Logo"
            className="h-16 w-16 ml-4 md:h-20 md:w-20 md:ml-20"
          />
          <div className="text-custom-blue-3 font-bold text-4xl md:text-7xl -ml-2 md:-ml-4">
            Si
            <span className="text-custom-blue-1">Tix</span>
            <span className="text-blue-1000 text-sm md:text-lg ml-2 md:ml-5 hidden md:inline">
              Keep it simple and proper
            </span>
          </div>
        </a>
        <div className="ml-auto mr-4 md:mr-40 hidden md:inline">
          <div className="flex gap-3 md:gap-5 items-center text-lg md:text-xl">
            <a
              href="#apa"
              className="text-custom-blue-3 font-semibold no-underline"
            >
              Tentang
            </a>
            <a
              href="#creator"
              className="text-custom-blue-3 font-semibold no-underline"
            >
              Creator
            </a>
            <a
              href="#kenapa"
              className="text-custom-blue-3 font-semibold no-underline"
            >
              Why SiTix
            </a>
            <a
              href="#kata"
              className="text-custom-blue-3 font-semibold no-underline"
            >
              Testi
            </a>
            <a
              href="#bisa"
              className="text-custom-blue-3 font-semibold no-underline"
            >
              Fitur
            </a>
            <Button onClick={goToSignIn} size="lg" color="danger">
              Gabung Gratis
            </Button>
          </div>
        </div>
      </div>

      <div
        className="bg-red-100/20 h-auto md:h-[400px] pt-10 md:pt-20 w-full"
        id="apa"
      >
        <div className="flex flex-col items-center gap-4 md:gap-6">
          <h1 className="text-custom-blue-3 font-bold text-3xl md:text-5xl">
            Kenalan sama{" "}
            <span className="font-semibold text-custom-blue-3">Si</span>
            <span className="font-semibold text-custom-blue-1">Tix</span>
          </h1>
          <div className="text-gray-800 text-center px-4 md:px-0 text-base md:text-xl md:w-[800px]">
            <p>
              <span className="font-semibold text-custom-blue-3">Si</span>
              <span className="font-semibold text-custom-blue-1">Tix</span>{" "}
              adalah platform yang menyediakan berbagai kelas-kelas tiket
              virtual yang dapat dibeli dan diikuti oleh orang-orang yang ingin
              bermain.
            </p>
            <p className="mt-2">
              Kami berkomitmen untuk memberikan pengalaman yang mudah, tersedia
              kapan saja, dan berkualitas tinggi kepada semua pengguna.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 mt-12" id="creator">
        <h1 className="text-center text-3xl md:text-5xl font-semibold">
          Creator Top di{" "}
          <span className="font-semibold text-custom-blue-3">Si</span>
          <span className="font-semibold text-custom-blue-1">Tix</span>
        </h1>
        <div className="grid grid-cols-1 justify-around md:grid-cols-3 gap-3">
          <div className="w-full h-64">
            <img
              src={event1}
              alt="event1"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="w-full h-64">
            <img
              src={event2}
              alt="event2"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="w-full h-64">
            <img
              src={event3}
              alt="event3"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>

      <div className="bg-blue-100/30 mt-12 md:mt-32 p-4 md:p-10" id="kenapa">
        <h1 className="text-center text-3xl md:text-5xl font-semibold">
          Kenapa Harus{" "}
          <span className="font-semibold text-custom-blue-3">Si</span>
          <span className="font-semibold text-custom-blue-1">Tix</span>
        </h1>
        <div className="mt-8 flex flex-col md:flex-row justify-center gap-8">
          <div className="flex flex-col items-center">
            <img
              src={ewallet1}
              alt="ewallet"
              className="h-40 w-40 md:h-64 md:w-64"
            />
            <p className="text-gray-900 font-semibold text-xl">
              Kendalikan Pendapatanmu
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={share1}
              alt="share"
              className="h-40 w-40 md:h-64 md:w-64"
            />
            <p className="text-gray-900 font-semibold text-xl">
              Bagikan Berbagai Karya
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={topCreator}
              alt="topCreator"
              className="h-40 w-40 md:h-64 md:w-64"
            />
            <p className="text-gray-900 font-semibold text-xl">
              Menjadi Top Creator
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
