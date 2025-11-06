import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMenuStore } from "../store/menuStore";
import "../styles/resultspage.css";
import "../styles/menupage.css";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";

export function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const { addToCart, getAllMenuItems } = useMenuStore();
  const { ensureLoggedIn } = useAuth();

  useEffect(() => {
    if (!query) {
      navigate("/menu");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const allItems = getAllMenuItems();
      const searchResults = fuzzySearch(query, allItems);
      setResults(searchResults);
      setLoading(false);
    }, 1000);
  }, [query, navigate, getAllMenuItems]);

  const fuzzySearch = (searchTerm, items) => {
    const term = searchTerm.toLowerCase().trim();

    return items.filter((item) => {
      const name = item.name.toLowerCase();
      const description = item.description?.toLowerCase() || "";

      if (name.includes(term) || description.includes(term)) {
        return true;
      }

      const distance = levenshteinDistance(term, name);
      return distance <= 2;
    });
  };

  const levenshteinDistance = (str1, str2) => {
    const matrix = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  };

  const handleAddToCart = (item) => {
    if (!ensureLoggedIn()) return;
    addToCart(item);
  };

  if (loading) {
    return (
      <div className="search-loading-container">
        <div className="search-spinner"></div>
        <p className="search-loading-text">Searching for "{query}"...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="menupage-container">
        <div className="menupage-content">
          <div className="search-results-header">
            <h1 className="search-results-title">
              Search Results for "{query}"
            </h1>
            <p className="search-results-count">
              {results.length} {results.length === 1 ? "item" : "items"} found
            </p>
          </div>

          {results.length === 0 ? (
            <div className="search-no-results">
              <p className="search-no-results-text">
                No items found matching "{query}"
              </p>
              <p className="search-no-results-hint">
                Try searching with different keywords
              </p>
              <button
                onClick={() => navigate("/menu")}
                className="search-back-btn"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="menupage-items-grid">
              {results.map((item, idx) => (
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
                        onClick={() => handleAddToCart(item)}
                        className="menupage-add-btn"
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
