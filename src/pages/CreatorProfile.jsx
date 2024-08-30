import React, { useState, useEffect } from "react";
import SidebarCreator from "../components/SidebarCreator";
import HeaderCreator from "../components/HeaderCreator";
import Dummyimage from "../assets/DummyCard.jpeg";
import { Button, Input, Textarea } from "@nextui-org/react";
import { BASE_URL } from "../service/constants";
import useAxios from "../hooks/useAxios";
import Logo from "../assets/Logo3.png";

const CreatorProfile = () => {
  const token = localStorage.getItem("token_creator");
  
  const { data, error, loading, refetch } = useAxios(
    `${BASE_URL}/api/creator/profile`,
    "GET",
    token
  );

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    introduction: "",
  });

  useEffect(() => {
    if (data) {
      setProfile({
        name: data.name,
        phone: data.phone,
        introduction: data.introduction,
      });
    }
  }, [data]);

  const handleEditClick = () => {
    if (isEditing) {
      useAxios(
        `${BASE_URL}/api/creator/profile`,
        "PUT",
        token,
        profile
      )
        .then(() => {
          console.log('Data berhasil diupdate');
          setIsEditing(false); 
          refetch(); 
        })
        .catch((error) => {
          console.error('Error updating profile:', error);
        });
    } else {
      setIsEditing(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <>
      {loading ? (
        <p></p>
      ) : (
        <div className="flex h-screen">
          <div className="hidden md:inline">
            <SidebarCreator />
          </div>
          <div className="flex flex-col flex-grow">
            <HeaderCreator />

            <div className="mx-4 mt-4 flex justify-between">
              <div>
                <div className="flex-col p-3 w-[600px] bg-custom-blue-1 bg-opacity-80 text-white rounded-xl">
                  <p className="font-bold">Creator Profile</p>

                  <div className="flex gap-4">
                    <div className="h-[250px] w-[200px]">
                      <img
                        src={Dummyimage}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>

                    <div className="space-y-4">
                      <Input
                        isDisabled={!isEditing}
                        label="Name"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        className="w-72"
                      />
                      <Input
                        isDisabled={!isEditing}
                        label="Phone"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        className="w-72"
                      />
                      <Textarea
                        isDisabled={!isEditing}
                        label="Introduction"
                        name="introduction"
                        value={profile.introduction}
                        onChange={handleChange}
                        className="max-w-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <Button
                    className="bg-custom-blue-2 text-white font-bold"
                    onClick={handleEditClick}
                  >
                    {isEditing ? "Save" : "Edit Profile"}
                  </Button>
                </div>
              </div>

              <div className="w-1/3 h-[322px]">
                <img src={Logo} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatorProfile;
