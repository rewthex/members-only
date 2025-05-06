import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer } from 'react-toastify'
import Header from "./components/Header";
import 'react-toastify/ReactToastify.css'

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />
      <Container className="my-2">
        <Outlet />
      </Container>
    </>
  );
};

export default App;
