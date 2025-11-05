import { useMenuStore } from "../store/menuStore";
import { useLocation, useNavigate } from "react-router-dom";

export function CartBanner() {
  const cart = useMenuStore((state) => state.cart);
  const location = useLocation();
  const navigate = useNavigate();

  const hiddenPages = ["/login", "/payment", "/cart"];
  const isHidden = hiddenPages.includes(location.pathname);

  if (isHidden || cart.length === 0) return null;

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] md:w-[60%] bg-black text-white px-6 py-3 rounded-full shadow-lg flex justify-between items-center z-50">
      <span className="text-sm md:text-base">
        {totalItems} item{totalItems > 1 ? "s" : ""} added to cart 🛒
      </span>
      <button
        onClick={() => navigate("/cart")}
        className="bg-white text-black font-semibold px-4 py-1 rounded-full hover:bg-gray-200 transition"
      >
        View Cart →
      </button>
    </div>
  );
}
