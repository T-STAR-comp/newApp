import styles from './styles/styles.module.css';

const NoConnection = () => {
  return (
    <div className={styles.connection_error_container}>
      <div className={styles.connection_error_box}>
        <h1 className={styles.connection_title}>🔌 No Server Connection</h1>
        <p className={styles.connection_message}>
          We're unable to connect to the server at the moment. <br />
          Please check your internet connection or try again later.
        </p>
        <button className={styles.retry_button} onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default NoConnection;
