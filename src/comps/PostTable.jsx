import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PostTable = ({ posts, onEdit, onDelete }) => {
  const navigate = useNavigate();
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Body</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr key={post.id}>
            <td>{post.id}</td>
            <td>{post.title}</td>
            <td>{post.body}</td>
            <td className="tdCenter">
              <Button
                variant="secondary"
                size="sm"
                style={{ margin: "2px" }}
                onClick={() => onEdit(post)}
                className="me-2"
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(post.id)}
              >
                Delete
              </Button>
              <Button
                variant="info"
                size="sm"
                onClick={() => navigate(`/post/${post.id} `)}
              >
                Details
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PostTable;
