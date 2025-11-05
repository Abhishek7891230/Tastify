import { useNavigate } from "react-router-dom";
import { useMenuStore } from "../store/menuStore";
import "../styles/cartpage.css";

export function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useMenuStore();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );

  if (cart.length === 0)
    return (
      <>
        <div className="empty-cart">Cart is empty, just like your stomach</div>
        <div className="backto-menu-div">
          <button
            className="backto-menupage-btn"
            onClick={() => navigate("/menu")}
          >
            ← Order right now
          </button>
        </div>
      </>
    );

  return (
    <div className="cartpage-wrapper">
      <div className="cartpage-header">
        <h1 className="yourcart-title">Your Cart</h1>
      </div>

      <div className="cartpage-container">
        <div className="cart-section">
          <div className="cart-items-box">
            {cart.map((item, index) => (
              <div key={index}>
                <div className="cart-item-row">
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-price">₹{item.price}</p>
                  </div>

                  <div className="cart-item-actions">
                    <div className="cart-quantity-controls">
                      <button
                        onClick={() => updateQuantity(item.name, -1)}
                        className="qty-btn"
                      >
                        -
                      </button>
                      <span className="qty-count">{item.quantity || 1}</span>
                      <button
                        onClick={() => updateQuantity(item.name, +1)}
                        className="qty-btn"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.name)}
                      className="delete-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {index < cart.length - 1 && (
                  <div className="cart-divider"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="payment-summary">
          <h2 className="summary-title">Bill Details</h2>

          <div className="summary-line">
            <span>Item Total</span>
            <span>₹{total}</span>
          </div>
          <div className="summary-line">
            <span>Delivery Fee</span>
            <span>₹{total > 0 ? 40 : 0}</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-line total-line">
            <span>To Pay</span>
            <span>₹{total > 0 ? total + 40 : 0}</span>
          </div>

          <button className="placeorder-btn">Place order</button>
        </div>
      </div>
    </div>
  );
}
