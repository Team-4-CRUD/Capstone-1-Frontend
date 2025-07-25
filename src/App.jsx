import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import NavBar from "./components/NavBar";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import PollMaker from "./components/PollMaker";
import NotFound from "./components/NotFound";
import ViewAllCreatorPolls from "./components/ViewAllCreatorPolls";
import { API_URL } from "./shared";
import { useAuth, AuthProvider } from "./context/AuthContext"; // context
import { useNavigate } from "react-router-dom";
import ViewSoloPF from "./components/ViewSoloPF";
import VoteForm from "./components/VoteForm";
import ViewAllPoll from "./components/ViewAllPoll";
import ViewVote from "./components/Votes";

const App = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${API_URL}/auth/me`, {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch {
        console.log("Not authenticated");
        setUser(null);
      }
    };
    checkAuth();
  }, [setUser]);

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div>
      <NavBar user={user} onLogout={handleLogout} />
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/pollmaker" element={<PollMaker />} />
          <Route path="/polls" element={<ViewAllCreatorPolls />} />
          <Route path="/polls/:PollFormId" element={<ViewSoloPF />} />
          <Route path="/Vote/:VoteFormID" element={<VoteForm />} />
          <Route path="/AllPolls" element={<ViewAllPoll />} />
         + <Route path="/results/:pollFormId" element={<ViewVote />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

const Root = () => (
  <AuthProvider>
    <Router>
      <App />
    </Router>
  </AuthProvider>
);

const root = createRoot(document.getElementById("root"));
root.render(<Root />);
