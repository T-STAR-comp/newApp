import { useState, useEffect } from "react";
import styles from "./styles/styles.module.css";
import { Link } from "react-router-dom";

const HomeComp = () => {
  const hostels = ["Select Hostel", "Alpha Hostel", "Beta Hostel", "Gamma Hostel", "Delta Hostel"];
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [hostel, setHostel] = useState(hostels[0]);
  const [roomNumber, setRoomNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const handleBuyClick = (productId) => {
    setSelectedProduct(productId);
    setQuantity(1);
    setHostel(hostels[0]);
    setRoomNumber("");
    setName("");
    setEmail("");
  };

  const closeAlert = () => {
    setAlertVisible(false);
  };

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_FetchAllProductsURL);
      const data = await response.json();
      if (data) {
        setProducts(data);
        console.log(data);
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleConfirmPurchase = async (prodID, user, product) => {
    try {
      const response = await fetch(import.meta.env.VITE_CreateNewOrderURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productID: prodID,
          customer: name,
          hostel: hostel,
          room: roomNumber,
          orderName: product,
          quantity: quantity,
          name: user
        })
      });
      const data = await response.json();
      if (data.message === "ok") {
        setAlertVisible(true);
        setAlertMsg(`${data.orderID}`);
        setSelectedProduct(null);
      }
      console.log(data);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className={styles.main_div}>
      {alertVisible && (
        <div className={styles.alert_div} onClick={closeAlert}>
          <span className={styles.alert_message}>
            Below is your order ID, please take a screenshot. Required when receiving order: {alertMsg}
          </span>
        </div>
      )}

      <div className={styles.header}>
        <h1>Welcome to DMI Student Utility Store</h1>
        <p>Purchase all your campus needs in one place!</p>
      </div>

      <div className={styles.products_grid}>
        {products.map((product) => (
          <div key={product.ID} className={styles.product_card}>
            <img src={product.imageUrl} alt={product.product} className={styles.product_image} />
            <h3>{product.product}</h3>
            <p>Price: MWK {product.price}</p>

            {selectedProduct === product.ID ? (
              <div className={styles.purchase_section}>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  className={styles.quantity_input}
                />

                <select
                  value={hostel}
                  onChange={(e) => setHostel(e.target.value)}
                  className={styles.hostel_select}
                >
                  {hostels.map((hostelName) => (
                    <option key={hostelName} value={hostelName}>
                      {hostelName}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  placeholder="Enter Room Number"
                  className={styles.input_field}
                />

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className={styles.input_field}
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email (Optional)"
                  className={styles.input_field}
                />

                <button onClick={() => handleConfirmPurchase(product.ID, product.user, product.product)} className={styles.confirm_button}>
                  Confirm Purchase
                </button>
              </div>
            ) : (
              <button onClick={() => handleBuyClick(product.ID)} className={styles.buy_button}>
                Buy Now
              </button>
            )}
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <p>
          © 2025 DMI University Utility Store. <Link className={styles.Link} to={"/Login"}>Powered By OASIS BETA</Link> All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default HomeComp;
