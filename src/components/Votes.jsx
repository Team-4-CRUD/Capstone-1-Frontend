import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/resultStyles.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ViewVote = () => {
  const { pollFormId } = useParams();
  console.log("pollFormId is:", pollFormId);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add("result-page");

    return () => {
      document.body.classList.remove("result-page");
    };
  }, []);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/vote/results/${pollFormId}`
        );
        console.log("✅ Response data:", res.data);

        if (res.data?.message) {
          setError(res.data.message);
        } else {
          setResult(res.data.result);
        }
      } catch (err) {
        console.error("❌ Fetch error:", err);
        setError("Failed to fetch result.");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [pollFormId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>⚠️ {error}</p>;

  // Ensure chartData is always valid and chart renders even if no votes
  let chartLabels = [];
  let chartValues = [];
  if (
    result &&
    result.votes &&
    typeof result.votes === "object" &&
    Object.keys(result.votes).length > 0
  ) {
    chartLabels = Object.keys(result.votes);
    chartValues = Object.values(result.votes);
  }

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Number of Votes",
        data: chartValues,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Poll Results",
      },
    },
  };

  return (
    <div className="results-title">
      {result?.tie ? (
        <div>
          <h2>🤝 It's a Tie!</h2>
          <ul>
            {Array.isArray(result.winner) ? (
              result.winner.map((name, idx) => <li key={idx}>🏆 {name}</li>)
            ) : (
              <li>🏆 {result.winner}</li>
            )}
          </ul>
        </div>
      ) : (
        <h2>🏆 Winner: {result?.winner}</h2>
      )}

      {/* Chart below */}
      <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
        {chartLabels.length > 0 ? (
          <Bar data={chartData} options={chartOptions} />
        ) : (
          <p style={{ textAlign: "center", color: "#888" }}>
            No votes yet to display.
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewVote;
