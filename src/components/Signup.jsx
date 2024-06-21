import React from "react";
import { useState } from "react";
import { auth } from "../firebase/firebase_auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Login from "./Login";

export default function Signup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        console.log(userCredential);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    // console.log("Email:", email);
    // console.log("Password:", password);
    // Close the modal after submission
    closeModal();
  };
  return (
    <div>
      <button
        onClick={openModal}
        className="btn btn-lg bg-black text-white hover:text-black"
      >
        Sign Up
      </button>
      {isOpen && (
        <dialog id="my_modal_1" className="modal" open>
          <div className="modal-box">
            <form onSubmit={handleSubmit}>
              <h4 className="text-black mb-2 text-center font-semibold uppercase text-xl">
                Create an account
              </h4>
              <label className="input input-bordered flex items-center gap-2 text-black">
                Email
                <input
                  type="email"
                  className="grow"
                  placeholder="john@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label className="input input-bordered flex items-center gap-2 text-black">
                Password
                <input
                  type="password"
                  className="grow"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
              <button type="submit" className="btn btn-active btn-neutral mt-2">
                Sign Up
              </button>
            </form>
            <div className="flex justify-between">
              <p className="py-4 text-black mt-2">Already have an account</p>
              <Login className=" btn btn-link" />
            </div>
            <p className="py-4 text-black">
              Press ESC key or click the button below to close
            </p>
            <div className="modal-action">
              <button onClick={closeModal} className="btn">
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
