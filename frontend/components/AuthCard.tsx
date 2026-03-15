"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LoginInput, RegisterInput, Role } from "@/types/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function AuthCard() {
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loginData, setLoginData] = useState<LoginInput>({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState<RegisterInput>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { login, register } = useAuth();
  const router = useRouter();

  const goByRole = (role: Role) => {
    if (role === "admin") return router.push("/dashboard");
    if (role === "dietician") return router.push("/dashboard");
    if (role === "kitchen") return router.push("/dashboard");
    return router.push("/dashboard");
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      setLoading(true);
      const user = await login(loginData);
      goByRole(user.role);
    } catch (error: any) {
      setErrorMessage(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (registerData.password !== registerData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const user = await register(registerData);
      goByRole(user.role);
    } catch (error: any) {
      setErrorMessage(error?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`container ${isActive ? "active" : ""}`}>

      {/* REGISTER */}

      <div className="form-container sign-up">
        <form onSubmit={handleRegisterSubmit}>
          <h1>Registration</h1>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={registerData.username}
            onChange={handleRegisterChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={registerData.email}
            onChange={handleRegisterChange}
            required
          />

          {/* PASSWORD */}

          <div className="password-input-wrap">
            <input
              type={showRegisterPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={registerData.password}
              onChange={handleRegisterChange}
              required
            />

            <span
              className="password-eye"
              onClick={() =>
                setShowRegisterPassword(!showRegisterPassword)
              }
            >
              {showRegisterPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* CONFIRM PASSWORD */}

          <div className="password-input-wrap">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={registerData.confirmPassword}
              onChange={handleRegisterChange}
              required
            />

            <span
              className="password-eye"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {errorMessage && isActive && (
            <p className="error-text">{errorMessage}</p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Please wait..." : "Register"}
          </button>
        </form>
      </div>

      {/* LOGIN */}

      <div className="form-container sign-in">
        <form onSubmit={handleLoginSubmit}>
          <h1>Login</h1>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleLoginChange}
            required
          />

          {/* LOGIN PASSWORD */}

          <div className="password-input-wrap">
            <input
              type={showLoginPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />

            <span
              className="password-eye"
              onClick={() => setShowLoginPassword(!showLoginPassword)}
            >
              {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <Link href="/forgot-password">Forgot Password?</Link>

          {errorMessage && !isActive && (
            <p className="error-text">{errorMessage}</p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Please wait..." : "Login"}
          </button>
        </form>
      </div>

      {/* TOGGLE */}

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Hello, Welcome!</h1>
            <p>Don&apos;t have an account?</p>
            <button
              type="button"
              className="hidden"
              onClick={() => setIsActive(false)}
            >
              Login
            </button>
          </div>

          <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button
              type="button"
              className="hidden"
              onClick={() => setIsActive(true)}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}