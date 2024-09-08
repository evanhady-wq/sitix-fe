import { Button, Input } from "@nextui-org/react";
import React from "react";
import { useNavigate } from "react-router-dom";

function HeaderWithoutInput() {
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

  return (
    <>
      <header className="sticky top-0 w-full bg-white border-b border-gray-200 z-50">
        <div className="mx-auto px-4 py-2 flex items-center justify-between">
          <a href="/" className="no-underline pl-[850px]" >
            <div className="text-custom-blue-3 font-bold text-6xl text-center w-full">
              Si
              <span className="text-custom-blue-1">Tix</span>
            </div>
          </a>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <Button
                className="bg-transparent border-2 border-custom-blue-2 text-custom-blue-2 font-bold text-md hover:bg-black"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
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
      </header>
    </>
  );
}

export default HeaderWithoutInput;
