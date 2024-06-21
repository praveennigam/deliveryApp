import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      setOrders(response.data.data || []); // Ensure orders is always an array
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]); // In case of error, set orders to an empty array
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [url]);

  return (
    <div className="orders">
      <h2>All Orders</h2>
      <div className="order-list">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div className="order-item" key={index}>
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <div className="order-details">
                <p className="order-item-food">
                  {order.items
                    .map((item) => `${item.name} x ${item.quantity}`)
                    .join(", ")}
                </p>
                <div className="order-item-name">
                  {order.address.firstName + " " + order.address.lastName}
                </div>
                <div className="order-item-address">
                  {[
                    order.address.street,
                    order.address.city,
                    order.address.state,
                    order.address.country,
                    order.address.zipcode,
                  ].join(", ")}
                </div>
                <div className="order-item-phone">{order.address.phone}</div>
              </div>
              <p>Items: {order.items.length}</p>
              <p>Rs. {order.amount}</p>
              <select
                onChange={(event) => statusHandler(event, order._id)}
                name="status"
                id="status"
                value={order.status}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
