import { useState } from "react";
import "../styles/navbar.css";
import { useNavigate } from "react-router-dom";
import { LoginPopup } from "./Login";
import { useAuth } from "../contexts/AuthContext";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to logout");
    }
  };

  const handleLoginSuccess = (user) => {
    console.log("User logged in:", user);
  };

  return (
    <>
      {showLogin && (
        <LoginPopup
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      <nav className="navbar">
        <a href="/" className="navbar-logo">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyJ3iAQBT7T1yYDGNyVdgwtd7DJPSBg5k5cw&s"
            alt="Tastify Logo"
            className="navbar-logo-img"
          />
          <span className="navbar-logo-text">Tastify</span>
        </a>

        <div className="navbar-search">
          <input
            className="navbar-input"
            type="text"
            placeholder="Search your meal"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleSearch}
            className="cursor-pointer"
          >
            <path
              d="M10.836 10.615 15 14.695"
              stroke="#7A7B7D"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              clipRule="evenodd"
              d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
              stroke="#7A7B7D"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="navbar-actions">
          <a
            className="github-link"
            href="https://github.com/Abhishek7891230/Tastify"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Repo
          </a>
          <div className="navbar-cart" onClick={() => navigate("/cart")}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                stroke="#615fff"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <button className="navbar-cart-badge">3</button>
          </div>

          {currentUser ? (
            <div className="user-menu-container">
              <button
                className="navbar-btn user-menu-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                    fill="currentColor"
                  />
                </svg>
                {currentUser.displayName || "User"}
              </button>

              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="user-dropdown-header">
                    <div className="user-dropdown-name">
                      {currentUser.displayName || "User"}
                    </div>
                    <div className="user-dropdown-email">
                      {currentUser.email}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      navigate("/orders");
                      setShowUserMenu(false);
                    }}
                    className="user-dropdown-item"
                  >
                    My Orders
                  </button>
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setShowUserMenu(false);
                    }}
                    className="user-dropdown-item"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="user-dropdown-logout"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="navbar-btn"
              onClick={() => setShowLogin(!showLogin)}
            >
              Login
            </button>
          )}

          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="navbar-toggle"
          >
            <svg
              width="21"
              height="15"
              viewBox="0 0 21 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="21" height="1.5" rx=".75" fill="#426287" />
              <rect
                x="8"
                y="6"
                width="13"
                height="1.5"
                rx=".75"
                fill="#426287"
              />
              <rect
                x="6"
                y="13"
                width="15"
                height="1.5"
                rx=".75"
                fill="#426287"
              />
            </svg>
          </button>
        </div>

        <div className={`${open ? "flex" : "hidden"} mobile-menu`}>
          <a href="#" className="menu-link">
            About
          </a>
          <a href="#" className="menu-link">
            Contact
          </a>
        </div>
      </nav>
    </>
  );
}
