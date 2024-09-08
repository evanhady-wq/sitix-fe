import { Button, Input } from "@nextui-org/react";
import React from "react";
import { FaReceipt } from "react-icons/fa";
import { FaRightFromBracket } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Header({ setSearchTerm }) {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const tokenCreator = localStorage.getItem("token_creator");

  const isLoggedIn = !!token || !!tokenCreator;

  const handleSignOut = () => {
    const confirmLogout = window.confirm("Log out?");

    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("token_creator");

      navigate("/signin");
    }
  };

  const handleMyTransaction = () => {
    navigate("/mytransaction");
  };

  return (
    <>
      <header className="sticky top-0 w-full bg-white border-b border-gray-200 z-50">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-4 cursor-pointer">
            <div
              onClick={() => navigate("/")}
              className="text-custom-blue-3 font-bold text-3xl"
            >
              Si
              <span className="text-custom-blue-1">Tix</span>
            </div>
            <div className="flex" style={{ width: 1200 }}>
              <div style={{ flex: 4 }} className="flex items-center">
                <Input
                  placeholder="Cari di SiTix"
                  endContent={<ion-icon name="search-outline"></ion-icon>}
                  radius="lg"
                  className=" lg:w-full w-40 md:w-64"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="md:hidden flex ml-4 space-x-2">
                  <FaReceipt
                    className="cursor-pointer"
                    onClick={handleMyTransaction}
                    size="28px"
                    color="#1A4870"
                  />
                  <FaRightFromBracket
                    className="cursor-pointer"
                    onClick={handleSignOut}
                    size="28px"
                    color="#1A4870"
                  />
                </div>
              </div>
              <div style={{ margin: 10 }}></div>

              <div className=" flex-1 items-center space-x-4 flex ml-6  ">
                {isLoggedIn ? (
                  <>
                    <Button
                      className="bg-transparent border-2 border-custom-blue-2 text-custom-blue-2 font-bold text-md"
                      onClick={handleMyTransaction}
                    >
                      My Transaction
                    </Button>
                    <Button
                      className="bg-transparent border-2 border-custom-blue-2 text-custom-blue-2 font-bold text-md"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className="bg-transparent border-2 border-custom-blue-2 text-custom-blue-2 font-bold text-md"
                      onClick={() => navigate("/signin")}
                    >
                      Sign In
                    </Button>
                    <Button
                      className="bg-custom-blue-2 text-white font-bold text-sm hidden md:inline"
                      onClick={() => navigate("/signup")}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
