import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMenuStore } from "../store/menuStore";
import "../styles/orderspage.css";

export function OrdersPage() {
  const { orders, currentOrder, updateOrderStatus } = useMenuStore();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAndUpdateStatuses = () => {
      const now = Date.now();
      const fiveMinutes = 5 * 60 * 1000;
      orders.forEach((order) => {
        if (order.status !== "delivered") {
          const placedAt = new Date(order.orderDate).getTime();
          if (now - placedAt >= fiveMinutes) {
            updateOrderStatus(order.id, "delivered");
          }
        }
      });
    };

    checkAndUpdateStatuses();
    const id = setInterval(checkAndUpdateStatuses, 30000);
    return () => clearInterval(id);
  }, [orders, updateOrderStatus]);

  const getStatusColor = (status) => {
    switch (status) {
      case "preparing":
        return "status-preparing";
      case "out-for-delivery":
        return "status-delivering";
      case "delivered":
        return "status-delivered";
      default:
        return "";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "preparing":
        return "Preparing";
      case "out-for-delivery":
        return "Out for Delivery";
      case "delivered":
        return "Delivered";
      default:
        return status;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const previousOrders = orders.filter(
    (order) => !currentOrder || order.id !== currentOrder.id
  );

  if (orders.length === 0) {
    return (
      <div className="orders-wrapper">
        <div className="orders-header">
          <h1 className="orders-title">My Orders</h1>
        </div>
        <div className="empty-orders">
          <p>No orders yet!</p>
          <button onClick={() => navigate("/menu")} className="order-now-btn">
            Order Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-wrapper">
      <div className="orders-header">
        <h1 className="orders-title">My Orders</h1>
      </div>

      <div className="orders-container">
        {currentOrder && (
          <div className="current-order-section">
            <h2 className="section-title">Current Order</h2>
            <div className="order-card current">
              <div className="order-header">
                <div>
                  <h3 className="order-id">{currentOrder.id}</h3>
                  <p className="order-date">
                    {formatDate(currentOrder.orderDate)}
                  </p>
                </div>
                <span
                  className={`order-status ${getStatusColor(
                    currentOrder.status
                  )}`}
                >
                  {getStatusText(currentOrder.status)}
                </span>
              </div>

              <div className="order-items">
                {currentOrder.items.map((item, idx) => (
                  <div key={idx} className="order-item">
                    <span className="item-name">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="item-price">
                      ₹{Number(item.price) * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="order-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{currentOrder.total}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Fee</span>
                  <span>₹{currentOrder.deliveryFee}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹{currentOrder.finalTotal}</span>
                </div>
              </div>

              {currentOrder.status !== "delivered" && (
                <div className="delivery-info">
                  <p className="delivery-text">
                    Estimated delivery:{" "}
                    {formatTime(currentOrder.estimatedDelivery)}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {previousOrders.length > 0 && (
          <div className="previous-orders-section">
            <h2 className="section-title">Previous Orders</h2>
            <div className="orders-list">
              {previousOrders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div>
                      <h3 className="order-id">{order.id}</h3>
                      <p className="order-date">
                        {formatDate(order.orderDate)}
                      </p>
                    </div>
                    <span
                      className={`order-status ${getStatusColor(order.status)}`}
                    >
                      {getStatusText(order.status)}
                    </span>
                  </div>

                  <div className="order-items">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="order-item">
                        <span className="item-name">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="item-price">
                          ₹{Number(item.price) * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="order-summary">
                    <div className="summary-row total">
                      <span>Total</span>
                      <span>₹{order.finalTotal}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
