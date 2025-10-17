import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import account from "../../assets/account.png";
import MyReview from "../../components/MyReview";
import SideMenuBar from "../../components/SideMenuBar";
import { useNavigate } from "react-router-dom";
import Favourite from "../../components/MyFavourite";


function Profile() {
  const { user,logout } = useAuth();
  const navigate = useNavigate();
  const username = user?.email ? user.email.split("@")[0] : "User";
  const [selectedSection, setSelectedSection] = useState("review");

  return (
    <div className="flex">
      <SideMenuBar onMenuSelect={setSelectedSection} />
      <div className="ml-60 w-full min-h-screen bg-gray-900 text-white">
        <div className="relative w-full h-[30vh] bg-[#142d3e] p-5 flex items-center gap-5">
          <img
            src={account}
            alt="profile"
            className="w-24 h-24 rounded-full border-4 border-white"
          />
          <div>
            <h1 className="text-2xl font-semibold">{username}</h1>
            <p className="opacity-70">{user?.email}</p>
          </div>
        </div>

        <div className="p-5">
          {selectedSection === "review" && <MyReview />}
          {selectedSection === "favourite" && <Favourite />}{" "}
          {selectedSection === "home" && navigate("/")}
          {selectedSection==='logout' && logout() }
        </div>
      </div>
    </div>
  );
}

export default Profile;
