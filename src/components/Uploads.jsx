import React, { useState, useEffect } from "react";
import { storage } from "../firebase/firebase_auth";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export default function Uploads({ authuser }) {
  const [videoUpload, setVideoUpload] = useState(null);
  const [videoList, setVideoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const videoListRef = ref(storage, "videos/");

  const uploadVideo = () => {
    // if (!authuser) {
    //   alert("Please log in to upload videos.");
    //   return;
    // }
    if (videoUpload == null) return;

    setLoading(true);

    // Generate a unique file name using uuid
    const videoRef = ref(storage, `videos/${videoUpload.name + uuidv4()}`);

    // Upload to Firebase Storage
    uploadBytes(videoRef, videoUpload)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          // Add the URL to the video list state
          setVideoList((prev) => [...prev, url]);

          // Send the video URL to the server
          fetch("https://dev.api.mrdn.app/api/v1/post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fileUrl: url }),
          })
            .then(() => {
              console.log("Video URL sent to the server");
              alert("Video uploaded successfully!");
              //setVideoUpload(null); // Clear video upload state
              setFileInputKey(Date.now());
            })
            .catch((error) => {
              console.error(
                "Error sending the video URL to the server:",
                error
              );
            })
            .finally(() => {
              setLoading(false);
            });
        });
      })
      .catch((error) => {
        console.error("Error uploading video to Firebase:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (authuser) {
      // Load existing video URLs on component mount
      listAll(videoListRef)
        .then((response) => {
          response.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
              setVideoList((prev) => [...prev, url]);
            });
          });
        })
        .catch((error) => {
          console.error("Error listing videos:", error);
          setLoading(false);
        });
    }
  }, [videoListRef]);

  return (
    <div className="mt-5">
      <div className="flex">
        <input
          key={fileInputKey}
          type="file"
          className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          onChange={(e) => {
            setVideoUpload(e.target.files[0]);
          }}
        />
        <button
          className="btn btn-active btn-md bg-blue-300 border-transparent uppercase ml-2"
          onClick={uploadVideo}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {videoList.map((url, index) => (
        <video
          key={index}
          src={url}
          controls
          className="mt-4 w-full max-w-xs"
        />
      ))}
    </div>
  );
}
