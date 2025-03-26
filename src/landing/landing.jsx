import { Link } from "react-router-dom";
import styles from "./styles/styles.module.css";

const LandingPage = () => {
  return (
    <div className={styles.landing_container}>
      <header className={styles.navbar}>
        <h1 className={styles.brand}>DMI utility web</h1><p className={styles.beta}>Beta</p>
        
        <nav>
          <Link to="/login" className={styles.nav_link}>Login</Link>
          <Link to="/home" className={styles.nav_link}>Shop</Link>
          <Link to="*" className={styles.nav_link}>About</Link>
        </nav>
      </header>

      <section className={styles.hero_section}>
        <div className={styles.hero_text}>
          <h2 className={styles.hero_title}>Smart Shopping for Students</h2>
          <p className={styles.hero_subtitle}>
            Buy everything you need on campus, easily and securely.
          </p>
          <Link to="/home" className={styles.shop_now_btn}>Shop Now</Link>
        </div>
      </section>

      <section className={styles.features_section}>
        <div className={styles.feature_card}>
          <h3>Fast Checkout</h3>
          <p>Seamless payments with a few taps.</p>
        </div>
        <div className={styles.feature_card}>
          <h3>On-Campus Delivery</h3>
          <p>Get your items delivered to your hostel.</p>
        </div>
        <div className={styles.feature_card}>
          <h3>Exclusive Student Discounts</h3>
          <p>Save more with student-only offers.</p>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>© 2025 Oasis BETA. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
