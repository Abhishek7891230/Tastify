import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { LoginPopup } from "../components/Login";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  const openLogin = useCallback(() => setShowLogin(true), []);
  const closeLogin = useCallback(() => setShowLogin(false), []);

  const ensureLoggedIn = useCallback(() => {
    if (!currentUser) {
      setShowLogin(true);
      return false;
    }
    return true;
  }, [currentUser]);

  const value = {
    currentUser,
    logout,
    openLogin,
    closeLogin,
    ensureLoggedIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && (
        <>
          {children}
          {showLogin && (
            <LoginPopup onClose={closeLogin} onLoginSuccess={closeLogin} />
          )}
        </>
      )}
    </AuthContext.Provider>
  );
}
