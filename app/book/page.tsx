"use client";

import { useState } from "react";

export default function Book() {
  const [name, setName] = useState("");
  const handleSubmit = async () => {
    await fetch("/api/bookings", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
  };
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <button onClick={handleSubmit}>Book</button>
    </div>
  );
}
