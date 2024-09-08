import React, { useState, useEffect } from "react";
import SidebarCreator from "../components/SidebarCreator";
import HeaderCreator from "../components/HeaderCreator";
import { Button, Input, Textarea } from "@nextui-org/react";
import { BASE_URL } from "../service/constants";
import Logo from "../assets/Logo3.png";
import axios from "axios";
import { withLoading } from "../hoc/withLoading";

const CreatorProfile = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    introduction: "",
    profilePicture: "",
  });
  const [profilePicture, setProfilePicture] = useState("");

  //get token
  const token = localStorage.getItem("token_creator");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  //fetch profile
  const getProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/creator/profile`, config);
      const resProfile = res.data.data;
      setProfile(resProfile);
      setFormData({
        name: resProfile.name,
        phone: resProfile.phone,
        introduction: resProfile.introduction,
        profilePicture: resProfile.profilePicture,
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) return <p>Loading...</p>;

  //Handle inputan
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  //Function Save Profile
  const handleSaveProfile = async () => {
    try {
      const formDataPicture = new FormData();
      formDataPicture.append("profile", profilePicture);

      const resProfilePicture = await axios.post(
        `${BASE_URL}/api/creator/profilepicture`,
        formDataPicture,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem("path", resProfilePicture.data.data.path);
      const pathValue = localStorage.getItem("path");
      setFormData((prevFormData) => ({
        ...prevFormData,
        profilePicture: pathValue,
      }));

      const resEditProfile = await axios.put(
        `${BASE_URL}/api/creator/profile`,
        formData,
        config
      );
      console.log("Profile updated successfully:", resEditProfile.data.message);

      alert("Profile Berhasil Diupdate");
      setIsEditing(false);
      getProfile();
    } catch (error) {
      setError(error);
      console.log("Error Guys");
    }
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="hidden md:inline">
          <SidebarCreator />
        </div>
        <div className="flex flex-col flex-grow">
          <HeaderCreator />

          <div className="mx-2 md:mx-4 mt-2 md:mt-4 flex justify-center md:justify-between">
            <div>
              <div className="flex-col p-3 w-[300px] md:w-[600px] bg-custom-blue-1 bg-opacity-80 text-white rounded-xl">
                <p className="font-bold">Creator Profile</p>

                <div className="md:flex gap-4">
                  <div className="h-[250px] md:w-[200px] mb-3 md:mb-0">
                    {profile.profilePicture ? (
                      <img
                        src={profile.profilePicture}
                        alt="Profile Picture"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <img
                        src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png"
                        alt="Default Avatar"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    )}
                  </div>

                  <div className="space-y-2 md:space-y-4">
                    <Input
                      isDisabled={!isEditing}
                      label="Name"
                      name="name"
                      defaultValue={profile.name}
                      onChange={handleInputChange}
                      className="md:w-72"
                    />
                    <Input
                      isDisabled={!isEditing}
                      label="Phone"
                      name="phone"
                      defaultValue={profile.phone}
                      onChange={handleInputChange}
                      className="max-w-xs"
                    />
                    <Textarea
                      isDisabled={!isEditing}
                      label="Introduction"
                      name="introduction"
                      defaultValue={profile.introduction}
                      onChange={handleInputChange}
                      className="max-w-xs"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-4 flex">
                    <Input
                      type="file"
                      className="w-[200px]"
                      size="sm"
                      id="files"
                      name="profilePicture"
                      onChange={handleFileChange}
                    />
                  </div>
                )}
              </div>

              <div className="mt-2 flex gap-4">
                {!isEditing ? (
                  <Button
                    className="bg-custom-blue-2 text-white font-bold"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Button
                    className="bg-custom-blue-2 text-white font-bold"
                    onClick={handleSaveProfile}
                  >
                    Save
                  </Button>
                )}
              </div>
            </div>

            {/* <div className="w-1/3 h-[322px]">
              <img src={Logo} />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default withLoading(CreatorProfile);
