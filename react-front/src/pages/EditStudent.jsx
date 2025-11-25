import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";
import "./Form.css"; // ← CSS file

export default function EditStudent() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = async () => {
    const res = await api.get(`/students/${id}`);
    setName(res.data.name);
    setRoll(res.data.roll);
    setEmail(res.data.email);
  };

  const submit = async (e) => {
    e.preventDefault();
    await api.put(`/students/${id}`, { name, roll, email });
    navigate("/studentlist");
  };

  return (
    <div className="form-container">
      <form onSubmit={submit} className="post-form">
        <h2>Edit student</h2>

        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>

        <label>Roll</label>
        <input
          type="text"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
        ></input>

        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
