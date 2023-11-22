import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import InputField from "./InputField";
import { Loader } from "../Utils/Loader";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/user/user.slice";

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Refactored axios call into a separate function
  const loginUser = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/user/login", { email, password });
      if (res.status === 200) {
        const user = res.data.user;
        dispatch(setUser(user));
        localStorage.setItem("token", res.data.token);

        toast.success("Login successful");
        // Redirect based on role
        handleRedirect(user.role, user.choice);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    loginUser();
  };

  // Function to handle redirection
  const handleRedirect = (role: number, choice?: boolean) => {
    switch (role) {
      case 1:
        navigate("/faculty");
        break;
      case 2:
        choice ? navigate("/student") : navigate("/student/update-profile");
        break;
      case 0:
        navigate("/admin");
        break;
      default:
        navigate("/");
        break;
    }
    setLoading(false);
  };

  return (
    <div className="w-[50%]">
      <h1 className="text-[2.4rem] font-bold mb-[2rem]">Login</h1>
      <form onSubmit={handleLogin}>
        <InputField
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="text-center mt-[2rem]">
          {loading ? (
            <Loader heading="Logging in..." />
          ) : (
            <button
              type="submit"
              className="w-full bg-primary-color text-white text-[1.3rem] font-semibold py-[1rem] px-[1.6rem] rounded-lg hover:bg-[#557deb]"
            >
              Login
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
