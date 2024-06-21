import React from "react";
import { useState } from "react";

export default function Signup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
    // Close the modal after submission
    closeModal();
  };
  return (
    <div>
      <button
        onClick={openModal}
        className="btn bg-black text-white hover:text-black"
      >
        Sign Up
      </button>
      {isOpen && (
        <dialog id="my_modal_1" className="modal" open>
          <div className="modal-box">
            <form onSubmit={handleSubmit}>
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
              <button type="submit" className="btn btn-active btn-neutral">
                Submit
              </button>
            </form>
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
