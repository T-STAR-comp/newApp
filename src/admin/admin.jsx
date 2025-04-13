import { useState, useEffect } from "react";
import styles from "./styles/styles.module.css";
import Loader from "../loaders/loader";

const Admin = () => {
  const [products, setProducts] = useState([]);

  const [orders, setOrders] = useState([]);

  const [newProduct, setNewProduct] = useState({ prodName: "", price: "", image: "", name: sessionStorage.getItem("USER") });
  const [orderID,setorderID] = useState("");
  const [withdrawal, setWithdrawal] = useState({ password: "", amount: "" });
  const [loading, setloading] = useState(false);
  const [message, setmessage] = useState("");

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const addProduct = async () => {
    if (newProduct.prodName != "", newProduct.price != ""  , newProduct.image != "" , newProduct.name != "" ) {
      try {
        const Resp = await fetch(import.meta.env.VITE_CreateNewProductAdminURL,{
          method: "POST",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify(newProduct)
        });

        const Data = await Resp.json();
        if (Data){
          window.location.reload();
        };
      }
      catch (err) {
        if (err) {
          alert(err);
        };
      };
    }
  };

  const deleteProduct = async (product) => {
    const name = sessionStorage.getItem("USER");
    try {
      const Resp = await fetch (import.meta.env.VITE_DeleteExistingProductAdminURL,{
        method: "DELETE",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({product:product,name})
      });
      const Data = await Resp.json();
      if (Data){
        window.location.reload();
      }
    }
    catch (err) {
      if (err) {
        alert(err);
      };
    };
  };

  const FetchAllUserOrders = async () => {
    try {
      const Resp = await fetch (import.meta.env.VITE_FetchUserOrdersURL,{
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({name:sessionStorage.getItem("USER")})
      });
      const Data = await Resp.json();
      if (Data) {
        setOrders(Data);
      };
    }
    catch (err) {
      if (err) {
        alert (err);
      };
    };
  };
  

  const handleOrderIdChange = (e) => {
    setorderID(e);
  };

  const confirmDelivery = async () => {
    try {
      const Resp = await fetch (import.meta.env.VITE_DeleteUserOrderURL,{
        method: "DELETE",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({orderID:orderID,name:sessionStorage.getItem("USER")})
      });
      const Data = await Resp.json();
      if (Data){
        window.location.reload();
      };

    }
    catch (err) {
      if (err) {
        alert (err);
      };
    };
  };
  
  const FetchUserProd = async () => {
    const name = sessionStorage.getItem("USER");
    try {
      const Resp = await fetch(import.meta.env.VITE_FetchUserProductsURL,{
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({name:name})
      });
      
      const Data = await Resp.json();
      if(Array.isArray(Data)){
        setProducts(Data);
        
      }else{
        setProducts([]);
      }
    
    }
    catch (err) {
      if (err) {
        alert(err);
      };
    };
  };

  const FetchUserDetails = async () => {
    try {
      const Resp = await fetch (import.meta.env.VITE_FetchUserDetailsURL,{
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({user:sessionStorage.getItem("USER")})
      });
      const Data = await Resp.json();
      if (Data.message === "ok") {
        sessionStorage.setItem("MOBILENUM",Data.phonenum);
        sessionStorage.setItem("BALANCE",Data.balance);
      };
    }
    catch (err) {
      if (err) {
        alert(err);
      };
    };
  };
  
  useEffect(() => {
    FetchUserProd();
    FetchAllUserOrders();
    FetchUserDetails();
  }, []);

  const logoutAdmin = () => {
    sessionStorage.removeItem("USER");
    sessionStorage.removeItem("BALANCE");
    sessionStorage.removeItem("MOBILENUM");
    window.location.reload();
  };

  const handleWithdrawChange = (e) => {
    const { name, value } = e.target;
    setWithdrawal({ ...withdrawal, [name]: value });
  };

  const handleWithdraw = async () => {
    const { password, amount } = withdrawal;
    const withdrawAmount = parseFloat(amount);

    if (!password || !withdrawAmount || withdrawAmount <= 0) {
      alert("Please enter a valid amount and password.");
      return;
    }
    
    if (withdrawAmount > sessionStorage.getItem("BALANCE")) {
      alert("Insufficient balance.");
      return;
    }

    //mobileNum,user,operator,amount,password

    if (sessionStorage.getItem("MOBILENUM")) {
      setloading(true);
 
      try {
        const Resp = await fetch (import.meta.env.VITE_InitializeUserPayout, {
          method: "POST",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify(
            {
              user:sessionStorage.getItem("USER"),
              operator: Operator,
              amount:withdrawAmount,
              mobileNum: sessionStorage.getItem("MOBILENUM"),
              password:password
            }
          )
        });
        const Data = await Resp.json();
        window.location.reload();
      }
      catch (err) {
        if (err) {
          alert(err);
        };
      };
    }
  };

  if (loading === true) {
    return <Loader/>
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
          name="prodName"
          placeholder="Product Name"
          value={newProduct.prodName}
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
                <img src={product.imageUrl} alt={product.product} width="50" />
                <strong>{product.product}</strong> - MWK {product.price}
                <button
                  onClick={() => deleteProduct(product.product)}
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
        {orders.message === "NOn" ? (
          <p>No new orders.</p>
        ) : (
          <ul className={styles.orderList_div}>
            {orders.map((order) => (
              <li key={order.id} className={styles.order_item}>
                <strong>{order.orderName}</strong> - {order.quantity} pcs
                <br />
                Buyer: {order.customer}, Hostel: {order.hostel}, Room: {order.room}
                <br />
                Email: {order.email || "Not Provided"}
                <br />
                <input
                  type="text"
                  placeholder="Order ID"
                  value={order.id}
                  onChange={(e) => handleOrderIdChange(e.target.value)}
                  className={styles.input_order_id}
                />
                
                <button
                  onClick={confirmDelivery}
                  className={styles.confirm_button}
                >
                  Confirm Delivery
                </button>

              </li>
            ))}
          </ul>
        )}
      </div>
       {/* Account Balance & Withdrawal */}
       <div className={styles.account_section}>
        <h2>MWK {sessionStorage.getItem("BALANCE")}</h2>
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
