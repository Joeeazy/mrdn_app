import React from "react";
import { useState } from "react";
import { storage } from "../firebase/firebase_auth";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useEffect } from "react";

export default function Uploads() {
  const [videoUpload, setvideoUpload] = useState(null);
  const [videoList, setVideoList] = useState([]);
  const imageListRef = ref(storage, "images/");
  const uploadVideo = () => {
    if (videoUpload == null) return;
    // videos folder
    const videoRef = ref(storage, `videos/${videoUpload.name + v4()}`);
    //upload to firebase
    uploadBytes(videoRef, videoUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(() => {
        setVideoList((prev) => [...prev, url]);
      });
      //if successfull
      //alert("Video Uploaded");
    });
  };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setVideoList((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  return (
    <div className="mt-5">
      <div className="flex">
        <input
          type="file"
          className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          onChange={(e) => {
            setvideoUpload(e.target.files[0]);
          }}
        />
        <button
          className="btn btn-active btn-md bg-blue-300 border-transparent uppercase ml-2"
          onClick={uploadVideo}
        >
          Upload
        </button>
      </div>

      {videoList.map((url) => {
        return <video src={url} />;
      })}
    </div>
  );
}
