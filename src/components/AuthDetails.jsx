import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase_auth";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function AuthDetails() {
  const [authuser, setAuthUser] = useState(null);
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    // Clean up the subscription on unmount
    return () => listen();
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign Out success");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      {authuser ? (
        <div>
          <p>{`Signed in as ${authuser.email}`}</p>
          <button
            className="btn btn-lg btn-info mb-5 mt-2"
            onClick={userSignOut}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
}
