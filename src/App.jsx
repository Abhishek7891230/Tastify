import { HomePage } from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MenuPage } from "./pages/Menupage";
import { CartBanner } from "./components/CartBanner";
import { CartPage } from "./pages/CartPage";
import { SearchResultsPage } from "./pages/ResultsPage";
import { AuthProvider } from "./contexts/AuthContext";
import { OrdersPage } from "./pages/OrderPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
        <CartBanner />
      </Router>
    </AuthProvider>
  );
}

export default App;
