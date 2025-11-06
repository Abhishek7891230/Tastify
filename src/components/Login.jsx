import { useState } from "react";
import "../styles/loginpopup.css";

export function LoginPopup({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      console.log("Login:", { email, password });
    } else {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      console.log("Sign up:", { username, email, password });
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <button onClick={onClose} className="close-form-btn">
          ✕
        </button>

        <h2 className="form-header">{isLogin ? "Login" : "Sign Up"}</h2>

        <form className="form-container" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              className="border p-2 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="border p-2 rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}

          <button
            type="submit"
            className={isLogin ? "login-btn" : "signup-btn"}
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>

          <p className="text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={switchMode}
            >
              {isLogin ? "Sign up" : "Login"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
