"use client";

import { useEffect, useState } from "react";
import AddFreelancerPanel from "./AddFreelancerPanel";

interface Freelancer {
  id: number;
  name: string;
  skill: string;
  rating: string;
  price: number;
  available?: boolean;
}

export default function Freelancers() {
  const [data, setData] = useState<Freelancer[]>([]);

  async function fetchData() {
    try {
      const res = await fetch("/api/freelancers");
      const response = await res.json();
      if (response.freelancers) {
        setData(response.freelancers);
      }
    } catch (error) {
      console.error("Error fetching freelancers:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    await fetch(`/api/freelancers/${id}`, {
      method: "DELETE",
    });
    setData((prev) => prev.filter((f) => f.id !== id));
  };

  const handleUpdate = async (id: number) => {
    const res = await fetch(`/api/freelancers/${id}`, {
      method: "PUT",
      body: JSON.stringify({ price: 100 }),
    });
    const updated = await res.json();
    setData((prev) => prev.map((f) => (f.id === id ? updated : f)));
  };

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Freelancer dashboard</p>
          <h1>Talent pool</h1>
          <p className="subhead">
            Browse available freelancers, update details, or add new talent in
            one place.
          </p>
        </div>
        <AddFreelancerPanel
          onAdd={(newFreelancer) => setData((prev) => [...prev, newFreelancer])}
        />
      </header>

      <section className="stats-grid">
        <div className="stat-card">
          <span>Total freelancers</span>
          <strong>{data.length}</strong>
        </div>
        <div className="stat-card muted">
          <span>Active roles</span>
          <strong>3</strong>
        </div>
        <div className="stat-card muted">
          <span>Latest update</span>
          <strong>Live</strong>
        </div>
      </section>

      <section className="freelancer-grid">
        {data.map((f) => (
          <article className="freelancer-card" key={f.id}>
            <div className="profile-row">
              <div className="profile-avatar">
                {f.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </div>
              <div>
                <h2>{f.name}</h2>
                <p>{f.skill}</p>
                <p>Rating: {f.rating}</p>
                <p>Price: ${f.price?.toFixed(2)}</p>
                <p>Available: {f.available ? "Yes" : "No"}</p>
              </div>
            </div>
            <div className="card-actions">
              <button className="ghost-btn" onClick={() => handleUpdate(f.id)}>
                Update
              </button>
              <button
                className="ghost-btn danger"
                onClick={() => handleDelete(f.id)}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
