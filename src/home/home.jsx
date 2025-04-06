import { useState, useEffect } from "react";
import styles from "./styles/styles.module.css";
import { Link } from "react-router-dom";
import Loader from "../loaders/loader";
import NoConnection from "../connState/connsatatus";

const HomeComp = () => {
  const hostels = ["Select Hostel", "Alpha Hostel", "Beta Hostel", "Gamma Hostel", "Delta Hostel"];
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [hostel, setHostel] = useState(hostels[0]);
  const [roomNumber, setRoomNumber] = useState("");
  const [name, setName] = useState("");
  const [Lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [Connection, setConnection] = useState(false);
  const [loading, setloading] = useState(false);


  const handleBuyClick = (productId) => {
    setSelectedProduct(productId);
    setQuantity(1);
    setHostel(hostels[0]);
    setRoomNumber("");
    setName("");
    setEmail("");
  };

  const fetchAllProducts = async () => {
    setloading(true)
    try {
      const response = await fetch(import.meta.env.VITE_FetchAllProductsURL);
      const data = await response.json();
      if (data) {
        setProducts(data);
        setloading(false);
      }
    } catch (err) {
      setConnection(true);
    }
    finally{
      setloading(false)
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const HandlePayment = async (price,prodID, user, product) => {

    const i = quantity * price;
    const iadd = price*(1/100);
    const tot = i+iadd;

    if (email !== "" || name !== "" || Lastname !== ""){
      setloading(true);
      
      try {
        const Resp = await fetch (import.meta.env.VITE_PayOrderURL,{
          method: "POST",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify({amount:tot,email:email,first_name:name,last_name:Lastname})
        });
        const Data = await Resp.json();
        console.log(Data);
        Data.status === "success" ? 
        handleConfirmPurchase(Data.data.data.tx_ref,Data.data.checkout_url,prodID, user, product) :
        window.location.href = ('http://localhost:5173/PayError');
      }
      catch (err) {
        if (err) {
          alert(err);
        };
      }
      finally {
        setloading(false);
      };
    };

  };

  const handleConfirmPurchase = async (payTXref,checkoutURL,prodID, user, product) => {
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
        setSelectedProduct(null);
        sessionStorage.setItem("PAYMENTID",payTXref);
        sessionStorage.setItem("ORDERID",data.orderID);
        sessionStorage.setItem("PRODUCTUSER",user);
        window.location.href = checkoutURL;
        setloading(true);
      }
    } catch (err) {
      alert(err);
    }
  };

  if (loading === true) {
    return (
      <Loader/>
    );
  };

  if (Connection === true) {
    return <NoConnection/>
  };

  return (
    <div className={styles.main_div}>
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
                  placeholder="First Name"
                  className={styles.input_field}
                />

                <input
                  type="text"
                  value={Lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="Last Name"
                  className={styles.input_field}
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className={styles.input_field}
                />

                <button onClick={() =>HandlePayment(product.price,product.ID, product.user, product.product)} className={styles.confirm_button}>
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
