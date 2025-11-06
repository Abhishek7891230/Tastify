import { useEffect, useMemo, useState } from "react";
import { useMenuStore } from "../store/menuStore";
import "../styles/menupage.css";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useAuth } from "../contexts/AuthContext";

export function MenuPage() {
  const { selectedCategory, setCategory, addToCart, getAllMenuItems } =
    useMenuStore();
  const { ensureLoggedIn } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");
    (async () => {
      try {
        const data = await getAllMenuItems();
        if (mounted) setItems(data || []);
      } catch (e) {
        if (mounted) setError("Failed to load menu. Please try again.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [getAllMenuItems]);

  const categories = useMemo(
    () => [
      { id: "non-veg", label: "Non-Veg" },
      { id: "veg", label: "Veg" },
      { id: "chinese", label: "Chinese" },
      { id: "snacks", label: "Snacks" },
      { id: "pizza", label: "Pizza" },
    ],
    []
  );

  const filteredItems = useMemo(
    () => items.filter((i) => i.category === selectedCategory),
    [items, selectedCategory]
  );

  const handleAdd = (item) => {
    if (!ensureLoggedIn()) return;
    addToCart(item);
  };

  return (
    <>
      <Navbar />
      <div className="menupage-container">
        <div className="menupage-content">
          <h1 className="menupage-title">Our Menu</h1>

          <div className="menupage-categories">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setCategory(category.id)}
                className={`menupage-category-btn ${
                  selectedCategory === category.id ? "active" : ""
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {loading && <div className="menupage-loading">Loading menu...</div>}
          {error && !loading && <div className="menupage-error">{error}</div>}

          {!loading && !error && (
            <div className="menupage-items-grid">
              {filteredItems.map((item, idx) => (
                <div key={idx} className="menupage-item-card">
                  <div className="menupage-item-img-container">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="menupage-item-img"
                    />
                  </div>
                  <div className="menupage-item-content">
                    <h3 className="menupage-item-name">{item.name}</h3>
                    <p className="menupage-item-description">
                      {item.description}
                    </p>
                    <div className="menupage-item-footer">
                      <span className="menupage-item-price">₹{item.price}</span>
                      <button
                        className="menupage-add-btn"
                        onClick={() => handleAdd(item)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
