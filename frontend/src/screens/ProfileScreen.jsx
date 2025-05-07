import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import useAxios from "../services/useAxios.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfileScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [hasMembership, setHasMembership] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const axios = useAxios();

  useEffect(() => {
    async function getProfileInfo() {
      try {
        const { data } = await axios.get("/profile");
        const { first_name, last_name, member } = data;
        setFirstName(first_name);
        setLastName(last_name);
        setHasMembership(member);
      } catch (err) {
        setError(err);
      }
    }

    getProfileInfo();
  });

  const updateProfileSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/profile", { firstName, lastName });
      navigate("/profile");
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

  const enableMembershipSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/member", { secretCode });
      navigate("/profile");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <FormContainer>
        <h1>Update Profile</h1>
        <Form onSubmit={updateProfileSubmitHandler}>
          <Form.Group className="my-2" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Update Profile
          </Button>
        </Form>
      </FormContainer>

      {!hasMembership && (
        <FormContainer>
          <Form onSubmit={enableMembershipSubmitHandler}>
            <Form.Group className="my-1" controlId="secretCode">
              <Form.Label>Secret Code</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Secret Code"
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3">
              Enable Membership
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default ProfileScreen;
