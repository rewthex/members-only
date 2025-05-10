import { useEffect, useState } from "react";
import { ListGroup, Badge } from "react-bootstrap";
import moment from "moment";
import useAxios from "../hooks/useAxios";
import { toast } from "react-toastify";

const HomeScreen = () => {
  const [messages, setMessages] = useState([]);
  const axios = useAxios();

  useEffect(() => {
    async function getMessages() {
      try {
        const { data } = await axios.get("/");
        setMessages(data);
      } catch (err) {
        toast.error(
                err?.response?.data?.message || err?.message || "Something went wrong"
              );
      }
    }

    getMessages();
  }, []);

  return (
    <ListGroup as="ul" className="mt-5">
      {messages.length > 0 &&
        messages.map((message) => {
          return (
            <ListGroup.Item
              as="li"
              key={message.id}
              className="d-flex justify-content-between align-items-start p-4"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{message.subject}</div>
                <div className="p-3">{message.message}</div>
                {message.username && (
                  <div className="fw-bold">{message.username}</div>
                )}
              </div>
              {message["created_at"] && (
                <Badge bg="dark">
                  {moment(message["created_at"]).format("LLL")}
                </Badge>
              )}
            </ListGroup.Item>
          );
        })}
    </ListGroup>
  );
};

export default HomeScreen;
