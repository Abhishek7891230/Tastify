import emailjs from "@emailjs/browser";

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

export const sendOrderConfirmation = async (orderData) => {
  const { email, orderId, items, finalTotal } = orderData;

  const formattedOrders = items.map((item) => ({
    name: item.name,
    units: item.quantity || 1,
    price: item.price,
  }));

  const templateParams = {
    email: email,
    order_id: orderId,
    orders: formattedOrders,
    total_amount: finalTotal,
  };

  try {
    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams
    );
    console.log("Email sent successfully:", response);
    return { success: true };
  } catch (error) {
    console.error("Email send failed:", error);
    return { success: false, error };
  }
};
