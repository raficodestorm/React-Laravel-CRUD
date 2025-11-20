import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "./AddPost.css";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!title.trim() || !body.trim()) {
      setErrorMsg("Title ও Body দুটোরই মান লিখতে হবে।");
      return;
    }

    setLoading(true);
    try {
      await api.post("/posts", { title: title.trim(), body: body.trim() });
      navigate("/");
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
        <h2 className="card-title">Add New Post</h2>

        {errorMsg && <div className="alert">{errorMsg}</div>}

        <label className="field">
          <span className="field-label">Title</span>
          <input
            className="input"
            type="text"
            placeholder="Enter a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
        </label>

        <label className="field">
          <span className="field-label">Body</span>
          <textarea
            className="textarea"
            placeholder="Write your post..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
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

        <p className="hint">Tip: একটি সুস্পষ্ট title এবং সংক্ষিপ্ত body দিন।</p>
      </form>
    </div>
  );
}
