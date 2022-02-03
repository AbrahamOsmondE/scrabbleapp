import React from "react";
import { isMobile } from "react-device-detect";
import "../App.css";
import Header from "../components/Header/Header";
import Profile from "../components/Profile/Profile";

const ProfilePage = () => {
  return !isMobile ? (
    <div className="body">
      <Header />
      <Profile />
    </div>
  ) : (
    <div className="body">
      <div className="mobileOnly">Please use the desktop version!</div>
    </div>
  );
};

export default ProfilePage;
