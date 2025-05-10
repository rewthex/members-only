import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import useAxios from "../hooks/useAxios.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import { toast } from "react-toastify";

const PostScreen = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const axios = useAxios();
  const { authToken } = useAuth();

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/post", { subject, message });
      navigate("/");
    } catch (err) {
      if (err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        const errors = err.response.data.errors;
        errors.forEach((error) => {
          toast.error(error.msg);
        });
      }
    }
  };

  return (
    <FormContainer>
      <h2>Create Post</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="firstName">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="lastName">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            type="text"
            placeholder="Enter Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <div className="d-grid gap-2">
          <Button type="submit" variant="primary" className="mt-3">
            Create Post
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
};

export default PostScreen;
