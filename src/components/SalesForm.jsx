import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SalesForm() {
  const [sweets, setSweets] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/api/sweets/inventory", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSweets(res.data))
      .catch((err) => console.error("Failed to load sweets:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:8080/api/sweets/sales",
        { sweetId: selectedId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessage("✅ Sale recorded");
      setQuantity(1);
      setSelectedId("");
    } catch (err) {
      console.error("Sale failed:", err);
      setMessage("❌ Sale failed. Check stock or server.");
    }
  };

  return (
    <div>
      <h3>🧾 Record a Sale</h3>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          required
        >
          <option value="">Select Sweet</option>
          {sweets.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} — ₹{s.price} ({s.quantity} in stock)
            </option>
          ))}
        </select>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
        />
        <button type="submit">Record Sale</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}