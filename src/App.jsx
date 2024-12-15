import "./App.css";
import PostTable from "./comps/PostTable";
import "bootstrap/dist/css/bootstrap.min.css";
import TableHeading from "./comps/Table Heading";
import PostForm from "./comps/PostForm";
import { useState, useEffect } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  const handleCreate = (post) => {
    const newPost = {
      id: posts.length + 1,
      title: post.title,
      body: post.body,
      userId: 1,
    };

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    }).then(() => {
      setPosts([...posts, newPost]);
      setIsFormVisible(false);
    });
  };

  const handleUpdate = (updatedPost) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPost),
    }).then(() => {
      setPosts(
        posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
      );
      setEditingPost(null);
      setIsFormVisible(false);
    });
  };

  const handleDelete = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    }).then(() => {
      setPosts(posts.filter((post) => post.id !== id));
    });
  };

  const handleCreateButtonClick = () => {
    setEditingPost(null);
    setIsFormVisible(true);
  };

  const handleEditButtonClick = (post) => {
    setEditingPost(post);
    setIsFormVisible(true);
  };
  return (
    <div className="container mt-4">
      <TableHeading />
      <div className="mb-3">
        {!isFormVisible && (
          <button
            className="btn btn-success"
            onClick={handleCreateButtonClick}
            style={{ fontWeight: "600" }}
          >
            Create Post
          </button>
        )}
      </div>
      {isFormVisible && (
        <PostForm
          onSubmit={editingPost ? handleUpdate : handleCreate}
          initialValues={editingPost}
        />
      )}
      <PostTable
        posts={posts}
        onEdit={handleEditButtonClick}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
