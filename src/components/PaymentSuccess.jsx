import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/paymentsuccess.css";

export function PaymentSuccessPopup({ orderId, onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {}, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="payment-overlay">
      <div className="payment-popup">
        <div className="success-animation">
          <div className="checkmark-circle">
            <svg
              className="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className="checkmark-circle-path"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className="checkmark-check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </div>
        </div>

        <h2 className="success-title">Payment Successful!</h2>
        <p className="success-message">
          Your order has been placed successfully
        </p>
        <p className="order-id">Order ID: {orderId}</p>

        <div className="success-actions">
          <button
            onClick={() => navigate("/orders")}
            className="view-order-btn"
          >
            View Order Details
          </button>
          <button onClick={onClose} className="continue-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
