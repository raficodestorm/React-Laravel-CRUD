import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import "./PostList.css";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const res = await api.get("/posts");
      setPosts(res.data);
    } catch (error) {
      console.log("Error loading posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    await api.delete(`/posts/${id}`);
    loadPosts();
  };

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  return (
    <div className="postlist-page">
      <div className="header">
        <h2 className="title">All Posts</h2>
        <Link className="btn-add" to="/add">
          + Add New
        </Link>
      </div>

      <div className="posts-container">
        {posts.length === 0 && (
          <p className="no-posts">No posts available. Add a new post.</p>
        )}

        {posts.map((p) => (
          <div className="post-card" key={p.id}>
            <div className="post-content">
              <h3 className="post-title">{p.title}</h3>
              <p className="post-body">{p.body}</p>
            </div>

            <div className="actions">
              <Link className="btn-edit" to={`/edit/${p.id}`}>
                Edit
              </Link>

              <button className="btn-delete" onClick={() => deletePost(p.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
