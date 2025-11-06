import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMenuStore } from "../store/menuStore";
import { PaymentSuccessPopup } from "../components/PaymentSuccess";
import "../styles/cartpage.css";

export function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    placeOrder,
    canPlaceOrder,
    currentOrder,
  } = useMenuStore();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );

  const deliveryFee = total >= 500 ? 0 : 40;
  const finalTotal = total + deliveryFee;

  const handlePlaceOrder = () => {
    if (!canPlaceOrder()) {
      const orderTime = new Date(currentOrder.orderDate);
      const timeLeft = Math.ceil(
        (5 * 60 * 1000 - (Date.now() - orderTime.getTime())) / 60000
      );
      alert(
        `Please wait ${timeLeft} more minute(s) before placing another order.`
      );
      return;
    }

    const newOrder = placeOrder({
      total,
      deliveryFee,
      finalTotal,
    });

    if (newOrder) {
      setOrderId(newOrder.id);
      setShowSuccess(true);
    } else {
      alert("Unable to place order. Please try again.");
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    navigate("/menu");
  };

  if (cart.length === 0)
    return (
      <>
        {showSuccess && (
          <PaymentSuccessPopup orderId={orderId} onClose={handleCloseSuccess} />
        )}
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

  const isOrderDisabled = !canPlaceOrder();

  return (
    <>
      {showSuccess && (
        <PaymentSuccessPopup orderId={orderId} onClose={handleCloseSuccess} />
      )}

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
            <h2 className="summary-title">Payment Details</h2>

            <div className="summary-line">
              <span>Total item price</span>
              <span>₹{total}</span>
            </div>
            <div className="summary-line">
              <span>Delivery Fee</span>
              <span>
                {total >= 500 ? (
                  <>
                    <span className="delivery-fee-scratched">₹40</span>
                    <span className="ml-2">₹0</span>
                  </>
                ) : (
                  <span>₹{deliveryFee}</span>
                )}
              </span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-line total-line">
              <span>Total amount</span>
              <span>₹{finalTotal}</span>
            </div>

            {isOrderDisabled && currentOrder && (
              <div className="order-warning">
                <p className="warning-text">
                  You have an active order. Please wait before placing another
                  order.
                </p>
              </div>
            )}

            <button
              className="placeorder-btn"
              onClick={handlePlaceOrder}
              disabled={isOrderDisabled}
              style={{
                opacity: isOrderDisabled ? 0.5 : 1,
                cursor: isOrderDisabled ? "not-allowed" : "pointer",
              }}
            >
              {isOrderDisabled ? "Order in Progress" : "Place order"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
