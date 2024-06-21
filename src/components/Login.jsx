import React from "react";
import { useState } from "react";
import Signup from "./Signup";
import { auth } from "../firebase/firebase_auth";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials);
      })
      .catch((err) => {
        console.log(err);
      });

    // Handle login logic here
    // console.log("Email:", email);
    // console.log("Password:", password);
    // Close the modal after submission
    closeModal();
  };
  return (
    <div>
      <button onClick={openModal} className="btn btn-lg btn-primary">
        Login
      </button>
      {isOpen && (
        <dialog id="my_modal_1" className="modal" open>
          <div className="modal-box">
            <form onSubmit={handleSubmit}>
              <h4 className="text-black mb-2 text-center font-semibold uppercase text-xl">
                Login
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
              <label className="input input-bordered flex items-center gap-2 text-black mb-2">
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
              <button type="submit" className="btn btn-active btn-neutral">
                Log In
              </button>
            </form>
            <div className="flex justify-between">
              <p className="py-4 text-black mt-2">Don't have an account</p>
              <Signup className="justify-end" />
            </div>
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
