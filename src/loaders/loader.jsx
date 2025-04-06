import styles from "./styles/styles.module.css";

const Loader = () => {
    return (
        <div className={styles.loader_container}>
            <div className={styles.loader}></div>
            <p className={styles.loader_text}>Loading...</p>
        </div>
    );
};

export default Loader;
