import { useEffect, useState } from "react";
import useAxios from "../services/useAxios";
import { useAuth } from "../services/AuthContext.jsx";

const HomeScreen = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const axios = useAxios();
  const auth = useAuth();
  console.log(axios);
 
  useEffect(() => {
    async function getMessages() {
      try {
        const { data } = await axios.get("http://localhost:3000/");
        console.log(data);
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
