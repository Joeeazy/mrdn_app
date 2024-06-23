import React from "react";
import AuthDetails from "./AuthDetails";
import Uploads from "./Uploads";

export default function Hero_Section() {
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">
              Unleash your creativity with Meridian, the app that brings your
              world to life through short, engaging videos. Connect with a
              vibrant community of creators, share your unique moments, and
              explore a universe of content that entertains, inspires, and
              informs. Join Meridian today and be a part of the next wave in
              social video innovation.
            </p>
            <AuthDetails />
          </div>
        </div>
      </div>
    </div>
  );
}
