import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ReportViewer() {
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://sweetshop-backend.onrender.com/api/sweets", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setReport(res.data);
      })
      .catch((err) => {
        console.error("Report fetch failed:", err);
        setError("❌ Failed to load report");
      });
  }, []);

  if (error) return <p>{error}</p>;
  if (!report) return <p>Loading report...</p>;

  return (
    <div>
      <h3>📊 Sweet Shop Report</h3>
      <p><strong>Total Stock:</strong> {report.totalStock}</p>
      <p><strong>Total Inventory Value:</strong> ₹{report.totalValue}</p>
      <p><strong>Top Sweet:</strong> {report.topSweet}</p>
    </div>
  );
}