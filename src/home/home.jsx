import { useState } from "react";
import styles from "./styles/styles.module.css";

const products = [
    {
      id: 1,
      name: "Notebook",
      price: 5000,
      image: "https://cdn.pixabay.com/photo/2016/03/09/09/17/notebook-1244130_960_720.jpg", // Notebook and pen image from Pixabay
    },
    {
      id: 2,
      name: "Pen",
      price: 1000,
      image: "https://cdn.pixabay.com/photo/2015/05/31/10/55/pen-791751_960_720.jpg", // Pen image from Pixabay
    },
    {
      id: 3,
      name: "USB Drive",
      price: 3000,
      image: "https://cdn.pixabay.com/photo/2016/11/29/04/45/usb-1867235_960_720.jpg", // USB drive image from Pixabay
    },
    {
      id: 4,
      name: "Highlighter",
      price: 200,
      image: "https://cdn.pixabay.com/photo/2016/11/21/15/46/marker-1847165_960_720.jpg", // Highlighter image from Pixabay
    },
    {
      id: 5,
      name: "Stapler",
      price: 800,
      image: "https://cdn.pixabay.com/photo/2014/12/21/23/28/stapler-575636_960_720.jpg", // Stapler image from Pixabay
    },
  ];

const hostels = ["Select Hostel", "Alpha Hostel", "Beta Hostel", "Gamma Hostel", "Delta Hostel"];

const HomeComp = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [hostel, setHostel] = useState(hostels[0]);
  const [roomNumber, setRoomNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleBuyClick = (productId) => {
    setSelectedProduct(productId);
    setQuantity(1);
    setHostel(hostels[0]);
    setRoomNumber("");
    setName("");
    setEmail("");
  };

  const handleConfirmPurchase = () => {
    if (hostel === "Select Hostel" || roomNumber.trim() === "") {
      alert("Please select a hostel and enter your room number.");
      return;
    }

    alert(`Purchase confirmed:
    - Product ID: ${selectedProduct}
    - Quantity: ${quantity}
    - Hostel: ${hostel}
    - Room: ${roomNumber}
    - Name: ${name || "Not provided"}
    - Email: ${email || "Not provided"}
    `);

    setSelectedProduct(null);
  };

  return (
    <div className={styles.main_div}>
      <div className={styles.header}>
        <h1>Welcome to DMI Student Utility Store</h1>
        <p>Purchase all your campus needs in one place!</p>
      </div>

      <div className={styles.products_grid}>
        {products.map((product) => (
          <div key={product.id} className={styles.product_card}>
            <img src={product.image} alt={product.name} className={styles.product_image} />
            <h3>{product.name}</h3>
            <p>Price: MWK {product.price}</p>

            {selectedProduct === product.id ? (
              <div className={styles.purchase_section}>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                  min="1"
                  className={styles.quantity_input}
                />

                <select
                  value={hostel}
                  onChange={(e) => setHostel(e.target.value)}
                  className={styles.hostel_select}
                >
                  {hostels.map((hostelName, index) => (
                    <option key={index} value={hostelName}>
                      {hostelName}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(parseInt(e.target.value))}
                  placeholder="Enter Room Number"
                  className={styles.input_field}
                />

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name (Optional)"
                  className={styles.input_field}
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email (Optional)"
                  className={styles.input_field}
                />

                <button onClick={handleConfirmPurchase} className={styles.confirm_button}>
                  Confirm Purchase
                </button>
              </div>
            ) : (
              <button onClick={() => handleBuyClick(product.id)} className={styles.buy_button}>
                Buy Now
              </button>
            )}
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <p>© 2025 DMI University Utility Store. <a href="/Login"><p className={styles.oasis}>Powered By OASIS</p></a> All rights reserved.</p>
      </div>
    </div>
  );
};

export default HomeComp;
