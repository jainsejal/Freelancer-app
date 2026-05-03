"use client";

import { useState } from "react";

interface Freelancer {
  id: number;
  name: string;
  skill: string;
  rating: string;
  price: number;
  available: boolean;
}

interface AddFreelancerPanelProps {
  onAdd: (freelancer: Freelancer) => void;
}

export default function AddFreelancerPanel({ onAdd }: AddFreelancerPanelProps) {
  const [showAddInput, setShowAddInput] = useState(false);
  const [name, setName] = useState("");
  const [skill, setSkill] = useState("");
  const [rating, setRating] = useState("4.5");
  const [price, setPrice] = useState(1200);
  const [available, setAvailable] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const resetForm = () => {
    setName("");
    setSkill("");
    setRating("4.5");
    setPrice(1200);
    setAvailable(true);
    setShowAddInput(false);
  };

  const handleAdd = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/freelancers`, {
        method: "POST",
        body: JSON.stringify({
          name: name || "New User",
          skill: skill || "Designer",
          rating,
          price,
          available,
        }),
      });
      const result = await res.json();
      const newFreelancer = result.newFreelancers || result;
      onAdd(newFreelancer);
      resetForm();
    } catch (error) {
      console.error("Error adding freelancer:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="header-actions">
      <button className="primary-btn" onClick={() => setShowAddInput(true)}>
        Add freelancer
      </button>
      {showAddInput && (
        <div className="add-input-panel">
          <div className="field-row">
            <input
              type="text"
              placeholder="Freelancer name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Skill"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
            />
          </div>
          <div className="field-row">
            <input
              type="number"
              placeholder="Rating"
              min="0"
              max="5"
              step="0.1"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              min="0"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <div className="field-row availability-row">
            <label>
              Available
              <select
                value={available ? "true" : "false"}
                onChange={(e) => setAvailable(e.target.value === "true")}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </label>
            <div className="panel-actions">
              <button className="secondary-btn" onClick={resetForm}>
                Cancel
              </button>
              <button
                className="primary-btn"
                onClick={handleAdd}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
