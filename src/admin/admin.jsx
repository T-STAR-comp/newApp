import { useState } from "react";
import styles from "./styles/styles.module.css";

const Admin = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Notebook", price: "500", image: "https://via.placeholder.com/100" },
  ]);

  const [orders, setOrders] = useState([
    {
      id: 1,
      orderId: "",
      product: "Notebook",
      quantity: 2,
      buyer: "John Doe",
      hostel: "Alpha Hostel",
      room: "A12",
      email: "johndoe@example.com",
      delivered: false,
    },
  ]);

  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });

  const [accountBalance, setAccountBalance] = useState(10000); // Example balance
  const [withdrawal, setWithdrawal] = useState({ password: "", amount: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      alert("Please fill in all fields.");
      return;
    }
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    setNewProduct({ name: "", price: "", image: "" });
    alert("Product added successfully!");
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const handleOrderIdChange = (orderId, value) => {
    setOrders(orders.map((order) => 
      order.id === orderId ? { ...order, orderId: value } : order
    ));
  };

  const confirmDelivery = (orderId) => {
    setOrders(orders.map((order) =>
      order.id === orderId ? { ...order, delivered: true } : order
    ));
  };

  const logoutAdmin = () => {
    alert("Logging out...");
    // Redirect logic can be added here
  };

  const handleWithdrawChange = (e) => {
    const { name, value } = e.target;
    setWithdrawal({ ...withdrawal, [name]: value });
  };

  const handleWithdraw = () => {
    const { password, amount } = withdrawal;
    const withdrawAmount = parseFloat(amount);

    if (!password || !withdrawAmount || withdrawAmount <= 0) {
      alert("Please enter a valid amount and password.");
      return;
    }
    
    if (withdrawAmount > accountBalance) {
      alert("Insufficient balance.");
      return;
    }

    setAccountBalance(accountBalance - withdrawAmount);
    setWithdrawal({ password: "", amount: "" });
    alert(`MWK ${withdrawAmount} withdrawn successfully!`);
  };

  return (
    <div className={styles.admin_panel}>
      <div className={styles.header}>
        <h1 className={styles.admin_title}>
          <span className={styles.oasis}>Oasis</span> Dashboard
        </h1>
        <button onClick={logoutAdmin} className={styles.logout_button}>
          Logout of Admin
        </button>
      </div>

      {/* Add Product Form */}
      <div className={styles.add_product_form}>
        <h2>Add New Product</h2>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleInputChange}
          className={styles.input_field}
        />
        <input
          type="number"
          name="price"
          placeholder="Price (MWK)"
          value={newProduct.price}
          onChange={handleInputChange}
          className={styles.input_field}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={handleInputChange}
          className={styles.input_field}
        />
        <button onClick={addProduct} className={styles.add_product_button}>
          Add Product
        </button>
      </div>

      {/* Product List */}
      <div className={styles.product_list}>
        <h2>Product Listings</h2>
        {products.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          <ul>
            {products.map((product) => (
              <li key={product.id} className={styles.product_item}>
                <img src={product.image} alt={product.name} width="50" />
                <strong>{product.name}</strong> - MWK {product.price}
                <button
                  onClick={() => deleteProduct(product.id)}
                  className={styles.delete_button}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Orders Section */}
      <div className={styles.orders_section}>
        <h2>New Orders</h2>
        {orders.length === 0 ? (
          <p>No new orders.</p>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order.id} className={styles.order_item}>
                <strong>{order.product}</strong> - {order.quantity} pcs
                <br />
                Buyer: {order.buyer}, Hostel: {order.hostel}, Room: {order.room}
                <br />
                Email: {order.email}
                <br />
                <input
                  type="text"
                  placeholder="Order ID"
                  value={order.orderId}
                  onChange={(e) => handleOrderIdChange(order.id, e.target.value)}
                  className={styles.input_order_id}
                />
                {order.delivered ? (
                  <span className={styles.delivered}>Delivered ✅</span>
                ) : (
                  <button
                    onClick={() => confirmDelivery(order.id)}
                    className={styles.confirm_button}
                  >
                    Confirm Delivery
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
       {/* Account Balance & Withdrawal */}
       <div className={styles.account_section}>
        <h2>MWK {accountBalance.toLocaleString()}</h2>
        <div className={styles.withdraw_form}>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={withdrawal.password}
            onChange={handleWithdrawChange}
            className={styles.input_field}
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount to Withdraw (MWK)"
            value={withdrawal.amount}
            onChange={handleWithdrawChange}
            className={styles.input_field}
          />
          <div className={styles.div_pow}>
            <p>Powered By</p>
            <p className={styles.paychangu}>PayChangu</p>
          </div>
          <button onClick={handleWithdraw} className={styles.withdraw_button}>
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
