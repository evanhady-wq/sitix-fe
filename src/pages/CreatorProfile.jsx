import React, { useState, useEffect } from "react";
import SidebarCreator from "../components/SidebarCreator";
import HeaderCreator from "../components/HeaderCreator";
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
    profilePicture: "",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    if (data) {
      setProfile({
        name: data.name,
        phone: data.phone,
        introduction: data.introduction,
        profilePicture: data.profilePicture,
      });
      const savedProfilePicture = localStorage.getItem("profilePicture");
      if (savedProfilePicture) {
        setProfile((prevProfile) => ({
          ...prevProfile,
          profilePicture: savedProfilePicture,
        }));
      }
    }
  }, [data]);

  const handleEditClick = async () => {
    if (isEditing) {
      try {
        await fetch(`${BASE_URL}/api/creator/profile`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(profile),
        });
        console.log("Data berhasil diupdate");
        refetch();
        alert("Profile Berhasil Di Update");
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image to upload");
      return;
    }

    const formData = new FormData();
    formData.append("profile", image);

    try {
      const response = await fetch(`${BASE_URL}/api/creator/profilepicture`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Image uploaded successfully:", result);
        const imageUrl = result.data.path;
        localStorage.setItem("profilePicture", imageUrl);
        setProfile((prevProfile) => ({
          ...prevProfile,
          profilePicture: imageUrl,
        }));
        setImage(null);
        alert("Image successfully uploaded");
      } else {
        console.error("Error uploading image:", result.message);
        alert("Error uploading image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);

      const reader = new FileReader();
      reader.onload = () => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          profilePicture: reader.result, 
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  console.log("Path profile picture:", profile.profilePicture);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
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
                        src={profile.profilePicture || Logo} 
                        alt="Profile"
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

                  {isEditing && (
                    <div className="mt-4 flex">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mb-2 w-[200px] mr-12"
                      />
                      <Button
                        onClick={handleImageUpload}
                        className="bg-custom-blue-2 text-white font-bold"
                      >
                        Upload Image
                      </Button>
                    </div>
                  )}
                </div>

                <div className="mt-2 flex gap-4">
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
