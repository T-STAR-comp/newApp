import styles from "./styles/styles.module.css";
import { useNavigate } from "react-router-dom";

const PaymentError = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.error_container}>
            <div className={styles.error_box}>
                <h1 className={styles.error_title}>Payment Failed</h1>
                <p className={styles.error_message}>
                    Oops! Something went wrong with your payment. <br /> 
                    Please try again or contact support.
                </p>
                <button onClick={() => navigate("/home")} className={styles.retry_button}>
                    Try Again
                </button>
            </div>
        </div>
    );
};

export default PaymentError;
