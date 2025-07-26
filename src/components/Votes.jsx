import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewVote = () => {
  const { pollFormId } = useParams();
  console.log("pollFormId is:", pollFormId);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      {Array.isArray(result) ? (
        <div>
          <h2>🤝 It's a Tie!</h2>
          <ul>
            {result.map((name, idx) => (
              <li key={idx}>🏆 {name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <h2>🏆 Winner: {result}</h2>
      )}
    </div>
  );
};

export default ViewVote;
