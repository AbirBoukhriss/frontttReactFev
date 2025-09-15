/* eslint-disable */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { addUserClient } from "../../Service/ApiUser"; 
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

export default function Login() {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState("login");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Common fields
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Login
  const handleLogin = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await axios.post(
        "http://localhost:5001/users/login",
        { email, password },
        { withCredentials: true }
      );

      const user = res.data.user;

      if (!user || !user._id || !user.role) {
        toast.error("Invalid user or role not found.");
        return;
      }

      // ✅ Save useful info
      localStorage.setItem("userId", user._id);
      localStorage.setItem("username", user.username || "");
      localStorage.setItem("role", user.role);

      toast.success("Login successful!");

      // ✅ Redirect by role
      setTimeout(() => {
        if (user.role === "client") history.push("/client/home");
        else if (user.role === "freelancer") history.push("/freelancer/home");
        else toast.error("Unknown role.");
      }, 1200);
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Login error.";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Register
  const handleRegister = async () => {
    const { username, email, password, role } = formData;

    if (!username || !email || !password || !role) {
      toast.error("All fields are required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid email.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      setIsSubmitting(true);
      await addUserClient(formData); 

      toast.success("✅ Account created successfully!");
      setFormData({ username: "", email: "", password: "", role: "" });
      setActiveTab("login");
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Registration error.";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light-orange">
      <ToastContainer />
      <div className="card login-card shadow-lg">
        {/* HEADER */}
        <div className="card-header text-center bg-gradient-orange text-white rounded-top">
          <div className="login-icon">👀</div>
          <h3 className="mb-1 font-weight-bold">Freelance</h3>
          <p className="mb-2">Log in to your account</p>
        </div>

        {/* TABS */}
        <div className="tabs-container d-flex">
          <button
            className={`tab-btn w-50 ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`tab-btn w-50 ${activeTab === "register" ? "active" : ""}`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        {/* FORM */}
        <div className="card-body">
          {/* ---- LOGIN ---- */}
          {activeTab === "login" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!isSubmitting) handleLogin();
              }}
            >
              {/* EMAIL */}
              <div className="form-group mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* PASSWORD */}
              <div className="form-group mb-3">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="********"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-orange w-100 rounded-pill py-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              <p className="text-center mt-3">
                Don’t have an account?{" "}
                <a href="#" onClick={() => setActiveTab("register")} className="text-orange">
                  Create one
                </a>
              </p>
            </form>
          )}

          {/* ---- REGISTER ---- */}
          {activeTab === "register" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!isSubmitting) handleRegister();
              }}
            >
              <div className="form-group mb-3">
                <label>Full Name</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="********"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your phone number"
                  required
                />
              </div>


                  <div className="form-group mb-3">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your address"
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label>Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">-- Select a role --</option>
                  <option value="client">Client</option>
                  <option value="freelancer">Freelancer</option>
                </select>
              </div>

              <div className="text-center mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-orange-500 text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg w-full"
                >
                  {isSubmitting ? "Creating account..." : "Create account"}
                </button>
              </div>

              <p className="text-center mt-3">
                Already registered?{" "}
                <a href="#" onClick={() => setActiveTab("login")} className="text-orange">
                  Login
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
