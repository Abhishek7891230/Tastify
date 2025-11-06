import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/config";
import "../styles/loginpopup.css";

export function LoginPopup({ onClose, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("Login successful:", userCredential.user);
        alert("Login successful!");

        if (onLoginSuccess) {
          onLoginSuccess(userCredential.user);
        }

        onClose();
      } else {
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }

        if (password.length < 6) {
          setError("Password should be at least 6 characters");
          setLoading(false);
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await updateProfile(userCredential.user, {
          displayName: username,
        });

        console.log("Sign up successful:", userCredential.user);
        alert("Account created successfully!");

        if (onLoginSuccess) {
          onLoginSuccess(userCredential.user);
        }

        onClose();
      }
    } catch (error) {
      console.error("Authentication error:", error);

      switch (error.code) {
        case "auth/email-already-in-use":
          setError("This email is already registered");
          break;
        case "auth/invalid-email":
          setError("Invalid email address");
          break;
        case "auth/weak-password":
          setError("Password is too weak");
          break;
        case "auth/user-not-found":
          setError("No account found with this email");
          break;
        case "auth/wrong-password":
          setError("Incorrect password");
          break;
        case "auth/invalid-credential":
          setError("Invalid email or password");
          break;
        case "auth/too-many-requests":
          setError("Too many failed attempts. Please try again later");
          break;
        default:
          setError("An error occurred. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <button onClick={onClose} className="close-form-btn" disabled={loading}>
          ✕
        </button>

        <h2 className="form-header">{isLogin ? "Login" : "Sign Up"}</h2>

        {error && (
          <div
            className="error-message"
            style={{
              backgroundColor: "#fee",
              color: "#c33",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "15px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <form className="form-container" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              className="border p-2 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />

          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="border p-2 rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
            />
          )}

          <button
            type="submit"
            className={isLogin ? "login-btn" : "signup-btn"}
            disabled={loading}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
          </button>

          <p className="text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={switchMode}
              style={{
                pointerEvents: loading ? "none" : "auto",
                opacity: loading ? 0.5 : 1,
              }}
            >
              {isLogin ? "Sign up" : "Login"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
