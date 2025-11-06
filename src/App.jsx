import { HomePage } from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MenuPage } from "./pages/Menupage";
import { CartBanner } from "./components/CartBanner";
import { CartPage } from "./pages/CartPage";
import { SearchResultsPage } from "./pages/ResultsPage";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { OrdersPage } from "./pages/OrderPage";

function ProtectedRoute({ element }) {
  const { currentUser, openLogin } = useAuth();
  if (!currentUser) {
    openLogin();
    return null;
  }
  return element;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/cart" element={<ProtectedRoute element={<CartPage />} />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/orders" element={<ProtectedRoute element={<OrdersPage />} />} />
        </Routes>
        <CartBanner />
      </Router>
    </AuthProvider>
  );
}

export default App;
