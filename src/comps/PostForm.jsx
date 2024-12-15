import React, { useRef, useEffect } from "react";
import { Button } from "react-bootstrap";

const PostForm = ({ onSubmit, initialValues }) => {
  const postTitleElement = useRef();
  const postBodyElement = useRef();

  useEffect(() => {
    if (initialValues) {
      if (postTitleElement.current) {
        postTitleElement.current.value = initialValues.title || "";
      }
      if (postBodyElement.current) {
        postBodyElement.current.value = initialValues.body || "";
      }
    }
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const postTitle = postTitleElement.current.value;
    const postBody = postBodyElement.current.value;

    onSubmit({
      id: initialValues?.id || null,
      title: postTitle,
      body: postBody,
    });
    postTitleElement.current.value = "";
    postBodyElement.current.value = "";
  };

  return (
    <form className="createPost" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          <b>Post Title</b>
        </label>
        <input
          type="text"
          ref={postTitleElement}
          className="form-control"
          id="title"
          placeholder="What's in your mind today?"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          <b>Content</b>
        </label>
        <textarea
          rows={4}
          type="text"
          ref={postBodyElement}
          className="form-control"
          id="body"
          placeholder="Let us more about it..."
          required
        />
      </div>

      <Button
        type="submit"
        variant="success"
        style={{ marginBottom: "3rem", fontWeight: "600" }}
      >
        {initialValues ? "Update Post" : "Create Post"}
      </Button>
    </form>
  );
};

export default PostForm;
