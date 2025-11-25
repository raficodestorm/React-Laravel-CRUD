import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import "./PostList.css";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (error) {
      console.log("Error loading lists:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    await api.delete(`/students/${id}`);
    loadPosts();
  };

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  return (
    <div className="postlist-page">
      <div className="header">
        <h2 className="title">All students</h2>
        <Link className="btn-add" to="/addstudent">
          + Add New
        </Link>
      </div>

      <div className="posts-container">
        {students.length === 0 && (
          <p className="no-posts">No students available. Add a new student.</p>
        )}

        {students.map((p) => (
          <div className="post-card" key={p.id}>
            <div className="post-content">
              <h3 className="post-title">{p.name}</h3>
              <p className="post-body">{p.roll}</p>
              <p className="post-body">{p.email}</p>
            </div>

            <div className="actions">
              <Link className="btn-edit" to={`/editstudent/${p.id}`}>
                Edit
              </Link>

              <button className="btn-delete" onClick={() => deleteStudent(p.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
