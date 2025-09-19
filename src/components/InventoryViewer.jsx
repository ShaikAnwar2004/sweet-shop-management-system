import React, { useEffect, useState } from "react";
import axios from "axios";

export default function InventoryViewer() {
  const [sweets, setSweets] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/api/sweets/inventory", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSweets(res.data))
      .catch((err) => {
        console.error("Inventory fetch failed:", err);
        setMessage("❌ Failed to load inventory");
      });
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8080/api/sweets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSweets((prev) => prev.filter((sweet) => sweet.id !== id));
      setMessage("✅ Sweet deleted");
    } catch (err) {
      console.error("Delete failed:", err);
      setMessage("❌ Failed to delete sweet");
    }
  };

  return (
    <div>
      <h3>📦 Inventory List</h3>
      {message && <p>{message}</p>}
      <ul>
        {sweets.map((sweet) => (
          <li key={sweet.id}>
            {sweet.name} — ₹{sweet.price} — {sweet.stock} units
            <button onClick={() => handleDelete(sweet.id)} style={{ marginLeft: "10px" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}