import { Divider } from "@nextui-org/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const HeaderLogo = () => {
  const navigate = useNavigate()
  return (
    <>
      <div 
      className="hidden md:flex justify-center top-0 cursor-pointer"
      onClick={() => navigate("/")}
      >
        <div className="text-custom-blue-3 font-bold text-5xl my-4">
          Si
          <span className="text-custom-blue-1">Tix</span>
        </div>
      </div>
      <Divider />
    </>
  );
};

export default HeaderLogo;
