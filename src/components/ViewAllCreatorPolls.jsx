import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function ViewAllCreatorPolls() {
    const [dataPoll, setDataPoll] = useState([]);
    const { user } = useAuth();

    const fetchData = async () => {
        if (!user) return;
        try {
            const { data } = axios.get("http://localhost:8080/api/creator/my-polls", {
                withCredentials: true,
            });

            setDataPoll(data || []);
            console.log("👤 creator_id from user.id:", user.id);
        } catch (err) {
            console.error("Error fetching poll forms!", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [user]);

    // Prevent errors for mapping
    const polls = Array.isArray(dataPoll) ? dataPoll : [];

    return (
        <div>
            <h1> User PollForms </h1>
            <p>Creator ID: {user ? user.id : "Not logged in"}</p>

            {polls.length > 0 ? (
                polls.map((poll, index) => (
                    <div key={index}>
                        <h3>{poll.title}</h3>
                        <p>{poll.description}</p>
                        <p>Number of options: {poll.pollElements.length}</p>
                    </div>
                ))
            ) : (
                <p>No polls found or loading failed.</p>
            )}
        </div>
    );
}

export default ViewAllCreatorPolls;