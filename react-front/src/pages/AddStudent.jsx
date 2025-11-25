import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "./AddPost.css";

export default function AddStudent() {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!name.trim() || !roll.trim()) {
      setErrorMsg("Name ও Roll দুটোরই মান লিখতে হবে।");
      return;
    }

    setLoading(true);
    try {
      await api.post("/students", { name: name.trim(), roll: roll.trim(), email: email.trim() });
      navigate("/studentlist");
    } catch (err) {
      console.error(err);
      setErrorMsg(
        err?.response?.data?.message ||
          "Server error — পরে আবার চেষ্টা করো। (Console দেখো বিস্তারিত জন্য)"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addpost-page">
      <form className="addpost-card" onSubmit={submit} noValidate>
        <h2 className="card-title">Add New student</h2>

        {errorMsg && <div className="alert">{errorMsg}</div>}

        <label className="field">
          <span className="field-label">Name</span>
          <input
            className="input"
            type="text"
            placeholder="Enter student name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </label>

        <label className="field">
          <span className="field-label">Roll</span>
          <textarea
            className="textarea"
            placeholder="Write student's roll..."
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
            rows={6}
            disabled={loading}
          />
        </label>

        <label className="field">
          <span className="field-label">Email</span>
          <textarea
            className="textarea"
            placeholder="Write student's email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            rows={6}
            disabled={loading}
          />
        </label>

        <div className="actions">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => navigate("/")}
            disabled={loading}
          >
            Cancel
          </button>
        </div>

        {/* <p className="hint">Tip: একটি সুস্পষ্ট title এবং সংক্ষিপ্ত body দিন।</p> */}
      </form>
    </div>
  );
}
