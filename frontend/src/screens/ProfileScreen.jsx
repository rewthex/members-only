import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import useAxios from "../hooks/useAxios.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfileScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [hasMembership, setHasMembership] = useState("");
  const [secretCode, setSecretCode] = useState("");

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
        toast.error(
          err?.response?.data?.message || err?.message || "Something went wrong"
        );
      }
    }

    getProfileInfo();
  }, []);

  const updateProfileSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/profile", { firstName, lastName });
      toast.success("Profile updated");
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
        <h2>Update Profile</h2>
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
          <div className="d-grid gap-2">
            <Button type="submit" variant="primary" className="mt-3">
              Update Profile
            </Button>
          </div>
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

            <div className="d-grid gap-2">
              <Button type="submit" variant="primary" className="mt-3">
                Enable Membership
              </Button>
            </div>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default ProfileScreen;
