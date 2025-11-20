import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";
import "./Form.css"; // ← CSS file

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
    const res = await api.get(`/posts/${id}`);
    setTitle(res.data.title);
    setBody(res.data.body);
  };

  const submit = async (e) => {
    e.preventDefault();
    await api.put(`/posts/${id}`, { title, body });
    navigate("/");
  };

  return (
    <div className="form-container">
      <form onSubmit={submit} className="post-form">
        <h2>Edit Post</h2>

        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
