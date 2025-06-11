import React, { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Replace with your login API call
    if (form.username === "admin" && form.password === "password") {
      setModalMessage("Login successful!");
    } else {
      setModalMessage("Invalid username or password.");
    }
    setModalOpen(true);
  };

  return (
    <Card className="max-w-md mx-auto mt-12">
      <h2 className="text-2xl mb-4">Login</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <p>{modalMessage}</p>
      </Modal>
    </Card>
  );
}
