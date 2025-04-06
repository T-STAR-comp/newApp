import styles from './styles/styles.module.css';
import { Link } from 'react-router-dom'; // if you're using react-router

const NotFound = () => {
  return (
    <div className={styles.not_found_container}>
      <div className={styles.not_found_box}>
        <h1 className={styles.not_found_code}>404</h1>
        <p className={styles.not_found_message}>Oops! Page not found.</p>
        <p className={styles.not_found_subtext}>
          The page you're looking for doesn’t exist or has been moved.
        </p>
        <Link to="/" className={styles.back_home_btn}>
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
