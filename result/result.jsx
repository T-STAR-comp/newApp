import styles from "./styles/styles.module.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [DataState, setDataState] = useState(false);
    
    // Extract orderID from URL state (or fallback)
    const orderID = location.state?.orderID || "N/A";

    //fn to check payment status.
    const PayStatus = async () => {
        try {
            const Resp = await fetch (import.meta.env.VITE_VerifyPayOrder,{
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({trans_ID:sessionStorage.getItem("PAYMENTID"),name:sessionStorage.getItem("PRODUCTUSER")})
            });
            const Data = await Resp.json();

            if (Data.message === "ok") {
                ChangeState();
                setDataState(true)
            };
        }
        catch (err) {
            if (err) {
                window.location.href = ('/PayError');
            };
        };
    };

    const ChangeState = async () => {
        try {
            const Resp = await fetch (import.meta.env.VITE_ChangeStateOrderURL,{
                method: "PUT",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({orderID:sessionStorage.getItem("ORDERID")})
            });
            const Data = await Resp.json();

            if (Data.message === "ok") {
                sessionStorage.removeItem("ORDERID");
                sessionStorage.removeItem("PAYMENTID");
                sessionStorage.removeItem("PRODUCTUSER");
            };
        }
        catch (err) {
            if (err) {
                window.location.href = ('/PayError');
            };
        };
    };

    useEffect(() => {
        PayStatus();
      }, []);
    
      if (DataState === true) {
       return (
        <div className={styles.success_container}>
            <div className={styles.success_box}>
                <h1 className={styles.success_title}>Order Placed Successfully 🎉</h1>
                <p className={styles.success_message}>
                    Thank you for your order! Your **Order ID** is:
                </p>
                <div className={styles.order_id_box}>
                    <strong>{sessionStorage.getItem("ORDERID")}</strong>
                </div>
                <p className={styles.success_warning}>
                    Please keep this Order ID safe as it will be required when receiving your order.
                </p>
                <button onClick={() => navigate("/home")} className={styles.back_home_button}>
                    Go Back Home
                </button>
            </div>
        </div>
        );
    };
};

export default Result;
