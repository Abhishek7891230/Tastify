import { HomePage } from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MenuPage } from "./pages/Menupage";
import { CartBanner } from "./components/CartBanner";
import { CartPage } from "./pages/CartPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <CartBanner />
    </Router>
  );
}

export default App;
