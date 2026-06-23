import { useState } from "react";
import api from "../api";

function LoginPage() {
  const [loginRequest, setLoginRequest] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setLoginRequest({
      ...loginRequest,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/login/', loginRequest);
      setMessage(JSON.stringify(response.data));
      }

      
    catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || error.message);
    }
  };  

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={loginRequest.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={loginRequest.password}
        onChange={handleChange}
      />
      {message && <p>{message}</p>}
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;
