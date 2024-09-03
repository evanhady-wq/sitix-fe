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
      <div>
        <div className="flex flex-row items-center sticky top-0 bg-white z-50">
          <a href="/" className="flex flex-row no-underline">
            <img src={Logo3} alt="Logo" className="h-20 w-20 ml-20" />
            <div className="text-custom-blue-3 font-bold text-7xl -ml-4">
              Si
              <span className="text-custom-blue-1">Tix</span>
              <span className="text-blue-1000 text-lg ml-5">
                Keep it simple and proper
              </span>
            </div>
          </a> 
          <div className="ml-auto mr-40 flex flex-row gap-5 items-center text-3xl">
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
        <div className=" bg-red-100/20 h-[400px] pt-20 " id="apa">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-custom-blue-3 font-bold text-5xl">
              Kenalan sama{" "}
              <span className="font-semibold text-custom-blue-3 text-5xl">
                Si
              </span>
              <span className="font-semibold text-custom-blue-1 text-5xl">
                Tix{" "}
              </span>
            </h1>
            <div className="text-gray-800 text-xl text-center">
              <p>
                <span className="font-semibold text-custom-blue-3 text-3xl">
                  Si
                </span>
                <span className="font-semibold text-custom-blue-1 text-3xl">
                  Tix{" "}
                </span>
                adalah platform yang menyediakan berbagai kelas-kelas tiket
                virtual
              </p>
              <p className="-mt-4">
                yang dapat dibeli dan diikuti oleh orang-orang yang ingin
                bermain. Kami ingin memberikan platform yang mudah, tersedia,
                dan berkualitas yang tepat
              </p>
              <p className="w-[1400px] -mt-4">
                Kami berkomitmen untuk memberikan pengalaman yang mudah,
                tersedia kapan saja, dan berkualitas tinggi kepada semua
                pengguna. Dengan kata lain, SiTix dirancang untuk membuat proses
                pembelian tiket dan partisipasi dalam kelas atau event menjadi
                sangat mudah dan nyaman. Platform kami memastikan bahwa semua
                fitur dan layanan yang ditawarkan adalah yang terbaik agar
                pengguna dapat menikmati pengalaman yang menyenangkan dan bebas
                hambatan.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center gap-6 mt-12" id="creator">
            <h1 className="text-center text-5xl font-semibold">
              Creator Top di{" "}
              <span className="font-semibold text-custom-blue-3 text-5xl">
                Si
              </span>
              <span className="font-semibold text-custom-blue-1 text-5xl">
                Tix{" "}
              </span>
            </h1>
            <div className="flex-row flex gap-3">
              <img
                src={event1}
                alt="event1"
                width={400}
                style={{ borderRadius: 20 }}
              />
              <img
                src={event2}
                alt="event1"
                width={400}
                style={{ borderRadius: 20 }}
              />
              <img
                src={event3}
                alt="event1"
                width={400}
                style={{ borderRadius: 20 }}
              />
            </div>
          </div>
        </div>
        <div className="bg-blue-100/30 h-[800px] mt-32 pt-4" id="kenapa">
          <h1 className="text-center text-5xl font-semibold">
            Kenapa Harus{" "}
            <span className="font-semibold text-custom-blue-3 text-5xl">
              Si
            </span>
            <span className="font-semibold text-custom-blue-1 text-5xl">
              Tix{" "}
            </span>
          </h1>
          <div
            className="mt-5 items-center justify-center flex flex-row"
            style={{ gap: 90 }}
          >
            <div className="flex flex-col items-center">
              <img
                src={ewallet1}
                alt="ewallet"
                style={{ height: 250, width: 250 }}
              />
              <p className="text-gray-900 font-semibold text-2xl">
                Kendalikan Pendapatanmu
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={share1}
                alt="ewallet"
                style={{ height: 250, width: 250 }}
              />

              <p className="text-gray-900 font-semibold text-2xl">
                Bagikan Berbagai Karya
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={topCreator}
                alt="ewallet"
                style={{ height: 250, width: 250 }}
              />
              <p className="text-gray-900 font-semibold text-2xl">
                Menjadi Top Creator
              </p>
            </div>
          </div>
          <div className="flex-row flex gap-28 items-center justify-center mt-10">
            <div className="flex flex-col items-center">
              <img
                src={everyone}
                alt="ewallet"
                style={{ height: 250, width: 250 }}
              />
              <p className="text-gray-900 font-semibold text-2xl">
                Siapapun bisa menjadi creator
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={creatorPreneur}
                alt="ewallet"
                style={{ height: 250, width: 250 }}
              />
              <p className="text-gray-900 font-semibold text-2xl">
                Bergabung dengan
              </p>
              <p className="text-gray-900 font-semibold text-2xl -mt-4">
                Ekosistem CreatorPreneur
              </p>
            </div>
          </div>
        </div>
        <div
          className="flex justify-center flex-col items-center h-[700px] mt-24"
          id="kata"
          >
          <div>
            <h1 className="text-custom-blue-3 font-bold text-5xl text-center">
              Kata Mereka
            </h1>
          </div>
          <div className="w-[70%] mt-5">
            <div className="flex flex-row" style={{ gap: 20 }}>
              <div className="bg-red-400/50 flex-shrink-0 w-[500px]  p-4 rounded flex flex-col justify-between">
                <p className="text-center text-lg font-semibold">
                  "Menggunakan SiTix sangat membantu saya mempromosikan event
                  yang saya buat. Fitur-fiturnya lengkap dan mudah digunakan!"
                </p>
                <div className="flex flex-row items-center gap-3 mt-6">
                  <img
                    src={person1}
                    alt="dinokuning"
                    height={80}
                    width={80}
                    style={{ borderRadius: 50 }}
                  />
                  <div className="">
                    <p className="text-2xl">Muhammad Abduttawwab</p>
                    <p className="-mt-4">CEO Musica Indonesia</p>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-500 flex-shrink-0 w-[500px]  p-4 rounded flex flex-col justify-between">
                <p className="text-center text-lg font-semibold">
                  "SiTix benar-benar platform yang tepat untuk creator. Saya
                  bisa menjangkau audiens yang lebih luas dan meningkatkan
                  pendapatan saya."
                </p>
                <div className="flex flex-row items-center gap-3 mt-5">
                  <img
                    src={person2}
                    alt="dinokuning"
                    height={100}
                    width={100}
                    style={{ borderRadius: 50 }}
                  />
                  <div className="">
                    <p className="text-2xl">Gemilang Evan</p>
                    <p className="-mt-4">CEO Pesta Rakyat Jelata</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-500 flex-shrink-0 w-[500px] p-4 rounded flex flex-col justify-between">
                <p className="text-center text-lg font-semibold">
                  "Dengan SiTix, saya merasa proses penjualan tiket jadi lebih
                  mudah dan efisien. Pokoknya top banget deh!"
                </p>
                <div className="flex flex-row items-center gap-3 mt-5">
                  <img
                    src={person3}
                    alt="dinokuning"
                    height={100}
                    width={100}
                    style={{ borderRadius: 50 }}
                  />
                  <div className="">
                    <p className="text-2xl">Muhammad Khairil Amin</p>
                    <p className="-mt-4">Director Manager Super Music</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center ml-12 mt-5 gap-3">
          <div className="bg-green-500 flex-shrink-0 w-[500px] p-4 rounded flex flex-col justify-between">
                <p className="text-center text-lg font-semibold">
                  "Platform yang user-friendly dan support yang cepat. SiTix
                  benar-benar memudahkan saya dalam mengelola event saya."
                </p>
                <div className="flex flex-row items-center gap-3 mt-5">
                  <img
                    src={person4}
                    alt="dinokuning"
                    height={100}
                    width={100}
                    style={{ borderRadius: 50 }}
                  />
                  <div className="flex justify-center flex-col mt-12">
                    <p className="text-2xl">Andre Christian Lasut</p>
                    <p className="-mt-4">Commisioner PT Cipta Karya Indonesia</p>
                  </div>
                </div>
              </div>
              <div className="bg-white border-medium border-blue-700 flex-shrink-0 w-[500px] p-4 rounded flex flex-col justify-between">
                <p className="text-center text-lg font-semibold">
                  " SiTix membantu saya mendapatkan lebih banyak peserta untuk
                  event saya. Sistemnya gampang dipahami dan performanya
                  mantap."
                </p>
                <div className="flex flex-row items-center gap-3 mt-5">
                  <img
                    src={person5}
                    alt="dinokuning"
                    height={100}
                    width={100}
                    style={{ borderRadius: 50 }}
                  />
                  <div className="">
                    <p className="text-2xl">Galih Saka Diantama</p>
                    <p className="-mt-4">Promotor Soundrenaline</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-500 flex-shrink-0 w-[500px] p-4 rounded flex flex-col justify-between">
                <p className="text-center text-lg font-semibold">
                  "Kalau mau sukses dengan event online, SiTix adalah solusinya.
                  Saya sangat merekomendasikan platform ini!"
                </p>
                <div className="flex flex-row items-center gap-3 mt-5">
                  <img
                    src={dinokuning}
                    alt="dinokuning"
                    height={100}
                    width={100}
                    style={{ borderRadius: 50 }}
                  />

                  <div className="">
                    <p className="text-2xl">Josh Due</p>
                    <p className="-mt-4">Senio Manager PT Musik Sakti Indonesia</p>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div className="mt-32 h-[1350px] bg-slate-100 p-20" id="bisa">
          <h1 className="text-center text-5xl font-semibold">
            Bisa ngapain aja di{" "}
            <span className="font-semibold text-custom-blue-3 text-5xl">
              Si
            </span>
            <span className="font-semibold text-custom-blue-1 text-5xl">
              Tix{" "}
            </span>
            ?
          </h1>
          <div>
            <div className="bg-white ml-64 mt-20 flex flex-row justify-between w-[1500px] rounded-3xl">
              <div className="pl-10">
                <h2 className="text-5xl pt-16 ">Creator</h2>
                <ul className="list-disc text-2xl mt-4">
                  <li>Kamu bisa buat event dengan bebas</li>
                  <li>Bisa dapat pemasukan tanpa harus banyak followers</li>
                  <li>
                    Ciptakan ikatan yang lebih dekat dengan pendukungmu langsung
                    dalam satu platform.
                  </li>
                  <li>Pantau Penjualan kamu di creator dashboard</li>
                  <li>
                    Dapat tambahan penjualan dari promoter yang bantu kamu
                    jualan
                  </li>
                </ul>
              </div>
              <div className="mt-4">
                <img
                  src={creatorPreneur}
                  alt="creator"
                  width={500}
                  height={500}
                />
              </div>
            </div>
            <div className="bg-white ml-64 mt-20 flex flex-row justify-between w-[1500px] rounded-3xl">
              <div className="pl-10">
                <h2 className="text-5xl pt-16 ">Customer</h2>
                <ul className="list-disc text-2xl mt-4">
                  <li>
                    Dapetin Akses langsung ke event menarik tanpa harus menunggu
                  </li>
                  <li>Jalin koneksi lebih dekat dengan kreator favorit kamu</li>
                  <li>
                    Pantau terus event terbaru dari Creator favorite kamu.
                  </li>
                  <li>
                    Dapatkan dukungan dan rekomendasi dari promoter untuk konten
                    yang kamu minati
                  </li>
                  <li>Selalu update tentang event favorite kamu</li>
                </ul>
              </div>
              <div className="mt-4">
                <img src={customer} alt="creator" width={500} height={800} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center h-[170px] pt-3 mb-20 mt-4">
        <h5 className="text-orange-800">#BeliDiSiTix</h5>
        <h1 className="-mt-2">
          Udah Siap event kamu lebih terkenal bareng{" "}
          <span className="font-semibold text-custom-blue-3">Si</span>
          <span className="font-semibold text-custom-blue-1">Tix</span>?
        </h1>
        <div className="mt-2">
          <Button onClick={goToSignIn} size="lg" color="danger">
            Gabung Gratis
          </Button>
        </div>
      </div>
      <Footer />
      
    </div>
  );
};

export default AboutUs;
