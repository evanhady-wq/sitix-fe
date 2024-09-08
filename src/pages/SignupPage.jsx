import React, { useState } from "react";
import HeaderLogo from "../components/HeaderLogo";
import LogoDummy from "../assets/LogoDummy1.jpeg";
import {
  Button,
  Card,
  CardBody,
  Input,
  Tab,
  Tabs,
  Textarea,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { withLoading } from "../hoc/withLoading";
import { BASE_URL } from "../service/constants";
import axios from "axios";

const SignupPage = () => {
  const navigate = useNavigate();

  const [customerValues, setCustomerValues] = useState({
    email: "",
    password: "",
    username: "",
    phone: "",
    fullname: "",
  });
  const [customerErrors, setCustomerErrors] = useState({});

  const [creatorValues, setCreatorValues] = useState({
    creatorEmail: "",
    creatorPassword: "",
    creatorUsername: "",
    creatorName: "",
    phone: "", 
    introduction: "",
  });
  const [creatorErrors, setCreatorErrors] = useState({});

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomerValues({
      ...customerValues,
      [name]: value,
    });
  };

  const handleCreatorChange = (e) => {
    const { name, value } = e.target;
    setCreatorValues({
      ...creatorValues,
      [name]: value,
    });
  };

  const validateCustomer = () => {
    const errors = {};
    if (!customerValues.email.includes("@")) errors.email = "Email tidak valid";
    if (customerValues.password.length < 8)
      errors.password = "Password harus minimal 8 karakter";
    if (customerValues.username.length < 6)
      errors.username = "Username harus minimal 6 karakter";
    if (customerValues.phone.length < 11)
      errors.phone = "Nomor telepon harus minimal 11 karakter";
    if (customerValues.fullname.length < 3)
      errors.fullname = "Fullname minimal 3 karakter";
    setCustomerErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateCreator = () => {
    const errors = {};
    if (!creatorValues.creatorEmail.includes("@"))
      errors.creatorEmail = "Email tidak valid";
    if (creatorValues.creatorPassword.length < 8)
      errors.creatorPassword = "Password harus minimal 8 karakter";
    if (creatorValues.creatorUsername.length < 6)
      errors.creatorUsername = "Username harus minimal 6 karakter";
    if (!creatorValues.creatorName)
      errors.creatorName = "Nama creator harus diisi";
    if (creatorValues.phone.length < 11)
      errors.phone = "Nomor telepon harus minimal 11 karakter";
    if (creatorValues.introduction.length < 20)
      errors.introduction = "Introduction harus minimal 20 karakter" 
    setCreatorErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCustomerSubmit = async (e) => {
    e.preventDefault();
    if (validateCustomer()) {
      const customerData = {
        email: customerValues.email,
        password: customerValues.password,
        username: customerValues.username,
        data: {
          name: customerValues.fullname,
          phone: customerValues.phone,
        },
      };
      try {
        await axios.post(
          `${BASE_URL}/api/auth/register/customer`,
          customerData
        );
        navigate('/signin')
      } catch (error) {
        console.error("Error registering customer:", error);
      }
    }
  };

  const handleCreatorSubmit = async (e) => {
    e.preventDefault();
    if (validateCreator()) {
      const creatorData = {
        email: creatorValues.creatorEmail,
        password: creatorValues.creatorPassword,
        username: creatorValues.creatorUsername,
        data: {
          name: creatorValues.creatorName,
          phone: creatorValues.phone, 
          introduction: creatorValues.introduction,
        },
      };
      try {
        await axios.post(`${BASE_URL}/api/auth/register/creator`, creatorData);
        navigate('/signin')
      } catch (error) {
        console.error("Error registering creator:", error);
      }
    }
  };

  return (
    <>
      <HeaderLogo />
      <div className="flex px-4 justify-center gap-8 h-screen">
        <div className="hidden md:flex items-center">
          <img
            src={LogoDummy}
            className="w-[500px] h-[550px]"
            alt="Logo Dummy"
          />
        </div>
        <div className="pt-8 md:pt-26 w-[500px]">
          <Card>
            <CardBody>
              <h1 className="font-bold text-2xl">Daftar</h1>
              <p className="text-md text-gray-600">
                Silahkan buat akun SiTix kamu, atau klik {" "} 
                <span className="font-bold text-custom-blue-2 cursor-pointer"
                onClick={() => navigate('/signin')}
                >Masuk Sekarang </span> 
                untuk masuk ke akun SiTix kamu
              </p>
              <div className="font-semibold">
                <Tabs size="lg" variant="underlined">
                  <Tab title="Customer">
                    <Card shadow="none">
                      <CardBody className="space-y-3">
                        <p>Email</p>
                        <Input
                          name="email"
                          placeholder="Alamat Email"
                          size="lg"
                          value={customerValues.email}
                          onChange={handleCustomerChange}
                          status={customerErrors.email ? "error" : ""}
                        />
                        {customerErrors.email && (
                          <p className="text-red-500">{customerErrors.email}</p>
                        )}

                        <p>Password</p>
                        <Input
                          name="password"
                          placeholder="Password"
                          size="lg"
                          type="password"
                          value={customerValues.password}
                          onChange={handleCustomerChange}
                          status={customerErrors.password ? "error" : ""}
                        />
                        {customerErrors.password && (
                          <p className="text-red-500">
                            {customerErrors.password}
                          </p>
                        )}

                        <p>Username</p>
                        <Input
                          name="username"
                          placeholder="Username"
                          size="lg"
                          value={customerValues.username}
                          onChange={handleCustomerChange}
                          status={customerErrors.username ? "error" : ""}
                        />
                        {customerErrors.username && (
                          <p className="text-red-500">
                            {customerErrors.username}
                          </p>
                        )}

                        <p>Fullname</p>
                        <Input
                          name="fullname"
                          placeholder="Full Name"
                          size="lg"
                          value={customerValues.fullname}
                          onChange={handleCustomerChange}
                          status={customerErrors.fullname ? "error" : ""}
                        />
                        {customerErrors.fullname && (
                          <p className="text-red-500">
                            {customerErrors.fullname}
                          </p>
                        )}

                        <p>Phone Number</p>
                        <Input
                          name="phone"
                          placeholder="Phone Number"
                          size="lg"
                          value={customerValues.phone}
                          onChange={handleCustomerChange}
                          status={customerErrors.phone ? "error" : ""}
                        />
                        {customerErrors.phone && (
                          <p className="text-red-500">{customerErrors.phone}</p>
                        )}

                        <p className="font-light pt-8 pb-4">
                          Dengan menekan tombol{" "}
                          <span className="font-bold">"Lanjutkan" </span> saya
                          setuju dengan syarat dan ketentuan Kebijakan Privasi
                          dan pedoman komunitas milik{" "}
                          <span className="font-bold">SiTix</span>.
                        </p>

                        <Button
                          className="bg-custom-blue-2 text-white font-bold text-xl"
                          onClick={handleCustomerSubmit}
                        >
                          Lanjutkan
                        </Button>
                      </CardBody>
                    </Card>
                  </Tab>
                  <Tab title="Creator">
                    <Card shadow="none">
                      <CardBody className="space-y-3">
                        <p>Email</p>
                        <Input
                          name="creatorEmail"
                          placeholder="Alamat Email"
                          size="lg"
                          value={creatorValues.creatorEmail}
                          onChange={handleCreatorChange}
                          status={creatorErrors.creatorEmail ? "error" : ""}
                        />
                        {creatorErrors.creatorEmail && (
                          <p className="text-red-500">
                            {creatorErrors.creatorEmail}
                          </p>
                        )}

                        <p>Password</p>
                        <Input
                          name="creatorPassword"
                          placeholder="Password"
                          size="lg"
                          type="password"
                          value={creatorValues.creatorPassword}
                          onChange={handleCreatorChange}
                          status={creatorErrors.creatorPassword ? "error" : ""}
                        />
                        {creatorErrors.creatorPassword && (
                          <p className="text-red-500">
                            {creatorErrors.creatorPassword}
                          </p>
                        )}

                        <p>Username</p>
                        <Input
                          name="creatorUsername"
                          placeholder="Username"
                          size="lg"
                          value={creatorValues.creatorUsername}
                          onChange={handleCreatorChange}
                          status={creatorErrors.creatorUsername ? "error" : ""}
                        />
                        {creatorErrors.creatorUsername && (
                          <p className="text-red-500">
                            {creatorErrors.creatorUsername}
                          </p>
                        )}

                        <p>Creator Name</p>
                        <Input
                          name="creatorName"
                          placeholder="Full Name"
                          size="lg"
                          value={creatorValues.creatorName}
                          onChange={handleCreatorChange}
                          status={creatorErrors.creatorName ? "error" : ""}
                        />
                        {creatorErrors.creatorName && (
                          <p className="text-red-500">
                            {creatorErrors.creatorName}
                          </p>
                        )}

                        <p>Phone Number</p>
                        <Input
                          name="phone"
                          placeholder="Phone Number"
                          size="lg"
                          value={creatorValues.phone}
                          onChange={handleCreatorChange}
                          status={creatorErrors.phone ? "error" : ""}
                        />
                        {creatorErrors.phone && (
                          <p className="text-red-500">{creatorErrors.phone}</p>
                        )}

                        <p>Introduction</p>
                        <Textarea
                          name="introduction"
                          placeholder="Introduction"
                          size="lg"
                          value={creatorValues.introduction}
                          onChange={handleCreatorChange}
                          status={creatorErrors.introduction ? "error" : ""}
                        />
                        {creatorErrors.introduction && (
                          <p className="text-red-500">
                            {creatorErrors.introduction}
                          </p>
                        )}

                        <p className="font-light pt-8 pb-4">
                          Dengan menekan tombol{" "}
                          <span className="font-bold">"Lanjutkan" </span> saya
                          setuju dengan syarat dan ketentuan Kebijakan Privasi
                          dan pedoman komunitas milik{" "}
                          <span className="font-bold">SiTix</span>.
                        </p>

                        <Button
                          className="bg-custom-blue-2 text-white font-bold text-xl"
                          onClick={handleCreatorSubmit}
                        >
                          Lanjutkan
                        </Button>
                      </CardBody>
                    </Card>
                  </Tab>
                </Tabs>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default withLoading(SignupPage);
