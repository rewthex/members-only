import { useEffect, useState } from "react";
import useAxios from "../services/useAxios";

const HomeScreen = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const axios = useAxios();

  useEffect(() => {
    async function getMessages() {
      try {
        const { data } = await axios.get("/");
        setMessages(data);
      } catch (err) {
        setError(err);
      }
    }

    getMessages();
  }, []);

  return (
    <div>
      <ul>
        {messages.length > 0 &&
          messages.map((message) => {
            return <li key={message.id}>{message.message}</li>;
          })}
      </ul>
    </div>
  );
};

export default HomeScreen;
