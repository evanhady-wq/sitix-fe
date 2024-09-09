import Logo3 from "../assets/Logo3.png";
import { BiFile } from "react-icons/bi";
import Footer from "../components/Footer";
import { Button } from "@nextui-org/react";

const handleSignIn = () =>{
    window.location.href = "/signin";
  };

const TermAndCondition = () => {

  return (
    <div>
      <div className="mt-1 ml-3 bg-white pt-2 h-[50px]">
        <a href="/" className="flex flex-row no-underline">
          <img src={Logo3} alt="Logo" className="h-20 w-20 ml-20" />
          <div className="text-custom-blue-3 font-bold text-7xl -ml-4">
            Si
            <span className="text-custom-blue-1">Tix</span>
            <span className="text-blue-1000 text-lg ml-5 hidden md:inline">
              Keep it simple and proper
            </span>
          </div>
        </a>
      </div>
      <div className="flex flex-col mt-12 pt-4 bg-slate-300/20 h-auto items-center">
        <div className="flex flex-row gap-6">
          <BiFile size={50} />
          <h1>Syarat dan Ketentuan</h1>
        </div>

        <div className="mt-11 bg-white md:w-[1500px] mb-10 pl-4 pt-4 pr-4 pb-6 rounded-[20px] font-semi">
          <h4 className="font-semibold">Syarat dan ketentuan</h4>
          <p className="text-lg">
            Kepada Creator dan Customer yang kami hormati
          </p>
          <p className="text-justify">
            Dengan mengunduh, mendaftar, dan/atau menggunakan Layanan SiTix,
            maka Anda dianggap telah membaca, mengerti, menerima dan menyetujui
            semua isi dalam Syarat dan Ketentuan ini (“Syarat dan Ketentuan”).
            Syarat dan Ketentuan ini merupakan bentuk kesepakatan yang
            dituangkan dalam suatu perjanjian yang sah antara anda dengan SiTix.
            Anda diwajibkan membaca dengan seksama karena dapat berdampak secara
            hukum kepada hak dan kewajiban Anda.{" "}
          </p>
          <p className="text-justify">
            Jika Anda tidak menyetujui sebagian atau seluruh isi Syarat dan
            Ketentuan, maka anda tidak diperkenankan mengunduh dan/atau
            menggunakan Layanan SiTix. Apabila anda telah mendaftar Layanan
            SiTix dan/atau mengunduh aplikasi, maka anda wajib untuk berhenti
            menggunakan Layanan SiTix dan menghapus aplikasi secara permanen
            dari perangkat anda.
          </p>

          <h4 className="font-semibold mt-8">1. Ketentuan Umum</h4>
          <p className="text-justify">
            1.1. SiTix berhak untuk sewaktu-waktu mengubah Syarat dan Ketentuan
            ini tanpa pemberitahuan sebelumnya. Perubahan tersebut akan berlaku
            segera setelah diperbarui di situs web SiTix. Oleh karena itu, Anda
            diwajibkan untuk secara berkala memeriksa Syarat dan Ketentuan yang
            berlaku.
          </p>
          <p className="text-justify">
            1.2. Layanan SiTix hanya dapat digunakan oleh individu yang secara
            hukum dapat mengadakan perjanjian yang mengikat berdasarkan hukum
            Republik Indonesia. Anda menyatakan dan menjamin bahwa Anda adalah
            individu yang memiliki kapasitas hukum untuk mengikatkan diri pada
            Syarat dan Ketentuan ini.
          </p>

          <h4 className="font-semibold mt-8">2. Penggunaan Layanan</h4>
          <p className="text-justify">
            2.1. Anda setuju untuk menggunakan Layanan SiTix hanya untuk tujuan
            yang sah dan sesuai dengan hukum yang berlaku. Anda dilarang untuk
            menggunakan Layanan SiTix dalam cara yang dapat merusak,
            melumpuhkan, membebani, atau mengganggu server atau jaringan yang
            terhubung ke Layanan SiTix.
          </p>
          <p className="text-justify">
            2.2. Anda dilarang untuk meniru atau mencoba untuk meniru orang lain
            atau entitas, atau memberikan informasi palsu atau menyesatkan
            sehubungan dengan identitas Anda.
          </p>

          <h4 className="font-semibold mt-8">3. Hak dan Kewajiban SiTix</h4>
          <p className="text-justify">
            3.1. SiTix berhak untuk menangguhkan atau mengakhiri akses Anda ke
            Layanan jika Anda melanggar ketentuan dari Syarat dan Ketentuan ini.
          </p>
          <p className="text-justify">
            3.2. SiTix berhak, namun tidak berkewajiban, untuk melakukan
            pemantauan terhadap penggunaan Layanan untuk memastikan kepatuhan
            terhadap Syarat dan Ketentuan ini.
          </p>

          <h4 className="font-semibold mt-8">4. Pembatasan Tanggung Jawab</h4>
          <p className="text-justify">
            4.1. SiTix tidak bertanggung jawab atas kerugian langsung atau tidak
            langsung, termasuk kehilangan keuntungan, yang timbul akibat
            penggunaan atau ketidakmampuan menggunakan Layanan SiTix.
          </p>
          <p className="text-justify">
            4.2. SiTix tidak bertanggung jawab atas gangguan atau tidak
            tersedianya Layanan akibat kejadian di luar kendali kami, seperti
            bencana alam, gangguan jaringan, atau tindakan pihak ketiga yang
            tidak berwenang.
          </p>
        </div>
        <div className="flex items-center flex-col mb-4">
          <h5 className="text-orange-800">#BeliDiSiTix</h5>
          <h1>Langsung Join ke SiTix Yuk!</h1>
          <Button size="lg" color="danger" onClick={handleSignIn}>Gabung Gratis</Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermAndCondition;
