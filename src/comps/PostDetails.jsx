import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, [id]);

  if (!post) {
    return (
      <div className="text-center">
        <div
          className="spinner-border"
          role="status"
          style={{
            width: "5rem",
            height: "5rem",
            margin: "40vh 60vh",
          }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <center>
      <div className="container mt-4 ">
        <h1>Post Details</h1>
        <h3>Title: {post.title}</h3>
        <p>{post.body}</p>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/")}
          style={{ fontWeight: "600" }}
        >
          Back to Dashboard
        </button>
      </div>
    </center>
  );
};

export default PostDetails;
